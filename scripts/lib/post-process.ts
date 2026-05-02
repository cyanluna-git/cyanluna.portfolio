/**
 * Post-processing utilities for captured HTML snapshots.
 *
 * Transforms raw Playwright HTML captures into clean, portable, bilingual
 * snapshots that work inside sandbox="allow-scripts" iframes without React.
 */
import type { Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// 1. Strip /_next/ asset tags (script src + link href)
//    Also strips inline __next_f RSC payload scripts (they reference removed
//    chunks and produce errors in static context).
// ---------------------------------------------------------------------------

export function stripNextAssets(html: string): string {
  // Remove <script src="/_next/...">...</script> (external + self-closing)
  let result = html.replace(
    /<script\b[^>]*\bsrc="\/(_next\/[^"]*)"[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );

  // Remove <script ...async=""> patterns where src starts with /_next/
  result = result.replace(
    /<script\b[^>]*\bsrc="\/(_next\/[^"]*)"[^>]*\/>/gi,
    "",
  );

  // Remove <link href="/_next/..."> tags
  result = result.replace(/<link\b[^>]*\bhref="\/(_next\/[^"]*)"[^>]*\/?>/gi, "");

  // Remove <link rel="preload" href="/_next/..."> (covers fetchpriority etc.)
  // Already covered above, but keep explicit for preload-as-script variants
  result = result.replace(
    /<link\b[^>]*\bhref="\/(_next\/[^"]*)"[^>]*>/gi,
    "",
  );

  // Remove inline __next_f RSC payload scripts:
  // <script>self.__next_f.push([...])</script> or (self.__next_f=...)
  result = result.replace(
    /<script\b[^>]*>\s*(?:self\.__next_f|__next_f|\(self\.__next_f)[\s\S]*?<\/script>/gi,
    "",
  );

  return result;
}

// ---------------------------------------------------------------------------
// 2. Rewrite content-relative URLs → absolute (href + src attributes)
//    Excludes: data:, blob:, //, #-only anchors
// ---------------------------------------------------------------------------

export function rewriteUrls(html: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");

  // Match href="/..." and src="/..." where the path starts with /
  // but is NOT //, data:, blob:, or #-only
  return html.replace(
    /((?:href|src)=")(\/)([^"]*")/g,
    (match, prefix, slash, rest) => {
      const path = slash + rest.slice(0, rest.length - 1); // restore leading /
      // Skip: // (protocol-relative), data:, blob: — these won't start with / in this branch anyway
      // but double-check: if the original was src="//..." the first char after / would be /
      if (path.startsWith("//")) return match;
      return `${prefix}${base}${path}"`;
    },
  );
}

// ---------------------------------------------------------------------------
// 3. Add target=_blank rel=noopener to external (non-site) links
//    Must run AFTER rewriteUrls so freshly-rewritten cyanluna.com links
//    are correctly excluded.
// ---------------------------------------------------------------------------

export function markExternalLinks(html: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");

  // Match <a ...href="https?://..."> that are NOT on siteUrl
  return html.replace(/<a\b([^>]*\bhref="(https?:\/\/[^"]+)"[^>]*)>/gi, (match, attrs, url) => {
    // Skip same-site links
    if (url.startsWith(base)) return match;

    // Already has target= ? skip (don't double-add)
    if (/\btarget=/i.test(attrs)) return match;

    return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
  });
}

// ---------------------------------------------------------------------------
// 4. Merge EN and KO HTML via Playwright's browser-side DOMParser
//    Replaces differing text nodes with bilingual <span data-lang> pairs.
// ---------------------------------------------------------------------------

// Tags where we must not recurse (their text content is not user-visible copy)
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "SVG"]);

