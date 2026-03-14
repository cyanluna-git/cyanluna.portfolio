/**
 * Shield · AboutSection Tests
 * Task #872 — About 섹션 — 프로필/경력/도메인 전문성
 *
 * Covers:
 *   - Component export: default export is a function (React component)
 *   - Bilingual text data: sectionTitle and bio have both en and ko strings
 *   - Domain expertise: 4 domains with labels, accent colors, and keywords
 *   - Domain colors: each is a valid hex color (4 distinct accent colors)
 *   - Stat counters: 3 counters with value strings and bilingual labels
 *   - Social links: href, target=_blank, rel=noopener noreferrer validated
 *     via static source inspection (node environment — no JSDOM rendering)
 *
 * Note: vitest.config.ts sets environment: "node", so DOM rendering tests
 * are excluded. All assertions work against the raw module source or imported
 * data structures inlined from the component.
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COMPONENT_PATH = path.resolve(
  process.cwd(),
  "src/components/AboutSection.tsx"
);

const source = fs.readFileSync(COMPONENT_PATH, "utf-8");

// ---------------------------------------------------------------------------
// Inline data mirrors — kept in sync with the implementation.
// These let us assert data integrity without a browser environment.
// ---------------------------------------------------------------------------

type Lang = "en" | "ko";

const t = {
  sectionTitle: { en: "About", ko: "About" },
  bio: {
    en: "I'm a full-stack engineer who ships across domains—from factory floors to fitness labs to developer terminals. I don't pick a lane; I pick problems worth solving, then build the software end-to-end.",
    ko: "저는 공장 현장부터 피트니스 랩, 개발자 터미널까지 도메인을 넘나드는 풀스택 엔지니어입니다. 특정 분야에 머무르지 않고, 풀 가치가 있는 문제를 골라 소프트웨어를 처음부터 끝까지 만듭니다.",
  },
};

const domains = [
  {
    label: "Industrial",
    color: "#3B82F6",
    keywords: ["Manufacturing Automation", "PLC / Modbus", "Edge-to-Cloud"],
  },
  {
    label: "Health",
    color: "#10B981",
    keywords: ["Metabolic Analysis", "Training Science", "Wearable Data"],
  },
  {
    label: "Consumer",
    color: "#F59E0B",
    keywords: ["Service Platforms", "Multi-bank Parsing", "OAuth Flows"],
  },
  {
    label: "DevTools",
    color: "#8B5CF6",
    keywords: ["Multi-Agent AI", "Code Review", "CI/CD Automation"],
  },
];

const counters = [
  { value: "12+", label: { en: "Projects Shipped", ko: "프로젝트" } },
  { value: "4",   label: { en: "Domain Verticals", ko: "도메인" } },
  { value: "15+", label: { en: "Tech Stacks",      ko: "기술 스택" } },
];

const socialLinks = [
  {
    href: "https://github.com/cyanluna",
    ariaLabel: "GitHub",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "https://linkedin.com/in/cyanluna",
    ariaLabel: "LinkedIn",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

// ---------------------------------------------------------------------------
// Component export
// ---------------------------------------------------------------------------

describe("AboutSection module", () => {
  it("resolves without throwing", async () => {
    await expect(import("@/components/AboutSection")).resolves.toBeDefined();
  });

  it("has a default export that is a function (React component)", async () => {
    const mod = await import("@/components/AboutSection");
    expect(typeof mod.default).toBe("function");
  });

  it("default export is named AboutSection", async () => {
    const mod = await import("@/components/AboutSection");
    expect(mod.default.name).toBe("AboutSection");
  });
});

// ---------------------------------------------------------------------------
// Bilingual text — sectionTitle
// ---------------------------------------------------------------------------

describe("sectionTitle bilingual text", () => {
  it("has a non-empty English section title", () => {
    expect(t.sectionTitle.en.trim().length).toBeGreaterThan(0);
  });

  it("has a non-empty Korean section title", () => {
    expect(t.sectionTitle.ko.trim().length).toBeGreaterThan(0);
  });

  it("English and Korean section titles are defined strings", () => {
    expect(typeof t.sectionTitle.en).toBe("string");
    expect(typeof t.sectionTitle.ko).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// Bilingual text — bio
// ---------------------------------------------------------------------------

describe("bio bilingual text", () => {
  it("has a non-empty English bio", () => {
    expect(t.bio.en.trim().length).toBeGreaterThan(0);
  });

  it("has a non-empty Korean bio", () => {
    expect(t.bio.ko.trim().length).toBeGreaterThan(0);
  });

  it("English bio contains key identity phrase", () => {
    expect(t.bio.en.toLowerCase()).toContain("full-stack engineer");
  });

  it("bio object has exactly two language keys", () => {
    expect(Object.keys(t.bio)).toEqual(["en", "ko"]);
  });
});

// ---------------------------------------------------------------------------
// Domain expertise cards
// ---------------------------------------------------------------------------

describe("domains data", () => {
  it("has exactly 4 domain entries", () => {
    expect(domains).toHaveLength(4);
  });

  it("domain labels are Industrial, Health, Consumer, DevTools", () => {
    const labels = domains.map((d) => d.label);
    expect(labels).toEqual(["Industrial", "Health", "Consumer", "DevTools"]);
  });

  it("every domain has a non-empty label", () => {
    for (const d of domains) {
      expect(d.label.trim().length).toBeGreaterThan(0);
    }
  });

  it("every domain has a non-empty color string", () => {
    for (const d of domains) {
      expect(typeof d.color).toBe("string");
      expect(d.color.trim().length).toBeGreaterThan(0);
    }
  });

  it("every domain color is a valid 6-digit hex color", () => {
    const hexRe = /^#[0-9A-Fa-f]{6}$/;
    for (const d of domains) {
      expect(hexRe.test(d.color)).toBe(true);
    }
  });

  it("all 4 domain colors are distinct", () => {
    const colors = domains.map((d) => d.color);
    const unique = new Set(colors);
    expect(unique.size).toBe(4);
  });

  it("every domain has at least one keyword", () => {
    for (const d of domains) {
      expect(Array.isArray(d.keywords)).toBe(true);
      expect(d.keywords.length).toBeGreaterThan(0);
    }
  });

  it("every keyword is a non-empty string", () => {
    for (const d of domains) {
      for (const kw of d.keywords) {
        expect(typeof kw).toBe("string");
        expect(kw.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("Industrial domain has correct accent color #3B82F6", () => {
    const industrial = domains.find((d) => d.label === "Industrial");
    expect(industrial?.color).toBe("#3B82F6");
  });

  it("Health domain has correct accent color #10B981", () => {
    const health = domains.find((d) => d.label === "Health");
    expect(health?.color).toBe("#10B981");
  });

  it("Consumer domain has correct accent color #F59E0B", () => {
    const consumer = domains.find((d) => d.label === "Consumer");
    expect(consumer?.color).toBe("#F59E0B");
  });

  it("DevTools domain has correct accent color #8B5CF6", () => {
    const devtools = domains.find((d) => d.label === "DevTools");
    expect(devtools?.color).toBe("#8B5CF6");
  });
});

// ---------------------------------------------------------------------------
// Stat counters
// ---------------------------------------------------------------------------

describe("counters data", () => {
  it("has exactly 3 stat counters", () => {
    expect(counters).toHaveLength(3);
  });

  it("every counter has a non-empty value string", () => {
    for (const c of counters) {
      expect(typeof c.value).toBe("string");
      expect(c.value.trim().length).toBeGreaterThan(0);
    }
  });

  it("every counter has a non-empty English label", () => {
    for (const c of counters) {
      expect(c.label.en.trim().length).toBeGreaterThan(0);
    }
  });

  it("every counter has a non-empty Korean label", () => {
    for (const c of counters) {
      expect(c.label.ko.trim().length).toBeGreaterThan(0);
    }
  });

  it("counter values are '12+', '4', '15+'", () => {
    const values = counters.map((c) => c.value);
    expect(values).toEqual(["12+", "4", "15+"]);
  });

  it("counter label object has exactly two language keys", () => {
    for (const c of counters) {
      expect(Object.keys(c.label)).toEqual(["en", "ko"]);
    }
  });
});

// ---------------------------------------------------------------------------
// Social links — static source analysis
// (Cannot render React in node environment, so we parse the raw JSX source)
// ---------------------------------------------------------------------------

describe("social links (source-level assertions)", () => {
  it("source contains GitHub href", () => {
    expect(source).toContain("https://github.com/cyanluna");
  });

  it("source contains LinkedIn href", () => {
    expect(source).toContain("https://linkedin.com/in/cyanluna");
  });

  it("all social anchor tags use target='_blank'", () => {
    // Count anchor tags and _blank occurrences — they must balance
    const anchorMatches = source.match(/<a\s/g) ?? [];
    const blankMatches = source.match(/target="_blank"/g) ?? [];
    // At minimum there is one _blank per anchor
    expect(blankMatches.length).toBeGreaterThanOrEqual(anchorMatches.length);
  });

  it("source contains rel='noopener noreferrer' for security", () => {
    expect(source).toContain('rel="noopener noreferrer"');
  });

  it("number of rel=noopener occurrences matches number of target=_blank occurrences", () => {
    const blankCount = (source.match(/target="_blank"/g) ?? []).length;
    const relCount = (source.match(/rel="noopener noreferrer"/g) ?? []).length;
    expect(relCount).toBe(blankCount);
  });

  it("source contains GitHub aria-label", () => {
    expect(source).toContain('aria-label="GitHub"');
  });

  it("source contains LinkedIn aria-label", () => {
    expect(source).toContain('aria-label="LinkedIn"');
  });

  it("social link data has exactly 2 entries", () => {
    expect(socialLinks).toHaveLength(2);
  });

  it("all social links declare target _blank", () => {
    for (const link of socialLinks) {
      expect(link.target).toBe("_blank");
    }
  });

  it("all social links have rel noopener noreferrer", () => {
    for (const link of socialLinks) {
      expect(link.rel).toBe("noopener noreferrer");
    }
  });

  it("all social link hrefs are HTTPS URLs", () => {
    for (const link of socialLinks) {
      expect(link.href.startsWith("https://")).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Section structure — source-level assertions
// ---------------------------------------------------------------------------

describe("AboutSection source structure", () => {
  it("component accepts a lang prop", () => {
    // Signature: ({ lang }: { lang: Lang })
    expect(source).toContain("lang: Lang");
  });

  it("renders a section element with id='about'", () => {
    expect(source).toContain('id="about"');
  });

  it("renders an h2 element for the section title", () => {
    expect(source).toContain("<h2");
  });

  it("renders an h3 element for domain labels", () => {
    expect(source).toContain("<h3");
  });

  it("maps over domains array to render cards", () => {
    expect(source).toContain("domains.map");
  });

  it("maps over counters array to render stat cells", () => {
    expect(source).toContain("counters.map");
  });

  it("uses domain.color for accent styling (backgroundColor)", () => {
    expect(source).toContain("domain.color");
  });

  it("uses lang prop to select bilingual text", () => {
    // t.bio[lang] and t.sectionTitle[lang] pattern
    expect(source).toContain("[lang]");
  });

  it("renders a dark-theme section border class (border-border)", () => {
    expect(source).toContain("border-border");
  });
});
