/**
 * Unit tests for scripts/lib/post-process.ts.
 *
 * Covers: stripNextAssets, rewriteUrls, markExternalLinks, injectLangToggle.
 * mergeLanguages is async Playwright — skipped here (integration-only).
 */
import { describe, it, expect } from "vitest";
import {
  stripNextAssets,
  rewriteUrls,
  markExternalLinks,
  injectLangToggle,
} from "../lib/post-process.js";

// ---------------------------------------------------------------------------
// stripNextAssets
// ---------------------------------------------------------------------------

describe("stripNextAssets", () => {
  it("removes <script src='/_next/...'> tags", () => {
    const html = `<html><head>
      <script src="/_next/static/chunks/main.js"></script>
    </head><body></body></html>`;
    const result = stripNextAssets(html);
    expect(result).not.toContain("/_next/static/chunks/main.js");
    expect(result).not.toContain("<script src");
  });

  it("removes self-closing <script src='/_next/...' /> style tags", () => {
    const html = `<head><script src="/_next/static/chunks/polyfills.js" async=""/></head>`;
    const result = stripNextAssets(html);
    expect(result).not.toContain("/_next/");
  });

  it("removes <link href='/_next/...'> tags", () => {
    const html = `<head>
      <link rel="stylesheet" href="/_next/static/css/app.css"/>
      <link rel="preload" href="/_next/static/chunks/main.js" as="script" fetchpriority="high"/>
    </head>`;
    const result = stripNextAssets(html);
    expect(result).not.toContain("/_next/");
    expect(result).not.toContain("<link");
  });

  it("removes __next_f RSC payload inline scripts", () => {
    const html = `<body>
      <script>self.__next_f.push([1,"route payload"])</script>
      <script>(self.__next_f=self.__next_f||[]).push([0])</script>
      <script>__next_f.push([2,"chunk"])</script>
    </body>`;
    const result = stripNextAssets(html);
    expect(result).not.toContain("__next_f");
  });

  it("preserves inline scripts that are not /_next/ or __next_f", () => {
    const html = `<body>
      <script>window.foo = 1;</script>
      <script>var analytics = { id: "GA-123" };</script>
    </body>`;
    const result = stripNextAssets(html);
    expect(result).toContain("window.foo = 1;");
    expect(result).toContain('var analytics = { id: "GA-123" };');
  });

  it("preserves <script src> pointing to non-next paths", () => {
    const html = `<head><script src="/api/data.js"></script></head>`;
    const result = stripNextAssets(html);
    expect(result).toContain("/api/data.js");
  });

  it("removes multiple /_next/ script tags in one pass", () => {
    const html = `<head>
      <script src="/_next/static/chunks/webpack.js"></script>
      <script src="/_next/static/chunks/framework.js"></script>
      <link href="/_next/static/css/styles.css"/>
    </head>`;
    const result = stripNextAssets(html);
    expect(result).not.toContain("/_next/");
  });

  it("returns unmodified HTML when no /_next/ references exist", () => {
    const html = `<html><head></head><body><p>Hello</p></body></html>`;
    expect(stripNextAssets(html)).toBe(html);
  });
});

// ---------------------------------------------------------------------------
// rewriteUrls
// ---------------------------------------------------------------------------