export async function mergeLanguages(
  page: Page,
  enHtml: string,
  koHtml: string,
): Promise<string> {
  await page.setContent(enHtml, { waitUntil: "domcontentloaded" });

  await page.evaluate((koHtml: string) => {
    const koDoc = new DOMParser().parseFromString(koHtml, "text/html");

    const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "SVG"]);

    function mergeNode(enNode: Node, koNode: Node): void {
      // Text node diff → wrap with bilingual spans
      if (
        enNode.nodeType === Node.TEXT_NODE &&
        koNode.nodeType === Node.TEXT_NODE
      ) {
        const enText = enNode.textContent?.trim() ?? "";
        const koText = koNode.textContent?.trim() ?? "";
        if (enText && koText && enText !== koText) {
          const parent = enNode.parentNode;
          if (!parent) return;

          const enSpan = document.createElement("span");
          enSpan.dataset.lang = "en";
          enSpan.textContent = enNode.textContent;

          const koSpan = document.createElement("span");
          koSpan.dataset.lang = "ko";
          koSpan.hidden = true;
          koSpan.textContent = koNode.textContent;

          parent.replaceChild(enSpan, enNode);
          enSpan.insertAdjacentElement("afterend", koSpan);
        }
        return;
      }

      // Element node → recurse into children (skip certain tag types)
      if (
        enNode.nodeType === Node.ELEMENT_NODE &&
        koNode.nodeType === Node.ELEMENT_NODE
      ) {
        const enEl = enNode as Element;
        if (SKIP.has(enEl.tagName)) return;

        const enChildren = Array.from(enNode.childNodes);
        const koChildren = Array.from(koNode.childNodes);
        const len = Math.min(enChildren.length, koChildren.length);
        for (let i = 0; i < len; i++) {
          mergeNode(enChildren[i], koChildren[i]);
        }
      }
    }

    mergeNode(document.body, koDoc.body);
  }, koHtml);

  return page.content();
}

// ---------------------------------------------------------------------------
// 5. Inline all resolved stylesheets and lock dark-theme state
//    Serializes document.styleSheets in-browser, injects them as a single
//    <style id="inline-css"> block, removes <link rel="stylesheet"> tags,
//    and sets data-theme="dark" on <html> to lock the dark theme.
// ---------------------------------------------------------------------------

export async function inlineCss(page: Page): Promise<void> {
  await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    const cssText = sheets
      .flatMap((sheet) => {
        try {
          return Array.from(sheet.cssRules);
        } catch {
          return []; // SecurityError for cross-origin sheets
        }
      })
      .filter((rule) => {
        // Remove @font-face rules
        if (rule.type === CSSRule.FONT_FACE_RULE) return false;
        // Remove rules referencing /_next/static/media/ (font files)
        if (rule.cssText.includes("/_next/static/media/")) return false;
        return true;
      })
      .map((rule) => rule.cssText)
      .join("\n");

    // Inject inline style block
    const style = document.createElement("style");
    style.id = "inline-css";
    style.textContent = cssText;
    document.head.appendChild(style);

    // Remove all external stylesheet link tags
    document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

    // Lock dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  });
}

// ---------------------------------------------------------------------------
// 6. Inject inline lang-toggle JS before </body>
// ---------------------------------------------------------------------------

const LANG_TOGGLE_SCRIPT = `
<script>
(function () {
  'use strict';
  var currentLang = 'en';

  function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== lang;
    });
    var btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.textContent = lang === 'en' ? 'KO' : 'EN';
  }

  // Initialize: show EN, hide KO
  document.addEventListener('DOMContentLoaded', function () {
    setLang('en');
  });

  // Also run immediately in case DOM is already ready
  if (document.readyState !== 'loading') {
    setLang('en');
  }

  // Find existing toggle or create floating button
  function attachToggle() {
    var btn = document.querySelector('[data-lang-toggle]');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'lang-toggle-btn';
      btn.textContent = 'KO';
      btn.style.cssText =
        'position:fixed;top:16px;right:16px;z-index:9999;padding:4px 10px;' +
        'background:#1a1a1a;color:#fff;border:1px solid #444;border-radius:4px;' +
        'cursor:pointer;font-size:12px;font-family:inherit;';
      document.body.appendChild(btn);
    }
    btn.addEventListener('click', function () {
      setLang(currentLang === 'en' ? 'ko' : 'en');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToggle);
  } else {
    attachToggle();
  }
})();
</script>
`;

export function injectLangToggle(html: string): string {
  // Insert the script block just before </body>
  if (html.includes("</body>")) {
    return html.replace("</body>", `${LANG_TOGGLE_SCRIPT}\n</body>`);
  }
  // Fallback: append at end
  return html + LANG_TOGGLE_SCRIPT;
}
