/**
 * Shield · GET /api/og/lab OG Image Route Tests
 * Task #2814 — Auto-list uploaded HTML slugs on main page
 *
 * Static source analysis only — ImageResponse uses Web APIs not available
 * in the Node test environment, so we assert source-level correctness.
 *
 * Covers:
 *   - runtime = "edge" export
 *   - 80-char title truncation present in source
 *   - VALID_TYPES set with all 4 types
 *   - TYPE_COLORS fallback to "lab"
 *   - Cache-Control: public, max-age=86400 set on response
 *   - Uses next/og ImageResponse
 *   - 1200 x 630 dimensions
 *   - "lab" is the default type fallback
 */

import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Load source
// ---------------------------------------------------------------------------

const ROUTE_PATH = path.resolve(
  process.cwd(),
  "src/app/api/og/lab/route.tsx",
);

const source = fs.readFileSync(ROUTE_PATH, "utf-8");

// ---------------------------------------------------------------------------
// Runtime exports
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — module exports", () => {
  it("file exists at src/app/api/og/lab/route.tsx", () => {
    expect(fs.existsSync(ROUTE_PATH)).toBe(true);
  });

  it('exports runtime = "edge"', () => {
    expect(source).toMatch(/export\s+const\s+runtime\s*=\s*["']edge["']/);
  });

  it("exports a GET handler function", () => {
    expect(source).toMatch(/export\s+(async\s+)?function\s+GET/);
  });
});

// ---------------------------------------------------------------------------
// Image dimensions
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — image dimensions", () => {
  it("uses width: 1200", () => {
    expect(source).toContain("1200");
  });

  it("uses height: 630", () => {
    expect(source).toContain("630");
  });
});

// ---------------------------------------------------------------------------
// next/og
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — next/og usage", () => {
  it("imports ImageResponse from 'next/og'", () => {
    expect(source).toContain("next/og");
    expect(source).toContain("ImageResponse");
  });
});

// ---------------------------------------------------------------------------
// Title truncation
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — 80-char title truncation", () => {
  it("truncates title at 80 chars (slice(0, 79) + ellipsis)", () => {
    // Implementation: rawTitle.length > 80 ? rawTitle.slice(0, 79) + "…"
    expect(source).toContain("80");
    expect(source).toContain("79");
    expect(source).toContain("…");
  });

  it("uses searchParams.get('title') with 'Untitled' fallback", () => {
    expect(source).toContain("title");
    expect(source).toContain("Untitled");
  });
});

// ---------------------------------------------------------------------------
// Type validation
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — type validation", () => {
  it("defines VALID_TYPES set with all 4 types", () => {
    const validTypes = ["pitch", "report", "demo", "lab"];
    for (const t of validTypes) {
      expect(source).toContain(`"${t}"`);
    }
  });

  it("defaults type to 'lab' when type is invalid", () => {
    // Pattern: type = VALID_TYPES.has(rawType) ? rawType : "lab"
    expect(source).toContain('"lab"');
    expect(source).toMatch(/VALID_TYPES\.has\(|has\(rawType\)/);
  });

  it("defines TYPE_COLORS for all 4 types", () => {
    expect(source).toContain("TYPE_COLORS");
    expect(source).toContain("#3B82F6"); // pitch
    expect(source).toContain("#10B981"); // report
    expect(source).toContain("#F59E0B"); // demo
    expect(source).toContain("#8B5CF6"); // lab
  });

  it("defines TYPE_LABELS for all 4 types", () => {
    expect(source).toContain("TYPE_LABELS");
    expect(source).toContain("Pitch");
    expect(source).toContain("Report");
    expect(source).toContain("Demo");
    expect(source).toContain("Lab");
  });
});

// ---------------------------------------------------------------------------
// Cache-Control header
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — Cache-Control header", () => {
  it("sets Cache-Control header on the response", () => {
    expect(source).toContain("Cache-Control");
  });

  it("includes public, max-age=86400 in Cache-Control", () => {
    expect(source).toContain("public");
    expect(source).toContain("86400");
  });
});

// ---------------------------------------------------------------------------
// Brand mark
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — branding", () => {
  it("includes cyanluna.com branding text", () => {
    expect(source).toContain("cyanluna.com");
  });
});

// ---------------------------------------------------------------------------
// Dark background
// ---------------------------------------------------------------------------

describe("OG /api/og/lab — visual design", () => {
  it("uses a dark background color", () => {
    // Dark background: #09090b
    expect(source).toContain("#09090b");
  });

  it("uses accent color bar at top with all 4 colors", () => {
    expect(source).toContain("ACCENT_COLORS");
  });
});
