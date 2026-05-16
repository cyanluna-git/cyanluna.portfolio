import { beforeEach, describe, expect, it, vi } from "vitest";

// Must mock @vercel/blob before importing the module under test so vi.mock hoisting
// replaces the module before any top-level import resolves it.
vi.mock("@vercel/blob", () => {
  class BlobNotFoundError extends Error {
    constructor(message = "blob not found") {
      super(message);
      this.name = "BlobNotFoundError";
    }
  }
  return {
    BlobNotFoundError,
    put: vi.fn(),
    head: vi.fn(),
    list: vi.fn(),
    del: vi.fn(),
  };
});

// Mock global fetch for getProjectMeta URL fetching
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

import { BlobNotFoundError, head, put, list } from "@vercel/blob";
import {
  BLOB_PREFIX,
  HARDCODED_SLUGS,
  SLUG_PATTERN,
  getBlobKey,
  getMetaBlobKey,
  getProjectHtmlUrl,
  getProjectMeta,
  isHardcodedSlug,
  isValidProjectType,
  listUploadedProjects,
  putProjectHtml,
  putProjectMeta,
  validateSlug,
} from "@/lib/project-html-blob";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

describe("BLOB_PREFIX", () => {
  it('equals "portfolio-html/"', () => {
    expect(BLOB_PREFIX).toBe("portfolio-html/");
  });
});

describe("HARDCODED_SLUGS", () => {
  it("is an empty array (moru and smart-factory-qc were unlocked for blob upload)", () => {
    expect([...HARDCODED_SLUGS]).toEqual([]);
  });
});

describe("SLUG_PATTERN", () => {
  it("is a RegExp", () => {
    expect(SLUG_PATTERN).toBeInstanceOf(RegExp);
  });
});

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

describe("validateSlug", () => {
  // Valid cases
  it("accepts a single lowercase letter", () => {
    expect(validateSlug("a")).toBe(true);
  });

  it("accepts a single digit", () => {
    expect(validateSlug("1")).toBe(true);
  });

  it("accepts lowercase-alphanumeric with hyphens", () => {
    expect(validateSlug("ai-cycling-coach")).toBe(true);
  });

  it("accepts a slug that is exactly 64 characters (boundary max)", () => {
    // starts with alphanum, 63 more chars → total 64
    const slug = "a" + "b".repeat(63);
    expect(slug.length).toBe(64);
    expect(validateSlug(slug)).toBe(true);
  });

  it("accepts a slug that is exactly 1 character (boundary min)", () => {
    expect(validateSlug("z")).toBe(true);
  });

  // Invalid cases
  it("rejects an empty string", () => {
    expect(validateSlug("")).toBe(false);
  });

  it("rejects a slug with spaces", () => {
    expect(validateSlug("hello world")).toBe(false);
  });

  it("rejects a slug with uppercase letters", () => {
    expect(validateSlug("HelloWorld")).toBe(false);
  });

  it("rejects a slug with special characters", () => {
    expect(validateSlug("bad!slug")).toBe(false);
  });

  it("rejects a slug with a leading hyphen", () => {
    expect(validateSlug("-leading-hyphen")).toBe(false);
  });

  it("rejects a slug that is 65 characters long (one over max)", () => {
    const slug = "a" + "b".repeat(64);
    expect(slug.length).toBe(65);
    expect(validateSlug(slug)).toBe(false);
  });

  it("rejects a slug with underscore", () => {
    expect(validateSlug("under_score")).toBe(false);
  });
});

describe("isHardcodedSlug", () => {
  it('returns false for "moru" (unlocked)', () => {
    expect(isHardcodedSlug("moru")).toBe(false);
  });

  it('returns false for "smart-factory-qc" (unlocked)', () => {
    expect(isHardcodedSlug("smart-factory-qc")).toBe(false);
  });

  it("returns false for a non-hardcoded slug", () => {
    expect(isHardcodedSlug("ai-cycling-coach")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isHardcodedSlug("")).toBe(false);
  });

  it('returns false for a partial match like "moru-extra"', () => {
    expect(isHardcodedSlug("moru-extra")).toBe(false);
  });
});

