import { test, expect } from "@playwright/test";
import { del } from "@vercel/blob";

test.describe.configure({ mode: "serial" });

const FRESH_SLUG = "e2e-upload-fresh";
const HARDCODED_SLUG = "moru";
const INVALID_SLUG = "Bad Slug!";
const SENTINEL_FRESH = "SENTINEL_FRESH_v1";
const SENTINEL_REPLACED = "SENTINEL_REPLACED_v2";
const BLOB_PREFIX = "portfolio-html/";

const usedSlugs = new Set<string>();

function buildHtml(sentinel: string): Buffer {
  return Buffer.from(
    `<html><body><h1 id="sentinel">${sentinel}</h1></body></html>`,
    "utf-8",
  );
}

test.beforeAll(() => {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.ADMIN_UPLOAD_KEY_B64) {
    throw new Error(
      "E2E requires BLOB_READ_WRITE_TOKEN and ADMIN_UPLOAD_KEY_B64. Set them in .env.local or CI secrets.",
    );
  }
});

test.afterAll(async () => {
  // Always ensure FRESH_SLUG is in the cleanup set as a safety net
  usedSlugs.add(FRESH_SLUG);

  for (const slug of usedSlugs) {
    try {
      await del(`${BLOB_PREFIX}${slug}.html`);
    } catch (e) {
      console.warn(`afterAll cleanup: could not delete blob for slug "${slug}":`, e);
    }
  }
});

test.describe("admin upload e2e", () => {
  test("TC1: fresh slug upload — 200 + iframe renders with correct sentinel", async ({
    page,
    request,
  }) => {
    usedSlugs.add(FRESH_SLUG);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: FRESH_SLUG,
        file: {
          name: "fresh.html",
          mimeType: "text/html",
          buffer: buildHtml(SENTINEL_FRESH),
        },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      slug: FRESH_SLUG,
      url: `/projects/${FRESH_SLUG}`,
      replaced: false,
    });

    await page.goto(`/projects/${FRESH_SLUG}`);

    const iframe = page.locator(`iframe[title="${FRESH_SLUG}"]`);
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("sandbox", "allow-scripts");

    const blobSrc = await iframe.getAttribute("src");
    expect(blobSrc).toBeTruthy();
    expect(blobSrc).toContain("blob.vercel-storage.com");

    const blobResponse = await request.get(blobSrc!);
    expect(blobResponse.ok()).toBe(true);
    const blobText = await blobResponse.text();
    expect(blobText).toContain(SENTINEL_FRESH);
  });

  test("TC2: same slug re-upload — 200 + replaced=true + new sentinel in blob", async ({
    page,
    request,
  }) => {
    usedSlugs.add(FRESH_SLUG);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: FRESH_SLUG,
        file: {
          name: "fresh.html",
          mimeType: "text/html",
          buffer: buildHtml(SENTINEL_REPLACED),
        },
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      slug: FRESH_SLUG,
      url: `/projects/${FRESH_SLUG}`,
      replaced: true,
    });

    await page.goto(`/projects/${FRESH_SLUG}`);

    const iframe = page.locator(`iframe[title="${FRESH_SLUG}"]`);
    await expect(iframe).toBeVisible();

    const blobSrc = await iframe.getAttribute("src");
    expect(blobSrc).toBeTruthy();

    const blobResponse = await request.get(blobSrc!);
    expect(blobResponse.ok()).toBe(true);
    const blobText = await blobResponse.text();
    expect(blobText).toContain(SENTINEL_REPLACED);
    expect(blobText).not.toContain(SENTINEL_FRESH);
  });

  test("TC3: hardcoded slug rejected — 409 slug_locked", async ({ request }) => {
    usedSlugs.add(HARDCODED_SLUG);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: HARDCODED_SLUG,
        file: {
          name: "moru.html",
          mimeType: "text/html",
          buffer: buildHtml("irrelevant"),
        },
      },
    });

    expect(response.status()).toBe(409);
    const body = await response.json();
    expect(body.error.code).toBe("slug_locked");
  });

  test("TC4: missing Authorization — 401 unauthorized", async ({ request }) => {
    const response = await request.post("/api/admin/projects/upload", {
      multipart: {
        slug: FRESH_SLUG,
        file: {
          name: "fresh.html",
          mimeType: "text/html",
          buffer: buildHtml("irrelevant"),
        },
      },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error.code).toBe("unauthorized");
  });

  test("TC5: invalid slug pattern — 400 invalid_slug", async ({ request }) => {
    usedSlugs.add(INVALID_SLUG);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: INVALID_SLUG,
        file: {
          name: "bad.html",
          mimeType: "text/html",
          buffer: buildHtml("irrelevant"),
        },
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("invalid_slug");
  });
});

// ---------------------------------------------------------------------------
// Edge-case tests added by Shield
// Slugs used below are added to usedSlugs defensively; in practice the API
// rejects before any blob write, so del() will be a no-op (swallowed by the
// existing try/catch in afterAll).
// ---------------------------------------------------------------------------

const EDGE_SLUG_EMPTY = "e2e-edge-empty";
const EDGE_SLUG_BAD_EXT = "e2e-edge-bad-ext";
const EDGE_SLUG_TOO_LARGE = "e2e-edge-too-large";

test.describe("edge cases — Shield", () => {
  test("EC1: empty file (0 bytes) — 400 bad_file_content", async ({ request }) => {
    // The route content-sniffs: trimStart() of empty string has length 0 → bad_file_content.
    usedSlugs.add(EDGE_SLUG_EMPTY);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: EDGE_SLUG_EMPTY,
        file: {
          name: "empty.html",
          mimeType: "text/html",
          buffer: Buffer.alloc(0),
        },
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("bad_file_content");
  });

  test("EC2: wrong file extension (.txt) — 400 bad_file_type", async ({ request }) => {
    // The route checks extension before content; .txt is not .html → bad_file_type.
    usedSlugs.add(EDGE_SLUG_BAD_EXT);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: EDGE_SLUG_BAD_EXT,
        file: {
          name: "x.txt",
          mimeType: "text/plain",
          buffer: buildHtml("valid-html-content"),
        },
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("bad_file_type");
  });

  test("EC3: file slightly over 5 MB — 400 file_too_large", async ({ request }) => {
    // Buffer filled with '<' (0x3c) so content would otherwise pass the HTML sniff,
    // but the size check fires first at step 8 in the route.
    usedSlugs.add(EDGE_SLUG_TOO_LARGE);

    const token = process.env.ADMIN_UPLOAD_KEY_B64!;
    const oversizedBuffer = Buffer.alloc(5 * 1024 * 1024 + 1, 0x3c);
    const response = await request.post("/api/admin/projects/upload", {
      headers: { authorization: `Bearer ${token}` },
      multipart: {
        slug: EDGE_SLUG_TOO_LARGE,
        file: {
          name: "toobig.html",
          mimeType: "text/html",
          buffer: oversizedBuffer,
        },
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("file_too_large");
  });
});
