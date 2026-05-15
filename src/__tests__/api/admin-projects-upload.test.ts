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
  putProjectMeta: vi.fn(),
  isValidProjectType: vi.fn().mockReturnValue(true),
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
  putProjectMeta,
  isValidProjectType,
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
    type?: string | null;
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

  if (options.type !== undefined && options.type !== null) {
    fd.set("type", options.type);
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
  vi.mocked(isValidProjectType).mockReturnValue(true);
  vi.mocked(getProjectHtmlUrl).mockResolvedValue(existing);
  vi.mocked(putProjectHtml).mockResolvedValue({
    url: BLOB_URL,
    pathname: "portfolio-html/my-project.html",
  });
  vi.mocked(putProjectMeta).mockResolvedValue(undefined);
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
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith("/");
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
    expect(vi.mocked(revalidatePath)).toHaveBeenCalledWith("/");
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

  // --- EC-3. revalidatePath called for both the slug path and the root ---
  it("calls revalidatePath for '/projects/<slug>' and '/'", async () => {
    const slug = "my-project";
    setupHappyPathMocks(null);

    await POST(makeRequest({ slug }));

    const calls = vi.mocked(revalidatePath).mock.calls.map((c) => c[0]);
    expect(calls).toContain(`/projects/${slug}`);
    expect(calls).toContain("/");
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

    // Verify revalidatePath was invoked for the slug path and "/" (2 calls for this upload)
    const calls = vi.mocked(revalidatePath).mock.calls.map((c) => c[0]);
    expect(calls).toContain(`/projects/${slugB}`);
    expect(calls).toContain("/");
  });
});

// ---------------------------------------------------------------------------
// Shield — extractTitle() behavior via POST upload
// ---------------------------------------------------------------------------

describe("Shield — extractTitle title extraction via POST response", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // EC-T1: <title> tag present
  it("extracts title from <title> tag when present", async () => {
    setupHappyPathMocks(null);
    const htmlWithTitle = "<html><head><title>My Awesome Project</title></head><body><h1>Ignored H1</h1></body></html>";
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlWithTitle) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("My Awesome Project");
  });

  // EC-T2: No <title>, fallback to <h1>
  it("falls back to <h1> when no <title> tag exists", async () => {
    setupHappyPathMocks(null);
    const htmlNoTitle = "<html><body><h1>Dashboard Overview</h1></body></html>";
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlNoTitle) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("Dashboard Overview");
  });

  // EC-T3: <h1> with inner HTML tags stripped
  it("strips inner HTML tags from <h1> when using h1 fallback", async () => {
    setupHappyPathMocks(null);
    const htmlH1WithTags = "<html><body><h1>Project <span>Alpha</span> Report</h1></body></html>";
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlH1WithTags) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("Project Alpha Report");
  });

  // EC-T4: Neither <title> nor <h1> → formatSlug fallback
  it("falls back to formatSlug when neither <title> nor <h1> exists", async () => {
    setupHappyPathMocks(null);
    const htmlMinimal = "<html><body><p>No title here</p></body></html>";
    const res = await POST(makeRequest({
      slug: "my-project",
      file: makeHtmlFile(htmlMinimal),
    }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("My Project");
  });

  // EC-T5: Title > 80 chars gets truncated with "…"
  it("truncates title longer than 80 chars with ellipsis", async () => {
    setupHappyPathMocks(null);
    const longTitle = "A".repeat(90);
    const htmlLongTitle = `<html><head><title>${longTitle}</title></head><body></body></html>`;
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlLongTitle) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title.length).toBe(80);
    expect(body.title.endsWith("…")).toBe(true);
  });

  // EC-T6: Exactly 80 chars is NOT truncated
  it("does not truncate a title of exactly 80 chars", async () => {
    setupHappyPathMocks(null);
    const exactTitle = "B".repeat(80);
    const htmlExact = `<html><head><title>${exactTitle}</title></head><body></body></html>`;
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlExact) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe(exactTitle);
    expect(body.title.endsWith("…")).toBe(false);
  });

  // EC-T7: HTML entities decoded in title
  it("decodes HTML entities in <title> content", async () => {
    setupHappyPathMocks(null);
    const htmlEntities = "<html><head><title>Tom &amp; Jerry &lt;Pitch&gt;</title></head><body></body></html>";
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlEntities) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("Tom & Jerry <Pitch>");
  });

  // EC-T8: Empty <title> tag falls through to next strategy
  it("falls through to <h1> when <title> is empty", async () => {
    setupHappyPathMocks(null);
    const htmlEmptyTitle = "<html><head><title></title></head><body><h1>Real Title</h1></body></html>";
    const res = await POST(makeRequest({ file: makeHtmlFile(htmlEmptyTitle) }));

    expect(res.status).toBe(200);
    const body = await res.json() as { title: string };
    expect(body.title).toBe("Real Title");
  });
});

