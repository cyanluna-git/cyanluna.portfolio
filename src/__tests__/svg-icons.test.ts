/**
 * Shield · SVG Icon Verification Tests
 * Task #2568 — stroke SVG 방식으로 전환 (background rect removal)
 *
 * Verifies:
 * 1. No SVG file contains the old background <rect width="100" height="100"> element
 * 2. All icon.svg files are valid SVGs (have <svg> opening tag)
 * 3. All 14 expected icon files exist and are non-empty
 */

import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

const PROJECTS_DIR = path.resolve(process.cwd(), "public/projects");

const EXPECTED_ICON_PROJECTS = [
  "ai-cycling-coach",
  "assist-11th",
  "assist-hub",
  "code-review-suite",
  "cpet-platform",
  "equipment-gateway",
  "javis",
  "kanban-pipeline",
  "moru",
  "personal-finance",
  "resource-board",
  "ride-analytics",
  "smart-factory-qc",
  "today-bike",
];

describe("project icon SVGs (task #2568 stroke conversion)", () => {
  it("all 14 expected icon.svg files exist", () => {
    for (const project of EXPECTED_ICON_PROJECTS) {
      const iconPath = path.join(PROJECTS_DIR, project, "icon.svg");
      expect(fs.existsSync(iconPath), `${project}/icon.svg must exist`).toBe(true);
    }
  });

  it("no icon.svg contains a background rect (width=100 height=100)", () => {
    for (const project of EXPECTED_ICON_PROJECTS) {
      const iconPath = path.join(PROJECTS_DIR, project, "icon.svg");
      if (!fs.existsSync(iconPath)) continue;
      const content = fs.readFileSync(iconPath, "utf-8");
      const hasBackgroundRect =
        /rect[^>]*width=["']100["'][^>]*height=["']100["']/.test(content) ||
        /rect[^>]*height=["']100["'][^>]*width=["']100["']/.test(content);
      expect(
        hasBackgroundRect,
        `${project}/icon.svg must NOT contain background rect (width=100, height=100)`
      ).toBe(false);
    }
  });

  it("all icon.svg files are valid SVGs (contain <svg tag)", () => {
    for (const project of EXPECTED_ICON_PROJECTS) {
      const iconPath = path.join(PROJECTS_DIR, project, "icon.svg");
      if (!fs.existsSync(iconPath)) continue;
      const content = fs.readFileSync(iconPath, "utf-8");
      expect(content, `${project}/icon.svg must contain <svg opening tag`).toMatch(/<svg/);
    }
  });

  it("all icon.svg files are non-empty (at least 50 bytes)", () => {
    for (const project of EXPECTED_ICON_PROJECTS) {
      const iconPath = path.join(PROJECTS_DIR, project, "icon.svg");
      if (!fs.existsSync(iconPath)) continue;
      const content = fs.readFileSync(iconPath, "utf-8");
      expect(
        content.length,
        `${project}/icon.svg must have content (>= 50 bytes)`
      ).toBeGreaterThanOrEqual(50);
    }
  });

  it("no icon.svg has a solid fill on root <svg> element", () => {
    for (const project of EXPECTED_ICON_PROJECTS) {
      const iconPath = path.join(PROJECTS_DIR, project, "icon.svg");
      if (!fs.existsSync(iconPath)) continue;
      const content = fs.readFileSync(iconPath, "utf-8");
      // The root <svg ...> tag should not have fill="..." (background color)
      // Extract only the opening <svg ...> tag
      const svgTagMatch = content.match(/<svg[^>]*>/);
      if (!svgTagMatch) continue;
      const svgTag = svgTagMatch[0];
      // A solid background is usually fill="#RRGGBB" or fill="rgb(...)"
      const hasSolidFill = /fill=["']#[0-9a-fA-F]{3,6}["']/.test(svgTag) ||
                           /fill=["']rgb/.test(svgTag);
      expect(
        hasSolidFill,
        `${project}/icon.svg root <svg> must not carry a solid fill color (use mask-image tinting instead)`
      ).toBe(false);
    }
  });
});
