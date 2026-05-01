import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ADMIN_UPLOAD_ENV_KEY,
  hasConfiguredAdminKey,
  verifyAdminToken,
} from "@/lib/admin-auth";

// Valid base64 key: decodes cleanly, 24 chars (18 raw bytes)
// Standard form: "dGVzdC1hZG1pbi1rZXk=" → URL-safe: "dGVzdC1hZG1pbi1rZXk="
// We use a simple known value for fixture clarity.
const VALID_KEY_B64 = "dGVzdC1hZG1pbi1rZXkx"; // "test-admin-key1" in base64
// URL-safe variant of the same key (no +/= chars in this value, but use one that has them)
const VALID_KEY_WITH_SPECIAL = "dGVzdCtzcGVjaWFs"; // decodes to "test+special"
// URL-safe equivalent: replace + -> -, / -> _
const VALID_KEY_URL_SAFE = "dGVzdCtzcGVjaWFs".replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
// A different-length valid base64 key (sidechannel branch)
const SHORT_KEY_B64 = "c2hvcnQ="; // "short"

afterEach(() => {
  vi.unstubAllEnvs();
});

// ---------------------------------------------------------------------------
// ADMIN_UPLOAD_ENV_KEY constant
// ---------------------------------------------------------------------------

describe("ADMIN_UPLOAD_ENV_KEY", () => {
  it('equals "ADMIN_UPLOAD_KEY_B64"', () => {
    expect(ADMIN_UPLOAD_ENV_KEY).toBe("ADMIN_UPLOAD_KEY_B64");
  });
});

// ---------------------------------------------------------------------------
// hasConfiguredAdminKey
// ---------------------------------------------------------------------------

describe("hasConfiguredAdminKey", () => {
  it("returns false when env is not set", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", undefined as unknown as string);
    expect(hasConfiguredAdminKey()).toBe(false);
  });

  it("returns false when env is an empty string", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", "");
    expect(hasConfiguredAdminKey()).toBe(false);
  });

  it("returns false when env is invalid base64", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", "!!!not-base64!!!");
    expect(hasConfiguredAdminKey()).toBe(false);
  });

  it("returns true when env is a valid base64 key", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(hasConfiguredAdminKey()).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// verifyAdminToken — env not configured
// ---------------------------------------------------------------------------

describe("verifyAdminToken — env not configured", () => {
  it("returns false for any input when env is not set", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", undefined as unknown as string);
    expect(verifyAdminToken(`Bearer ${VALID_KEY_B64}`)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// verifyAdminToken — all 8 AC cases
// ---------------------------------------------------------------------------

describe("verifyAdminToken", () => {
  it("returns true for Bearer <correct-token>", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken(`Bearer ${VALID_KEY_B64}`)).toBe(true);
  });

  it("returns true for bearer <correct-token> (case-insensitive)", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken(`bearer ${VALID_KEY_B64}`)).toBe(true);
  });

  it("returns false for null input", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken(null)).toBe(false);
  });

  it("returns false for empty string", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken("")).toBe(false);
  });

  it("returns false when Bearer prefix is missing (raw token only)", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken(VALID_KEY_B64)).toBe(false);
  });

  it("returns false for 'Bearer ' with empty token part", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    // Regex requires \S+ so "Bearer " with trailing space and no token fails
    expect(verifyAdminToken("Bearer ")).toBe(false);
  });

  it("returns false for Bearer <wrong-token>", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64);
    expect(verifyAdminToken("Bearer d3JvbmctdG9rZW4=")).toBe(false);
  });

  it("returns false when env is set to invalid base64 and correct header is sent", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", "!!!not-base64!!!");
    expect(verifyAdminToken(`Bearer ${VALID_KEY_B64}`)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// verifyAdminToken — URL-safe base64
// ---------------------------------------------------------------------------

describe("verifyAdminToken — URL-safe base64 input", () => {
  it("accepts URL-safe base64 token when env stores standard base64", () => {
    // Use a key that contains + or / to make the URL-safe conversion meaningful.
    // "test+special" in standard base64 is "dGVzdCtzcGVjaWFs"
    // URL-safe form replaces nothing here (no + or /), so pick one with slash:
    // "test/slash" = "dGVzdC9zbGFzaA==" standard, URL-safe: "dGVzdC9zbGFzaA"
    const standardKey = "dGVzdC9zbGFzaA==";
    const urlSafeKey = "dGVzdC9zbGFzaA"; // stripped padding; / already gone in this string
    // Actually let's use a key with a literal slash: btoa("any/data") = "YW55L2RhdGE="
    // URL-safe: "YW55L2RhdGE" → replace / with _: "YW55L2RhdGE" has no slash after b64
    // Let's pick "YW55L2RhdGE=" (contains /) → URL-safe "YW55L2RhdGE" (no slash after encoding)
    // Actually use "any/data": btoa = "YW55L2RhdGE=" — the slash is in the base64 string
    const keyWithSlash = "YW55L2RhdGE="; // contains /
    const urlSafe = "YW55L2RhdGE"; // drop padding, / stays (no slash in this encoded value)

    // Use VALID_KEY_B64 (no special chars) but demonstrate URL-safe with + key:
    // "dGVzdCtzcGVjaWFs" has no + or / in it. Use keyWithSlash instead.
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", keyWithSlash);
    // URL-safe version replaces / with _ and strips =
    const urlSafeToken = keyWithSlash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(verifyAdminToken(`Bearer ${urlSafeToken}`)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// verifyAdminToken — different-length token (sidechannel branch)
// ---------------------------------------------------------------------------

describe("verifyAdminToken — different-length token", () => {
  it("returns false without throwing when token length differs from configured key", () => {
    vi.stubEnv("ADMIN_UPLOAD_KEY_B64", VALID_KEY_B64); // 20 chars normalized
    // SHORT_KEY_B64 = "c2hvcnQ=" which normalizes to "c2hvcnQ=" (8 chars) — different length
    expect(verifyAdminToken(`Bearer ${SHORT_KEY_B64}`)).toBe(false);
  });
});