// ---------------------------------------------------------------------------
// Shield — type field handling
// ---------------------------------------------------------------------------

describe("Shield — type field handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // EC-TY1: Explicit valid type "pitch" returned in response
  it("uses type=pitch from FormData when isValidProjectType returns true", async () => {
    setupHappyPathMocks(null);
    vi.mocked(isValidProjectType).mockReturnValue(true);
    const res = await POST(makeRequest({ type: "pitch" }));

    expect(res.status).toBe(200);
    const body = await res.json() as { type: string };
    expect(body.type).toBe("pitch");
  });

  // EC-TY2: No type field → defaults to "lab"
  it("defaults type to 'lab' when type is absent from FormData", async () => {
    setupHappyPathMocks(null);
    const res = await POST(makeRequest({ type: null })); // null = don't add type field

    expect(res.status).toBe(200);
    const body = await res.json() as { type: string };
    expect(body.type).toBe("lab");
  });

  // EC-TY3: Invalid type value → defaults to "lab"
  it("defaults type to 'lab' when isValidProjectType returns false for invalid value", async () => {
    setupHappyPathMocks(null);
    vi.mocked(isValidProjectType).mockReturnValue(false);
    const res = await POST(makeRequest({ type: "invalid-type" }));

    expect(res.status).toBe(200);
    const body = await res.json() as { type: string };
    expect(body.type).toBe("lab");
  });

  // EC-TY4: putProjectMeta called with the correct type
  it("calls putProjectMeta with the resolved type value", async () => {
    setupHappyPathMocks(null);
    vi.mocked(isValidProjectType).mockReturnValue(true);
    await POST(makeRequest({ type: "report" }));

    expect(vi.mocked(putProjectMeta)).toHaveBeenCalledWith(
      VALID_SLUG,
      expect.objectContaining({ type: "report" }),
    );
  });

  // EC-TY5: putProjectMeta called with slug and uploadedAt ISO string
  it("calls putProjectMeta with the slug and an uploadedAt ISO string", async () => {
    setupHappyPathMocks(null);
    await POST(makeRequest());

    expect(vi.mocked(putProjectMeta)).toHaveBeenCalledWith(
      VALID_SLUG,
      expect.objectContaining({
        uploadedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      }),
    );
  });
});

// ---------------------------------------------------------------------------
// Shield — putProjectMeta failure is non-fatal
// ---------------------------------------------------------------------------

describe("Shield — putProjectMeta failure is non-fatal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // EC-NF1: putProjectMeta throws → upload still succeeds (200)
  it("still returns 200 ok:true when putProjectMeta throws", async () => {
    setupHappyPathMocks(null);
    vi.mocked(putProjectMeta).mockRejectedValueOnce(new Error("Meta write failed"));

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean };
    expect(body.ok).toBe(true);
  });

  // EC-NF2: putProjectMeta throws → response still contains slug and url
  it("response still has slug and url when putProjectMeta throws", async () => {
    setupHappyPathMocks(null);
    vi.mocked(putProjectMeta).mockRejectedValueOnce(new Error("Network error"));

    const res = await POST(makeRequest({ slug: VALID_SLUG }));
    const body = await res.json() as { ok: boolean; slug: string; url: string };

    expect(body.slug).toBe(VALID_SLUG);
    expect(body.url).toBe(`/projects/${VALID_SLUG}`);
  });

  // EC-NF3: putProjectMeta throws → revalidatePath still called
  it("still calls revalidatePath when putProjectMeta throws", async () => {
    setupHappyPathMocks(null);
    vi.mocked(putProjectMeta).mockRejectedValueOnce(new Error("Blob error"));

    await POST(makeRequest({ slug: VALID_SLUG }));

    const calls = vi.mocked(revalidatePath).mock.calls.map((c) => c[0]);
    expect(calls).toContain(`/projects/${VALID_SLUG}`);
    expect(calls).toContain("/");
  });

  // EC-NF4: putProjectMeta rejects with non-Error → upload still succeeds
  it("still returns 200 when putProjectMeta rejects with a string (non-Error)", async () => {
    setupHappyPathMocks(null);
    vi.mocked(putProjectMeta).mockRejectedValueOnce("string error");

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    const body = await res.json() as { ok: boolean };
    expect(body.ok).toBe(true);
  });
});
