import { beforeEach, describe, expect, it, vi } from "vitest";

// Mocks must be hoisted before the module under test is imported.
vi.mock("@/lib/admin-auth", () => ({
  hasConfiguredAdminKey: vi.fn(),
  verifyAdminToken: vi.fn(),
  ADMIN_UPLOAD_ENV_KEY: "ADMIN_UPLOAD_KEY_B64",
}));

vi.mock("@/lib/project-html-blob", () => ({
  validateSlug: vi.fn(),
  isHardcodedSlug: vi.fn(),
  putProjectHtml: vi.fn(),
  getProjectHtmlUrl: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { hasConfiguredAdminKey, verifyAdminToken } from "@/lib/admin-auth";
import {
  validateSlug,
  isHardcodedSlug,
  putProjectHtml,
  getProjectHtmlUrl,
} from "@/lib/project-html-blob";
import { revalidatePath } from "next/cache";
import { POST } from "@/app/api/admin/projects/upload/route";

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

const VALID_SLUG = "my-project";
const VALID_HTML = "<html><body>Hello</body></html>";
const VALID_AUTH = "Bearer dGVzdC1rZXk=";
const BLOB_URL = "https://blob.vercel-storage.com/portfolio-html/my-project.html";

function makeHtmlFile(
  content = VALID_HTML,
  name = "index.html",
  type = "text/html",
): File {
  return new File([content], name, { type });
}

function makeRequest(
  options: {
    slug?: string | null;
    file?: File | null;
    auth?: string | null;
    skipFile?: boolean;
    skipSlug?: boolean;
  } = {},
): Request {
  const fd = new FormData();

  if (!options.skipSlug) {
    const slug = options.slug !== undefined ? options.slug : VALID_SLUG;
    if (slug !== null) {
      fd.set("slug", slug);
    }
  }

  if (!options.skipFile) {
    const file = options.file !== undefined ? options.file : makeHtmlFile();
    if (file !== null) {
      fd.set("file", file);
    }
  }

  const headers: Record<string, string> = {};
  const auth = options.auth !== undefined ? options.auth : VALID_AUTH;
  if (auth !== null) {
    headers["authorization"] = auth;
  }

  return new Request("http://localhost/api/admin/projects/upload", {
    method: "POST",
    headers,
    body: fd,
  });
}

/** Set up the "happy path" mocks — individual tests override what they need. */
function setupHappyPathMocks(existing: string | null = null): void {
  vi.mocked(hasConfiguredAdminKey).mockReturnValue(true);
  vi.mocked(verifyAdminToken).mockReturnValue(true);
  vi.mocked(validateSlug).mockReturnValue(true);
  vi.mocked(isHardcodedSlug).mockReturnValue(false);
  vi.mocked(getProjectHtmlUrl).mockResolvedValue(existing);
  vi.mocked(putProjectHtml).mockResolvedValue({
    url: BLOB_URL,
    pathname: "portfolio-html/my-project.html",
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

// --- 1. server_misconfigured (500) ---

describe("POST /api/admin/projects/upload", () => {
  it("returns 500 server_misconfigured when admin key is not configured", async () => {
    vi.mocked(hasConfiguredAdminKey).mockReturnValue(false);
    vi.mocked(verifyAdminToken).mockReturnValue(true);

    const res = await POST(makeRequest());

    expect(res.status).toBe(500);
    const body = await res.json() as { error: { code: string; message: string } };
    expect(body.error.code).toBe("server_misconfigured");
  });

  // --- 2. unauthorized (401) ---

  it("returns 401 unauthorized when auth token is invalid", async () => {
    vi.mocked(hasConfiguredAdminKey).mockReturnValue(true);
    vi.mocked(verifyAdminToken).mockReturnValue(false);

    const res = await POST(makeRequest({ auth: "Bearer wrong-token" }));

    expect(res.status).toBe(401);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("unauthorized");
  });

  // --- 3. bad_form: slug missing (400) ---

  it("returns 400 bad_form with field=slug when slug is missing", async () => {
    setupHappyPathMocks();

    const res = await POST(makeRequest({ skipSlug: true }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string; details: { field: string } } };
    expect(body.error.code).toBe("bad_form");
    expect(body.error.details.field).toBe("slug");
  });

  // --- 4. bad_form: file missing (400) ---

  it("returns 400 bad_form with field=file when file is missing", async () => {
    setupHappyPathMocks();

    const res = await POST(makeRequest({ skipFile: true }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string; details: { field: string } } };
    expect(body.error.code).toBe("bad_form");
    expect(body.error.details.field).toBe("file");
  });

  // --- 5. invalid_slug (400) ---

  it("returns 400 invalid_slug when slug fails pattern validation", async () => {
    setupHappyPathMocks();
    vi.mocked(validateSlug).mockReturnValue(false);

    const res = await POST(makeRequest({ slug: "INVALID SLUG!" }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("invalid_slug");
  });

  // --- 6. slug_locked (409) ---

  it("returns 409 slug_locked for hardcoded slug", async () => {
    setupHappyPathMocks();
    vi.mocked(isHardcodedSlug).mockReturnValue(true);

    const res = await POST(makeRequest({ slug: "moru" }));

    expect(res.status).toBe(409);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("slug_locked");
  });

  // --- 7. file_too_large (400) ---

  it("returns 400 file_too_large for a file exceeding 5 MB", async () => {
    setupHappyPathMocks();
    const oversizedContent = "x".repeat(5 * 1024 * 1024 + 1);
    const bigFile = makeHtmlFile(`<html>${oversizedContent}</html>`);

    const res = await POST(makeRequest({ file: bigFile }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string; details: { maxBytes: number; actualBytes: number } } };
    expect(body.error.code).toBe("file_too_large");
    expect(body.error.details.maxBytes).toBe(5 * 1024 * 1024);
    expect(body.error.details.actualBytes).toBeGreaterThan(5 * 1024 * 1024);
  });

  // --- 8. bad_file_type (400) - wrong extension ---

  it("returns 400 bad_file_type for a .txt file", async () => {
    setupHappyPathMocks();
    const txtFile = new File([VALID_HTML], "index.txt", { type: "text/plain" });

    const res = await POST(makeRequest({ file: txtFile }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("bad_file_type");
  });

  // --- 9. bad_file_content (400) - content doesn't start with < ---

  it("returns 400 bad_file_content when file content does not start with <", async () => {
    setupHappyPathMocks();
    const nonHtmlFile = makeHtmlFile("This is not HTML");

    const res = await POST(makeRequest({ file: nonHtmlFile }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("bad_file_content");
  });

  it("returns 400 bad_file_content for an empty file (0 bytes)", async () => {
    setupHappyPathMocks();
    const emptyFile = makeHtmlFile("");

    const res = await POST(makeRequest({ file: emptyFile }));

    expect(res.status).toBe(400);
    const body = await res.json() as { error: { code: string } };
    expect(body.error.code).toBe("bad_file_content");
  });

  // --- 10. storage_check_failed (500) ---

  it("returns 500 storage_check_failed when getProjectHtmlUrl throws", async () => {
    setupHappyPathMocks();
    vi.mocked(getProjectHtmlUrl).mockRejectedValue(new Error("Network timeout"));

    const res = await POST(makeRequest());

    expect(res.status).toBe(500);
    const body = await res.json() as { error: { code: string; details: { reason: string } } };
    expect(body.error.code).toBe("storage_check_failed");
    expect(body.error.details.reason).toBe("Network timeout");
  });

  // --- 11. storage_put_failed (500) ---

  it("returns 500 storage_put_failed when putProjectHtml throws", async () => {
    setupHappyPathMocks();
    vi.mocked(putProjectHtml).mockRejectedValue(new Error("Upload failed"));

    const res = await POST(makeRequest());

    expect(res.status).toBe(500);
    const body = await res.json() as { error: { code: string; details: { reason: string } } };
    expect(body.error.code).toBe("storage_put_failed");
    expect(body.error.details.reason).toBe("Upload failed");
  });

  // --- 12. happy path: new slug (replaced=false) ---

  it("returns 200 with replaced=false for a new slug and calls revalidatePath", async () => {
    setupHappyPathMocks(null); // getProjectHtmlUrl returns null → new

    const res = await POST(makeRequest({ slug: VALID_SLUG }));

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean; slug: string; url: string; replaced: boolean };
    expect(body.ok).toBe(true);
    expect(body.slug).toBe(VALID_SLUG);
    expect(body.url).toBe(`/projects/${VALID_SLUG}`);
    expect(body.replaced).toBe(false);
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith(`/projects/${VALID_SLUG}`);
  });

  // --- 13. happy path: existing slug (replaced=true) ---

  it("returns 200 with replaced=true when slug already has a stored file", async () => {
    setupHappyPathMocks(BLOB_URL); // getProjectHtmlUrl returns existing URL → replaced

    const res = await POST(makeRequest({ slug: VALID_SLUG }));

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean; replaced: boolean; url: string };
    expect(body.ok).toBe(true);
    expect(body.replaced).toBe(true);
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith(`/projects/${VALID_SLUG}`);
  });

  // --- 14. success response must NOT expose blob storage URL ---

  it("does not include a blob storage URL in the success response body", async () => {
    setupHappyPathMocks(null);

    const res = await POST(makeRequest({ slug: VALID_SLUG }));

    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).not.toMatch(/blob\.vercel/);
    expect(bodyText).not.toMatch(/vercel-storage\.com/);
  });
});

// ---------------------------------------------------------------------------
// Edge cases — Shield
// ---------------------------------------------------------------------------

describe("edge cases — Shield", () => {
  // --- EC-1. Bearer prefix lowercase accepted ---
  it("accepts lowercase 'bearer' prefix and proceeds to 200", async () => {
    setupHappyPathMocks(null);
    // verifyAdminToken is mocked to return true regardless of the header value;
    // this test confirms the route passes the raw header to verifyAdminToken
    // and that a lowercase prefix does not break the happy path.
    const res = await POST(makeRequest({ auth: "bearer dGVzdC1rZXk=" }));

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean };
    expect(body.ok).toBe(true);
    // verifyAdminToken must have been called with the lowercase header
    expect(vi.mocked(verifyAdminToken)).toHaveBeenCalledWith("bearer dGVzdC1rZXk=");
  });

  // --- EC-2. File exactly at the 5 MB boundary is accepted ---
  it("accepts a file whose size is exactly 5 MB (boundary is exclusive >)", async () => {
    setupHappyPathMocks(null);
    // 5 * 1024 * 1024 bytes exactly — the guard is `file.size > MAX_FILE_SIZE`
    // so this should NOT trigger file_too_large.
    const exactContent = "<" + "x".repeat(5 * 1024 * 1024 - 1); // length = 5*1024*1024
    const boundaryFile = makeHtmlFile(exactContent);
    expect(boundaryFile.size).toBe(5 * 1024 * 1024);

    const res = await POST(makeRequest({ file: boundaryFile }));

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean };
    expect(body.ok).toBe(true);
  });

  // --- EC-3. revalidatePath called exactly once with the correct path ---
  it("calls revalidatePath exactly once with '/projects/<slug>'", async () => {
    const slug = "my-project";
    setupHappyPathMocks(null);

    await POST(makeRequest({ slug }));

    const calls = vi.mocked(revalidatePath).mock.calls;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toBe(`/projects/${slug}`);
  });

  // --- EC-4. Hyphenated slug reaches the url field intact ---
  it("returns the hyphenated slug unchanged in the url field", async () => {
    const hyphenatedSlug = "foo-bar-baz";
    setupHappyPathMocks(null);
    vi.mocked(putProjectHtml).mockResolvedValue({
      url: `https://blob.vercel-storage.com/portfolio-html/${hyphenatedSlug}.html`,
      pathname: `portfolio-html/${hyphenatedSlug}.html`,
    });

    const res = await POST(makeRequest({ slug: hyphenatedSlug }));

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean; slug: string; url: string };
    expect(body.slug).toBe(hyphenatedSlug);
    expect(body.url).toBe(`/projects/${hyphenatedSlug}`);
  });

  // --- EC-5. Multiple sequential uploads with different slugs are independent ---
  it("handles two sequential uploads with different slugs independently", async () => {
    const slugA = "project-alpha";
    const slugB = "project-beta";

    // First upload
    setupHappyPathMocks(null);
    vi.mocked(putProjectHtml).mockResolvedValueOnce({
      url: `https://blob.vercel-storage.com/portfolio-html/${slugA}.html`,
      pathname: `portfolio-html/${slugA}.html`,
    });
    const resA = await POST(makeRequest({ slug: slugA }));
    expect(resA.status).toBe(200);
    const bodyA = await resA.json() as { ok: boolean; slug: string; replaced: boolean };
    expect(bodyA.slug).toBe(slugA);
    expect(bodyA.replaced).toBe(false);

    // Second upload — different slug, file already exists → replaced=true
    vi.clearAllMocks();
    setupHappyPathMocks(BLOB_URL); // existing URL signals replaced
    vi.mocked(putProjectHtml).mockResolvedValueOnce({
      url: `https://blob.vercel-storage.com/portfolio-html/${slugB}.html`,
      pathname: `portfolio-html/${slugB}.html`,
    });
    const resB = await POST(makeRequest({ slug: slugB }));
    expect(resB.status).toBe(200);
    const bodyB = await resB.json() as { ok: boolean; slug: string; replaced: boolean };
    expect(bodyB.slug).toBe(slugB);
    expect(bodyB.replaced).toBe(true);

    // Verify revalidatePath was invoked for each slug separately (once per upload call)
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith(`/projects/${slugB}`);
    expect(vi.mocked(revalidatePath).mock.calls).toHaveLength(1);
  });
});
