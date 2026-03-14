/**
 * Shield · Barrel Export Tests
 * Task #878 — Dynamic routes + shared layout components
 *
 * Verifies that src/components/project/index.ts exports all expected
 * component names, and that each exported value is a function (React
 * component). Uses dynamic import so this works in a Node/Vitest environment.
 */

import { describe, it, expect } from "vitest";

const EXPECTED_EXPORTS = [
  "BrowserFrame",
  "ProjectHero",
  "ProblemSection",
  "ApproachSection",
  "FeatureShowcase",
  "ArchSection",
  "ResultsSection",
  "ProjectNav",
] as const;

describe("src/components/project/index.ts barrel export", () => {
  it("module resolves without throwing", async () => {
    await expect(import("@/components/project")).resolves.toBeDefined();
  });

  it("exports exactly the expected component names", async () => {
    const barrel = await import("@/components/project");
    const exportedKeys = Object.keys(barrel);
    for (const name of EXPECTED_EXPORTS) {
      expect(exportedKeys).toContain(name);
    }
  });

  it("each exported component is a function", async () => {
    const barrel = await import("@/components/project");
    for (const name of EXPECTED_EXPORTS) {
      const value = (barrel as Record<string, unknown>)[name];
      expect(typeof value).toBe("function");
    }
  });

  it("does not export any unexpected names beyond the 8 components", async () => {
    const barrel = await import("@/components/project");
    const exportedKeys = Object.keys(barrel);
    // Every exported key must be in the expected list
    for (const key of exportedKeys) {
      expect(EXPECTED_EXPORTS as readonly string[]).toContain(key);
    }
  });
});
