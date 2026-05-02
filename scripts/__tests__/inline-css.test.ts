/**
 * Static analysis tests for the inlineCss function.
 *
 * Verifies that inlineCss is exported from post-process.ts and that
 * generate-project-html.ts imports and calls it correctly — no browser
 * needed for these structural checks.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, beforeAll } from "vitest";

const POST_PROCESS_PATH = path.resolve(
  process.cwd(),
  "scripts/lib/post-process.ts",
);
const GENERATE_PATH = path.resolve(
  process.cwd(),
  "scripts/generate-project-html.ts",
);

let postProcessContent: string;
let generateContent: string;

beforeAll(() => {
  postProcessContent = fs.readFileSync(POST_PROCESS_PATH, "utf8");
  generateContent = fs.readFileSync(GENERATE_PATH, "utf8");
});

// ---------------------------------------------------------------------------
// post-process.ts — inlineCss export
// ---------------------------------------------------------------------------

describe("post-process.ts — inlineCss export", () => {
  it("file exists", () => {
    expect(fs.existsSync(POST_PROCESS_PATH)).toBe(true);
  });

  it("exports inlineCss function", () => {
    expect(postProcessContent).toContain("export async function inlineCss(");
  });

  it("inlineCss accepts a Page parameter", () => {
    expect(postProcessContent).toContain("inlineCss(page: Page)");
  });

  it("inlineCss returns Promise<void>", () => {
    expect(postProcessContent).toContain("Promise<void>");
  });

  it("uses page.evaluate() (no external libs)", () => {
    expect(postProcessContent).toContain("page.evaluate(");
  });

  it("iterates document.styleSheets", () => {
    expect(postProcessContent).toContain("document.styleSheets");
  });

  it("filters @font-face rules via CSSRule.FONT_FACE_RULE", () => {
    expect(postProcessContent).toContain("CSSRule.FONT_FACE_RULE");
  });

  it("filters rules referencing /_next/static/media/", () => {
    expect(postProcessContent).toContain("/_next/static/media/");
  });

  it("injects <style id='inline-css'> element", () => {
    expect(postProcessContent).toContain('style.id = "inline-css"');
  });

  it("appends style to document.head", () => {
    expect(postProcessContent).toContain("document.head.appendChild(style)");
  });

  it("removes link[rel='stylesheet'] elements", () => {
    expect(postProcessContent).toContain('link[rel="stylesheet"]');
    expect(postProcessContent).toContain(".forEach((el) => el.remove())");
  });

  it("sets data-theme='dark' on documentElement", () => {
    expect(postProcessContent).toContain(
      'document.documentElement.setAttribute("data-theme", "dark")',
    );
  });

  it("catches SecurityError for cross-origin sheets", () => {
    expect(postProcessContent).toContain("} catch {");
    expect(postProcessContent).toContain("return [];");
  });
});

// ---------------------------------------------------------------------------
// generate-project-html.ts — imports and calls inlineCss
// ---------------------------------------------------------------------------

describe("generate-project-html.ts — inlineCss integration", () => {
  it("file exists", () => {
    expect(fs.existsSync(GENERATE_PATH)).toBe(true);
  });

  it("imports inlineCss from ./lib/post-process.js", () => {
    expect(generateContent).toContain("inlineCss");
    expect(generateContent).toContain('"./lib/post-process.js"');
  });

  it("calls await inlineCss( somewhere in the script", () => {
    expect(generateContent).toContain("await inlineCss(");
  });

  it("calls inlineCss before enPage.content()", () => {
    const inlineCssIdx = generateContent.indexOf("await inlineCss(enPage)");
    const enContentIdx = generateContent.indexOf("await enPage.content()");
    expect(inlineCssIdx).toBeGreaterThan(-1);
    expect(enContentIdx).toBeGreaterThan(-1);
    expect(inlineCssIdx).toBeLessThan(enContentIdx);
  });

  it("calls inlineCss before koPage.content()", () => {
    const inlineCssIdx = generateContent.indexOf("await inlineCss(koPage)");
    const koContentIdx = generateContent.indexOf("await koPage.content()");
    expect(inlineCssIdx).toBeGreaterThan(-1);
    expect(koContentIdx).toBeGreaterThan(-1);
    expect(inlineCssIdx).toBeLessThan(koContentIdx);
  });

  it("calls inlineCss twice (once for EN, once for KO)", () => {
    const matches = generateContent.match(/await inlineCss\(/g) ?? [];
    expect(matches.length).toBe(2);
  });
});
