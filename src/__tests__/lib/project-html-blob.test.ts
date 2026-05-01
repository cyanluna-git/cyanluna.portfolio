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
  };
});

import { BlobNotFoundError, head, put } from "@vercel/blob";
import {
  BLOB_PREFIX,
  HARDCODED_SLUGS,
  SLUG_PATTERN,
  getBlobKey,
  getProjectHtmlUrl,
  isHardcodedSlug,
  putProjectHtml,
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
  it('contains exactly ["moru", "smart-factory-qc"]', () => {
    expect([...HARDCODED_SLUGS]).toEqual(["moru", "smart-factory-qc"]);
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
  it('returns true for "moru"', () => {
    expect(isHardcodedSlug("moru")).toBe(true);
  });

  it('returns true for "smart-factory-qc"', () => {
    expect(isHardcodedSlug("smart-factory-qc")).toBe(true);
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

  it("throws with hardcoded message when slug is a hardcoded route (moru)", async () => {
    await expect(putProjectHtml("moru", "content")).rejects.toThrow(
      'Slug is hardcoded and cannot be uploaded: "moru"',
    );
  });

  it("throws with hardcoded message for smart-factory-qc", async () => {
    await expect(
      putProjectHtml("smart-factory-qc", "content"),
    ).rejects.toThrow("Slug is hardcoded and cannot be uploaded");
  });

  it("does not call put() when slug is invalid", async () => {
    await expect(putProjectHtml("Bad!", "content")).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("does not call put() when slug is hardcoded", async () => {
    await expect(putProjectHtml("moru", "content")).rejects.toThrow();
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