describe("getBlobKey", () => {
  it("returns the correct blob pathname format", () => {
    expect(getBlobKey("foo")).toBe("portfolio-html/foo.html");
  });

  it("uses the exported BLOB_PREFIX", () => {
    expect(getBlobKey("my-project")).toBe(`${BLOB_PREFIX}my-project.html`);
  });

  it("appends .html extension to the slug", () => {
    const slug = "test-slug";
    expect(getBlobKey(slug)).toMatch(/\.html$/);
  });
});

// ---------------------------------------------------------------------------
// Network functions (mocked)
// ---------------------------------------------------------------------------

describe("putProjectHtml", () => {
  const mockPut = vi.mocked(put);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws with 'Invalid slug' message when slug fails validation", async () => {
    await expect(putProjectHtml("Bad Slug!", "content")).rejects.toThrow(
      'Invalid slug: "Bad Slug!"',
    );
  });

  it("throws on invalid slug before checking hardcoded (empty string)", async () => {
    await expect(putProjectHtml("", "content")).rejects.toThrow("Invalid slug");
  });

  it("does not call put() when slug is invalid", async () => {
    await expect(putProjectHtml("Bad!", "content")).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("calls put() with the correct blob key for a valid slug", async () => {
    const fakeResult = {
      url: "https://blob.vercel.com/portfolio-html/my-project.html",
      pathname: "portfolio-html/my-project.html",
      contentType: "text/html; charset=utf-8",
      contentDisposition: "inline",
      downloadUrl: "",
    };
    mockPut.mockResolvedValueOnce(fakeResult);

    await putProjectHtml("my-project", "<html/>");

    expect(mockPut).toHaveBeenCalledWith(
      "portfolio-html/my-project.html",
      "<html/>",
      expect.objectContaining({
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "text/html; charset=utf-8",
        access: "public",
      }),
    );
  });

  it("returns { url, pathname } from put result", async () => {
    const fakeResult = {
      url: "https://blob.vercel.com/portfolio-html/my-project.html",
      pathname: "portfolio-html/my-project.html",
      contentType: "text/html; charset=utf-8",
      contentDisposition: "inline",
      downloadUrl: "",
    };
    mockPut.mockResolvedValueOnce(fakeResult);

    const result = await putProjectHtml("my-project", "<html/>");

    expect(result).toEqual({
      url: fakeResult.url,
      pathname: fakeResult.pathname,
    });
  });
});

describe("getProjectHtmlUrl", () => {
  const mockHead = vi.mocked(head);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the url when head succeeds", async () => {
    const fakeResult = {
      url: "https://blob.vercel.com/portfolio-html/my-project.html",
      pathname: "portfolio-html/my-project.html",
      contentType: "text/html; charset=utf-8",
      contentDisposition: "inline",
      downloadUrl: "",
      size: 1024,
      uploadedAt: new Date(),
      cacheControl: "public, max-age=0",
    };
    mockHead.mockResolvedValueOnce(fakeResult);

    const url = await getProjectHtmlUrl("my-project");

    expect(url).toBe(fakeResult.url);
  });

  it("returns null when head throws BlobNotFoundError", async () => {
    mockHead.mockRejectedValueOnce(new BlobNotFoundError());

    const result = await getProjectHtmlUrl("nonexistent-slug");

    expect(result).toBeNull();
  });

  it("rethrows when head throws a generic Error", async () => {
    const networkError = new Error("Network failure");
    mockHead.mockRejectedValueOnce(networkError);

    await expect(getProjectHtmlUrl("my-project")).rejects.toThrow(
      "Network failure",
    );
  });

  it("rethrows non-BlobNotFoundError errors (auth failure)", async () => {
    const authError = new Error("Unauthorized");
    mockHead.mockRejectedValueOnce(authError);

    await expect(getProjectHtmlUrl("my-project")).rejects.toBe(authError);
  });

  it("calls head with the correct blob key", async () => {
    const fakeResult = {
      url: "https://blob.vercel.com/portfolio-html/some-slug.html",
      pathname: "portfolio-html/some-slug.html",
      contentType: "text/html; charset=utf-8",
      contentDisposition: "inline",
      downloadUrl: "",
      size: 512,
      uploadedAt: new Date(),
      cacheControl: "public, max-age=0",
    };
    mockHead.mockResolvedValueOnce(fakeResult);

    await getProjectHtmlUrl("some-slug");

    expect(mockHead).toHaveBeenCalledWith("portfolio-html/some-slug.html");
  });
});

