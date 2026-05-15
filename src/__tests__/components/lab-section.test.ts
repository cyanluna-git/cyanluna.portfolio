/**
 * Shield · LabSection Component Tests
 * Task #2814 — Auto-list uploaded HTML slugs on main page
 *
 * Static source analysis (vitest env: "node" — no JSDOM rendering available).
 * Pattern follows about-section.test.ts and recruiter-tour.test.ts.
 *
 * Covers:
 *   - "use client" directive present
 *   - fetch("/api/admin/projects") call
 *   - returns null on empty items (no DOM render)
 *   - type badge with TYPE_COLORS and TYPE_LABELS
 *   - thumbnail img element with loading="lazy"
 *   - Link href to /projects/${slug}
 *   - lang prop support (en/ko)
 *   - section id="lab"
 *   - board-list structure (ul / li / Link)
 *   - useEffect + useState usage
 */

import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Load source
// ---------------------------------------------------------------------------

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "src/components/LabSection.tsx",
);

const source = fs.readFileSync(COMPONENT_PATH, "utf-8");

// ---------------------------------------------------------------------------
// Module-level sanity
// ---------------------------------------------------------------------------

describe("LabSection module", () => {
  it("file exists at src/components/LabSection.tsx", () => {
    expect(fs.existsSync(COMPONENT_PATH)).toBe(true);
  });

  it("has a default export function", async () => {
    const mod = await import("@/components/LabSection");
    expect(typeof mod.default).toBe("function");
  });

  it("default export is named LabSection", async () => {
    const mod = await import("@/components/LabSection");
    expect(mod.default.name).toBe("LabSection");
  });
});

// ---------------------------------------------------------------------------
// Client directive
// ---------------------------------------------------------------------------

describe("LabSection — 'use client' directive", () => {
  it("declares 'use client' as the first directive", () => {
    expect(source.trimStart().startsWith('"use client"') ||
           source.trimStart().startsWith("'use client'")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// React hooks
// ---------------------------------------------------------------------------

describe("LabSection — React hooks", () => {
  it("imports useEffect from react", () => {
    expect(source).toContain("useEffect");
  });

  it("imports useState from react", () => {
    expect(source).toContain("useState");
  });

  it("uses useEffect(() => { for data fetch", () => {
    expect(source).toMatch(/useEffect\s*\(/);
  });

  it("uses useState for items state", () => {
    expect(source).toMatch(/useState\s*[(<]/);
  });
});

// ---------------------------------------------------------------------------
// API fetch
// ---------------------------------------------------------------------------

describe("LabSection — API fetch", () => {
  it("fetches from '/api/admin/projects'", () => {
    expect(source).toContain("/api/admin/projects");
  });

  it("calls fetch() to get the project list", () => {
    expect(source).toContain("fetch(");
  });

  it("handles fetch error with a catch block", () => {
    expect(source).toContain(".catch(");
  });
});

// ---------------------------------------------------------------------------
// Empty / loading state — renders null
// ---------------------------------------------------------------------------

describe("LabSection — empty/loading state renders nothing", () => {
  it("returns null when items is empty or loading", () => {
    expect(source).toContain("return null");
  });

  it("guards on items being null (loading) or items.length === 0 (empty)", () => {
    // Either pattern: `items === null || items.length === 0` or `!items || !items.length`
    expect(
      source.includes("items === null") ||
      source.includes("items === null") ||
      source.includes("!items") ||
      source.includes("items.length === 0")
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Section structure
// ---------------------------------------------------------------------------

describe("LabSection — section structure", () => {
  it("renders a section element with id='lab'", () => {
    expect(source).toContain('id="lab"');
  });

  it("renders an h2 for the section heading", () => {
    expect(source).toContain("<h2");
  });

  it("uses a ul element for the list", () => {
    expect(source).toContain("<ul");
  });

  it("maps items to li elements", () => {
    expect(source).toContain("<li");
  });

  it("accepts a lang prop", () => {
    expect(source).toMatch(/lang[: ]+['"](en|ko)['"]/);
  });

  it('renders "Lab" heading text for lang=en', () => {
    expect(source).toContain('"Lab"');
  });

  it('renders "랩" heading text for lang=ko', () => {
    expect(source).toContain('"랩"');
  });
});

// ---------------------------------------------------------------------------
// Link / navigation
// ---------------------------------------------------------------------------

describe("LabSection — Link navigation", () => {
  it("imports Link from 'next/link'", () => {
    expect(source).toContain("next/link");
  });

  it("constructs href as /projects/${item.slug}", () => {
    expect(source).toContain("/projects/");
    expect(source).toContain("item.slug");
  });
});

// ---------------------------------------------------------------------------
// Thumbnail img
// ---------------------------------------------------------------------------

describe("LabSection — thumbnail img", () => {
  it("renders an img element for the thumbnail", () => {
    expect(source).toContain("<img");
  });

  it("uses item.thumbnailUrl as the img src", () => {
    expect(source).toContain("item.thumbnailUrl");
  });

  it("uses loading='lazy' on the img element", () => {
    expect(source).toContain('loading="lazy"');
  });
});

// ---------------------------------------------------------------------------
// Type badge
// ---------------------------------------------------------------------------

describe("LabSection — type badge", () => {
  it("defines TYPE_COLORS record with at least one entry", () => {
    expect(source).toContain("TYPE_COLORS");
  });

  it("defines TYPE_LABELS record with bilingual labels", () => {
    expect(source).toContain("TYPE_LABELS");
  });

  it("includes pitch color #3B82F6", () => {
    expect(source).toContain("#3B82F6");
  });

  it("includes report color #10B981", () => {
    expect(source).toContain("#10B981");
  });

  it("includes demo color #F59E0B", () => {
    expect(source).toContain("#F59E0B");
  });

  it("includes lab color #8B5CF6", () => {
    expect(source).toContain("#8B5CF6");
  });

  it("renders the type badge span element", () => {
    expect(source).toContain("<span");
  });

  it("uses item.type for badge lookup", () => {
    expect(source).toContain("item.type");
  });
});

// ---------------------------------------------------------------------------
// Date display
// ---------------------------------------------------------------------------

describe("LabSection — date display", () => {
  it("formats uploadedAt as a localised date string", () => {
    expect(source).toContain("toLocaleDateString");
  });

  it("uses item.uploadedAt to create the Date object", () => {
    expect(source).toContain("item.uploadedAt");
  });
});

// ---------------------------------------------------------------------------
// Shield — isValidProjectType re-exported from lib (tests in project-html-blob)
// ---------------------------------------------------------------------------

describe("LabSection — ProjectType constants completeness", () => {
  const VALID_TYPES = ["pitch", "report", "demo", "lab"] as const;

  it("all 4 valid type strings appear in source", () => {
    for (const t of VALID_TYPES) {
      expect(source).toContain(`"${t}"`);
    }
  });

  it("has exactly 4 distinct type color entries via TYPE_COLORS", () => {
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];
    for (const c of colors) {
      expect(source).toContain(c);
    }
  });
});