describe("rewriteUrls", () => {
  const SITE = "https://cyanluna.com";

  it("rewrites href='/path' to absolute URL", () => {
    const html = `<a href="/about">About</a>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('href="https://cyanluna.com/about"');
  });

  it("rewrites src='/path' to absolute URL", () => {
    const html = `<img src="/images/logo.png"/>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('src="https://cyanluna.com/images/logo.png"');
  });

  it("strips trailing slash from siteUrl before prepending", () => {
    const html = `<a href="/projects">Projects</a>`;
    const result = rewriteUrls(html, "https://cyanluna.com/");
    // should not produce double slash like https://cyanluna.com//projects
    expect(result).toContain('href="https://cyanluna.com/projects"');
    expect(result).not.toContain("//projects");
  });

  it("does NOT rewrite protocol-relative //cdn.com/x URLs", () => {
    const html = `<script src="//cdn.jsdelivr.net/lib.js"></script>`;
    const result = rewriteUrls(html, SITE);
    // the regex only matches src="/" followed by a non-slash char,
    // so //cdn.jsdelivr.net should remain untouched
    expect(result).toContain('src="//cdn.jsdelivr.net/lib.js"');
  });

  it("does NOT rewrite data: URIs", () => {
    // data: URIs don't start with / so the regex won't match them
    const html = `<img src="data:image/png;base64,abc123"/>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('src="data:image/png;base64,abc123"');
  });

  it("does NOT rewrite blob: URIs", () => {
    const html = `<video src="blob:https://example.com/id"></video>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('src="blob:https://example.com/id"');
  });

  it("does NOT rewrite already-absolute https:// URLs", () => {
    const html = `<a href="https://github.com/user/repo">GitHub</a>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('href="https://github.com/user/repo"');
    // should not become https://cyanluna.comhttps://github.com/...
    expect(result).not.toContain("cyanluna.comhttps://");
  });

  it("rewrites multiple occurrences in one call", () => {
    const html = `<a href="/about"><img src="/logo.svg"/></a>`;
    const result = rewriteUrls(html, SITE);
    expect(result).toContain('href="https://cyanluna.com/about"');
    expect(result).toContain('src="https://cyanluna.com/logo.svg"');
  });
});

// ---------------------------------------------------------------------------
// markExternalLinks
// ---------------------------------------------------------------------------

describe("markExternalLinks", () => {
  const SITE = "https://cyanluna.com";

  it("adds target=_blank and rel=noopener to external links", () => {
    const html = `<a href="https://github.com/user/repo">GitHub</a>`;
    const result = markExternalLinks(html, SITE);
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("does NOT add target=_blank to same-site links", () => {
    const html = `<a href="https://cyanluna.com/about">About</a>`;
    const result = markExternalLinks(html, SITE);
    expect(result).not.toContain("target=");
  });

  it("does NOT add target=_blank to already-decorated links", () => {
    const html = `<a href="https://github.com" target="_self">GitHub</a>`;
    const result = markExternalLinks(html, SITE);
    // should not add another target
    const targetCount = (result.match(/target=/g) ?? []).length;
    expect(targetCount).toBe(1);
  });

  it("handles links that already have rel attribute", () => {
    const html = `<a rel="nofollow" href="https://external.com">Ext</a>`;
    const result = markExternalLinks(html, SITE);
    expect(result).toContain('target="_blank"');
  });

  it("does NOT touch relative href links (not http/https)", () => {
    // The regex only matches href="https?://..." so relative paths are untouched
    const html = `<a href="/projects">Projects</a>`;
    const result = markExternalLinks(html, SITE);
    expect(result).not.toContain("target=");
  });

  it("does NOT touch mailto: links", () => {
    const html = `<a href="mailto:hello@cyanluna.com">Email</a>`;
    const result = markExternalLinks(html, SITE);
    expect(result).not.toContain("target=");
  });

  it("handles multiple links mixed internal and external", () => {
    const html = `
      <a href="https://cyanluna.com/projects">Portfolio</a>
      <a href="https://github.com/user">GitHub</a>
      <a href="https://linkedin.com/in/user">LinkedIn</a>
    `;
    const result = markExternalLinks(html, SITE);
    // Internal link unchanged
    expect(result).toContain('href="https://cyanluna.com/projects">Portfolio</a>');
    // External links decorated
    const targetCount = (result.match(/target="_blank"/g) ?? []).length;
    expect(targetCount).toBe(2);
  });

  it("strips trailing slash from siteUrl for comparison", () => {
    const html = `<a href="https://cyanluna.com/about">About</a>`;
    // Pass siteUrl with trailing slash — should still recognize as same-site
    const result = markExternalLinks(html, "https://cyanluna.com/");
    expect(result).not.toContain("target=");
  });
});

// ---------------------------------------------------------------------------
// injectLangToggle
// ---------------------------------------------------------------------------

describe("injectLangToggle", () => {
  it("injects <script> block before </body>", () => {
    const html = `<html><body><p>Hello</p></body></html>`;
    const result = injectLangToggle(html);
    const scriptIdx = result.indexOf("<script>");
    const bodyCloseIdx = result.indexOf("</body>");
    expect(scriptIdx).toBeGreaterThan(-1);
    expect(bodyCloseIdx).toBeGreaterThan(-1);
    // Script must appear before </body>
    expect(scriptIdx).toBeLessThan(bodyCloseIdx);
  });

  it("injects lang-toggle button creation code", () => {
    const html = `<html><body></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("lang-toggle-btn");
  });

  it("injects data-lang querying code", () => {
    const html = `<html><body></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("[data-lang]");
  });

  it("injects setLang function that toggles en/ko", () => {
    const html = `<html><body></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("setLang");
    expect(result).toContain("'en'");
    expect(result).toContain("'ko'");
  });

  it("injects DOMContentLoaded listener for initialization", () => {
    const html = `<html><body></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("DOMContentLoaded");
  });

  it("falls back to appending when </body> is absent", () => {
    const html = `<html><p>Fragment without body tag</p>`;
    const result = injectLangToggle(html);
    expect(result).toContain("<script>");
    expect(result).toContain("lang-toggle-btn");
    // Script should be at the end (appended)
    const scriptIdx = result.lastIndexOf("<script>");
    expect(scriptIdx).toBeGreaterThan(html.length - 1);
  });

  it("preserves existing content when injecting", () => {
    const html = `<html><body><h1>My Portfolio</h1></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("<h1>My Portfolio</h1>");
    expect(result).toContain("<script>");
  });

  it("injects data-lang-toggle hook check for existing toggle button", () => {
    const html = `<html><body></body></html>`;
    const result = injectLangToggle(html);
    expect(result).toContain("data-lang-toggle");
  });
});