// ---------------------------------------------------------------------------
// Metadata helpers
// ---------------------------------------------------------------------------

describe("isValidProjectType", () => {
  it('accepts "pitch"', () => {
    expect(isValidProjectType("pitch")).toBe(true);
  });

  it('accepts "report"', () => {
    expect(isValidProjectType("report")).toBe(true);
  });

  it('accepts "demo"', () => {
    expect(isValidProjectType("demo")).toBe(true);
  });

  it('accepts "lab"', () => {
    expect(isValidProjectType("lab")).toBe(true);
  });

  it("rejects an empty string", () => {
    expect(isValidProjectType("")).toBe(false);
  });

  it('rejects "unknown"', () => {
    expect(isValidProjectType("unknown")).toBe(false);
  });

  it("rejects null", () => {
    expect(isValidProjectType(null)).toBe(false);
  });

  it("rejects undefined", () => {
    expect(isValidProjectType(undefined)).toBe(false);
  });

  it("rejects a number", () => {
    expect(isValidProjectType(123)).toBe(false);
  });

  it("rejects an object", () => {
    expect(isValidProjectType({ type: "lab" })).toBe(false);
  });

  it('rejects "Lab" (wrong case)', () => {
    expect(isValidProjectType("Lab")).toBe(false);
  });
});

describe("getMetaBlobKey", () => {
  it("returns the correct meta blob pathname", () => {
    expect(getMetaBlobKey("my-project")).toBe("portfolio-html/my-project.meta.json");
  });
});

describe("putProjectMeta", () => {
  const mockPut = vi.mocked(put);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws for an invalid slug", async () => {
    await expect(
      putProjectMeta("Bad Slug!", { title: "T", type: "lab", uploadedAt: "2024-01-01T00:00:00Z" }),
    ).rejects.toThrow("Invalid slug");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("calls put with the meta blob key and correct options", async () => {
    mockPut.mockResolvedValueOnce({
      url: "https://blob.vercel.com/portfolio-html/my-project.meta.json",
      pathname: "portfolio-html/my-project.meta.json",
      contentType: "application/json",
      contentDisposition: "inline",
      downloadUrl: "",
      etag: "abc",
    });

    await putProjectMeta("my-project", { title: "My Project", type: "pitch", uploadedAt: "2024-01-01T00:00:00Z" });

    expect(mockPut).toHaveBeenCalledWith(
      "portfolio-html/my-project.meta.json",
      JSON.stringify({ title: "My Project", type: "pitch", uploadedAt: "2024-01-01T00:00:00Z" }),
      expect.objectContaining({
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        access: "public",
      }),
    );
  });
});

describe("getProjectMeta", () => {
  const mockHead = vi.mocked(head);

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it("returns null when BlobNotFoundError", async () => {
    mockHead.mockRejectedValueOnce(new BlobNotFoundError());
    const result = await getProjectMeta("nonexistent");
    expect(result).toBeNull();
  });

  it("rethrows non-BlobNotFoundError errors", async () => {
    const err = new Error("auth failure");
    mockHead.mockRejectedValueOnce(err);
    await expect(getProjectMeta("my-project")).rejects.toBe(err);
  });

  it("returns parsed meta on success", async () => {
    const meta = { title: "My Project", type: "pitch", uploadedAt: "2024-01-01T00:00:00Z" };
    mockHead.mockResolvedValueOnce({
      url: "https://blob.vercel.com/portfolio-html/my-project.meta.json",
      pathname: "portfolio-html/my-project.meta.json",
      contentType: "application/json",
      contentDisposition: "inline",
      downloadUrl: "",
      size: 100,
      uploadedAt: new Date(),
      cacheControl: "public",
      etag: "abc",
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => meta,
    });

    const result = await getProjectMeta("my-project");
    expect(result).toEqual(meta);
  });

  it("returns null when fetch response is not ok", async () => {
    mockHead.mockResolvedValueOnce({
      url: "https://blob.vercel.com/portfolio-html/my-project.meta.json",
      pathname: "portfolio-html/my-project.meta.json",
      contentType: "application/json",
      contentDisposition: "inline",
      downloadUrl: "",
      size: 100,
      uploadedAt: new Date(),
      cacheControl: "public",
      etag: "abc",
    });
    mockFetch.mockResolvedValueOnce({ ok: false });

    const result = await getProjectMeta("my-project");
    expect(result).toBeNull();
  });

  it("returns null when JSON is malformed or missing fields", async () => {
    mockHead.mockResolvedValueOnce({
      url: "https://blob.vercel.com/portfolio-html/my-project.meta.json",
      pathname: "portfolio-html/my-project.meta.json",
      contentType: "application/json",
      contentDisposition: "inline",
      downloadUrl: "",
      size: 100,
      uploadedAt: new Date(),
      cacheControl: "public",
      etag: "abc",
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpected: "data" }),
    });

    const result = await getProjectMeta("my-project");
    expect(result).toBeNull();
  });
});

