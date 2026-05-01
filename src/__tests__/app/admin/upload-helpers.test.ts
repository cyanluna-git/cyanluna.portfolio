import { describe, expect, it } from "vitest";
import {
  classifySlug,
  validateFile,
  canSubmit,
  buildUploadFormData,
  buildAuthHeader,
  interpretUploadResponse,
} from "@/app/admin/upload/upload-helpers";
import { messageForCode } from "@/app/admin/upload/error-messages";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const HARDCODED = ["moru", "smart-factory-qc"];
const STATIC = ["moru", "smart-factory-qc", "equipment-gateway", "resource-board", "ai-cycling-coach"];

// ---------------------------------------------------------------------------
// classifySlug
// ---------------------------------------------------------------------------

describe("classifySlug", () => {
  it("returns 'empty' for an empty string", () => {
    expect(classifySlug("", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "empty" });
  });

  it("returns 'invalid' for uppercase slug", () => {
    expect(classifySlug("UPPER", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "invalid" });
  });

  it("returns 'invalid' for slug starting with a hyphen", () => {
    expect(classifySlug("-bad", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "invalid" });
  });

  it("returns 'hardcoded' for 'moru'", () => {
    expect(classifySlug("moru", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "hardcoded" });
  });

  it("returns 'hardcoded' for 'smart-factory-qc'", () => {
    expect(classifySlug("smart-factory-qc", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "hardcoded" });
  });

  it("returns 'static' for a slug in staticSlugs but not hardcoded", () => {
    expect(classifySlug("equipment-gateway", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "static" });
  });

  it("returns 'new' for an unknown slug that passes regex", () => {
    expect(classifySlug("brand-new-project", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED })).toMatchObject({ kind: "new" });
  });

  it("includes a message string for invalid slugs", () => {
    const result = classifySlug("BAD!", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED });
    expect(result.kind).toBe("invalid");
    expect(result.message).toBeTruthy();
  });

  it("includes a message string for hardcoded slugs", () => {
    const result = classifySlug("moru", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED });
    expect(result.kind).toBe("hardcoded");
    expect(result.message).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// validateFile
// ---------------------------------------------------------------------------

describe("validateFile", () => {
  it("returns ok:false with 'file_too_large' for files over 5MB", () => {
    const file = { name: "x.html", size: 6_000_000 } as File;
    const result = validateFile(file);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("file_too_large");
  });

  it("returns ok:false with 'bad_file_type' for non-.html extension", () => {
    const file = { name: "x.txt", size: 100 } as File;
    const result = validateFile(file);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("bad_file_type");
  });

  it("returns ok:true for a valid .html file under 5MB", () => {
    const file = { name: "x.html", size: 1024 } as File;
    expect(validateFile(file)).toEqual({ ok: true });
  });

  it("returns ok:false with 'bad_file_type' for null (no file selected)", () => {
    const result = validateFile(null);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("bad_file_type");
  });

  it("accepts a file at exactly 5MB (boundary)", () => {
    const file = { name: "boundary.html", size: 5 * 1024 * 1024 } as File;
    expect(validateFile(file)).toEqual({ ok: true });
  });

  it("rejects a file at 5MB + 1 byte (over boundary)", () => {
    const file = { name: "over.html", size: 5 * 1024 * 1024 + 1 } as File;
    const result = validateFile(file);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("file_too_large");
  });
});

// ---------------------------------------------------------------------------
// canSubmit
// ---------------------------------------------------------------------------

describe("canSubmit", () => {
  const okFile = { ok: true } as const;
  const badFile = { ok: false, code: "bad_file_type" as const, message: "err" };

  it("returns true when token, new slug, and valid file are all present", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "new" }, fileResult: okFile })).toBe(true);
  });

  it("returns true for a static slug (warning only, submit allowed)", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "static" }, fileResult: okFile })).toBe(true);
  });

  it("returns false when token is empty", () => {
    expect(canSubmit({ token: "", slugClass: { kind: "new" }, fileResult: okFile })).toBe(false);
  });

  it("returns false when token is only whitespace", () => {
    expect(canSubmit({ token: "   ", slugClass: { kind: "new" }, fileResult: okFile })).toBe(false);
  });

  it("returns false for a hardcoded slug", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "hardcoded" }, fileResult: okFile })).toBe(false);
  });

  it("returns false for an invalid slug", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "invalid" }, fileResult: okFile })).toBe(false);
  });

  it("returns false for an empty slug", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "empty" }, fileResult: okFile })).toBe(false);
  });

  it("returns false when file is invalid", () => {
    expect(canSubmit({ token: "tok", slugClass: { kind: "new" }, fileResult: badFile })).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// buildUploadFormData
// ---------------------------------------------------------------------------

describe("buildUploadFormData", () => {
  it("includes slug and file entries", () => {
    const file = new File(["<html/>"], "test.html", { type: "text/html" });
    const fd = buildUploadFormData("my-slug", file);
    expect(fd.get("slug")).toBe("my-slug");
    expect(fd.get("file")).toBe(file);
  });
});

// ---------------------------------------------------------------------------
// buildAuthHeader
// ---------------------------------------------------------------------------

describe("buildAuthHeader", () => {
  it("returns Bearer-prefixed Authorization header", () => {
    expect(buildAuthHeader("my-token")).toEqual({ Authorization: "Bearer my-token" });
  });

  it("handles an empty token", () => {
    expect(buildAuthHeader("")).toEqual({ Authorization: "Bearer " });
  });
});

// ---------------------------------------------------------------------------
// interpretUploadResponse
// ---------------------------------------------------------------------------

describe("interpretUploadResponse", () => {
  it("returns 'success' kind with replaced:true for a 200 replace response", () => {
    const body = { ok: true, slug: "a", url: "/projects/a", replaced: true };
    const result = interpretUploadResponse(200, body);
    expect(result).toMatchObject({ kind: "success", slug: "a", replaced: true });
  });

  it("returns 'success' kind with replaced:false for a 200 new-upload response", () => {
    const body = { ok: true, slug: "b", url: "/projects/b", replaced: false };
    const result = interpretUploadResponse(200, body);
    expect(result).toMatchObject({ kind: "success", slug: "b", replaced: false });
  });

  it("returns 'error' kind with KO message for 401 unauthorized", () => {
    const body = { error: { code: "unauthorized", message: "bad token" } };
    const result = interpretUploadResponse(401, body);
    expect(result).toMatchObject({ kind: "error", code: "unauthorized" });
    if (result.kind === "error") {
      expect(result.message).toBe("토큰이 잘못됐거나 누락됐어요.");
    }
  });

  it("returns 'error' kind with KO message for 413 file_too_large", () => {
    const body = { error: { code: "file_too_large", message: "too big" } };
    const result = interpretUploadResponse(413, body);
    expect(result).toMatchObject({ kind: "error", code: "file_too_large" });
    if (result.kind === "error") {
      expect(result.message).toBe("파일이 5MB를 초과합니다.");
    }
  });

  it("returns 'network_error' for malformed 200 body", () => {
    const result = interpretUploadResponse(200, { garbage: true });
    expect(result.kind).toBe("network_error");
  });

  it("returns 'network_error' for 500 with unparseable body", () => {
    const result = interpretUploadResponse(500, null);
    expect(result.kind).toBe("network_error");
  });

  it("returns 'network_error' for unexpected status codes", () => {
    const result = interpretUploadResponse(302, null);
    expect(result.kind).toBe("network_error");
  });
});

// ---------------------------------------------------------------------------
// messageForCode
// ---------------------------------------------------------------------------

describe("messageForCode", () => {
  it("returns KO message for a known code", () => {
    expect(messageForCode("slug_locked")).toBe("이 슬러그는 보호된 라우트라 업로드할 수 없어요.");
  });

  it("returns fallback containing the code for unknown codes", () => {
    const msg = messageForCode("unknown_xyz");
    expect(msg).toContain("unknown_xyz");
  });
});

// ---------------------------------------------------------------------------
// edge cases — Shield
// ---------------------------------------------------------------------------

describe("edge cases — Shield", () => {
  // 1. classifySlug — case-sensitive: SLUG_PATTERN rejects uppercase even when
  //    a lowercase equivalent exists in staticSlugs ("ai-cycling-coach").
  it("classifySlug — rejects 'Ai-Cycling-Coach' (mixed-case) even though lowercase variant is in staticSlugs", () => {
    const result = classifySlug("Ai-Cycling-Coach", { staticSlugs: STATIC, hardcodedSlugs: HARDCODED });
    expect(result.kind).toBe("invalid");
  });

  // 2. classifySlug — boundary: exactly 64-char slug accepted; 65-char rejected.
  it("classifySlug — accepts a slug of exactly 64 characters", () => {
    // 1 leading char + 63 more = 64 total (SLUG_PATTERN: ^[a-z0-9][a-z0-9-]{0,63}$)
    const slug64 = "a" + "b".repeat(63);
    expect(slug64).toHaveLength(64);
    const result = classifySlug(slug64, { staticSlugs: STATIC, hardcodedSlugs: HARDCODED });
    expect(result.kind).toBe("new");
  });

  it("classifySlug — rejects a slug of 65 characters (one over boundary)", () => {
    const slug65 = "a" + "b".repeat(64);
    expect(slug65).toHaveLength(65);
    const result = classifySlug(slug65, { staticSlugs: STATIC, hardcodedSlugs: HARDCODED });
    expect(result.kind).toBe("invalid");
  });

  // 3. validateFile — file.size === 5 * 1024 * 1024 exactly (boundary).
  //    The check is `> MAX_FILE_SIZE`, so exact-boundary files must be accepted.
  //    Builder already covers this in validateFile describe; this is a Shield
  //    sanity-check that the `>` (not `>=`) semantics hold.
  it("validateFile — accepts a file at exactly 5 MB (boundary, > not >=)", () => {
    const file = { name: "exactly5mb.html", size: 5 * 1024 * 1024 } as File;
    expect(validateFile(file)).toEqual({ ok: true });
  });

  // 4. interpretUploadResponse — non-JSON / malformed body: null body on a 4xx
  //    should yield network_error with a non-empty message string.
  it("interpretUploadResponse — null body on 400 yields network_error with a message", () => {
    const result = interpretUploadResponse(400, null);
    expect(result.kind).toBe("network_error");
    if (result.kind === "network_error") {
      expect(typeof result.message).toBe("string");
      expect(result.message.length).toBeGreaterThan(0);
    }
  });

  it("interpretUploadResponse — body with missing error.code on 422 yields network_error", () => {
    // Malformed: has error object but code is absent
    const body = { error: { message: "something went wrong" } };
    const result = interpretUploadResponse(422, body);
    expect(result.kind).toBe("network_error");
  });

  // 5. interpretUploadResponse — replaced=true vs replaced=false wording sanity.
  //    Both should return kind:"success"; message wording is on the consumer side,
  //    but `replaced` flag must be faithfully propagated.
  it("interpretUploadResponse — replaced=true is propagated correctly", () => {
    const body = { ok: true, slug: "my-project", url: "/projects/my-project", replaced: true };
    const result = interpretUploadResponse(200, body);
    expect(result).toMatchObject({ kind: "success", replaced: true });
  });

  it("interpretUploadResponse — replaced=false is propagated correctly (new upload)", () => {
    const body = { ok: true, slug: "brand-new", url: "/projects/brand-new", replaced: false };
    const result = interpretUploadResponse(200, body);
    expect(result).toMatchObject({ kind: "success", replaced: false });
  });
});