describe("listUploadedProjects", () => {
  const mockList = vi.mocked(list);
  const mockHead = vi.mocked(head);

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it("returns empty array when no HTML blobs exist", async () => {
    mockList.mockResolvedValueOnce({ blobs: [], cursor: undefined, hasMore: false });
    const result = await listUploadedProjects();
    expect(result).toEqual([]);
  });

  it("filters out .meta.json blobs", async () => {
    mockList.mockResolvedValueOnce({
      blobs: [
        {
          pathname: "portfolio-html/my-project.meta.json",
          url: "https://blob.vercel.com/portfolio-html/my-project.meta.json",
          uploadedAt: new Date("2024-01-01"),
          size: 100,
          etag: "abc",
          contentType: "application/json",
          contentDisposition: "inline",
          downloadUrl: "",
          cacheControl: "public",
        },
      ],
      cursor: undefined,
      hasMore: false,
    });

    const result = await listUploadedProjects();
    expect(result).toEqual([]);
  });

  it("falls back to formatSlug when meta is missing", async () => {
    mockList.mockResolvedValueOnce({
      blobs: [
        {
          pathname: "portfolio-html/moru-scroll.html",
          url: "https://blob.vercel.com/portfolio-html/moru-scroll.html",
          uploadedAt: new Date("2024-06-01T00:00:00Z"),
          size: 500,
          etag: "abc",
          contentType: "text/html",
          contentDisposition: "inline",
          downloadUrl: "",
          cacheControl: "public",
        },
      ],
      cursor: undefined,
      hasMore: false,
    });
    // head throws BlobNotFoundError for meta
    mockHead.mockRejectedValueOnce(new BlobNotFoundError());

    const result = await listUploadedProjects();
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("moru-scroll");
    expect(result[0].title).toBe("Moru Scroll");
    expect(result[0].type).toBe("lab");
    expect(result[0].thumbnailUrl).toContain("/api/og/lab?");
  });

  it("sorts by uploadedAt descending", async () => {
    mockList.mockResolvedValueOnce({
      blobs: [
        {
          pathname: "portfolio-html/older.html",
          url: "https://blob.vercel.com/portfolio-html/older.html",
          uploadedAt: new Date("2024-01-01T00:00:00Z"),
          size: 100,
          etag: "a",
          contentType: "text/html",
          contentDisposition: "inline",
          downloadUrl: "",
          cacheControl: "public",
        },
        {
          pathname: "portfolio-html/newer.html",
          url: "https://blob.vercel.com/portfolio-html/newer.html",
          uploadedAt: new Date("2024-06-01T00:00:00Z"),
          size: 100,
          etag: "b",
          contentType: "text/html",
          contentDisposition: "inline",
          downloadUrl: "",
          cacheControl: "public",
        },
      ],
      cursor: undefined,
      hasMore: false,
    });
    // Both have no meta
    mockHead.mockRejectedValue(new BlobNotFoundError());

    const result = await listUploadedProjects();
    expect(result[0].slug).toBe("newer");
    expect(result[1].slug).toBe("older");
  });
});
