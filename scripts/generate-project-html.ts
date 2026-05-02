/**
 * Generates a full bilingual HTML snapshot of a portfolio project page.
 *
 * Captures EN and KO variants via Playwright, merges them with bilingual
 * <span data-lang> wrappers, strips /_next/ assets, absolutizes URLs, and
 * injects an inline lang-toggle script. Result works in sandbox iframes
 * without React.
 *
 * Usage: pnpm generate:project-html
 *
 * Requires the dev server to be running at BASE_URL (pnpm dev).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  ensureDir,
} from "./capture/helpers.js";
import {
  stripNextAssets,
  rewriteUrls,
  markExternalLinks,
  mergeLanguages,
  injectLangToggle,
} from "./lib/post-process.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "http://localhost:3000";
const SITE_URL = "https://cyanluna.com";
const PROJECT_SLUG = "ai-cycling-coach";
const OUTPUT_DIR = path.resolve(__dirname, "output");

async function main(): Promise<void> {
  const outPath = path.join(OUTPUT_DIR, `${PROJECT_SLUG}.html`);
  const enUrl = `${BASE_URL}/projects/${PROJECT_SLUG}`;
  const koUrl = `${BASE_URL}/projects/${PROJECT_SLUG}?lang=ko`;

  console.log(`Generating bilingual HTML snapshot for: ${PROJECT_SLUG}`);
  console.log(`EN URL: ${enUrl}`);
  console.log(`KO URL: ${koUrl}`);
  console.log(`Output: ${outPath}`);
  console.log("");

  const browser = await launchBrowser();

  try {
    const context = await createContext(browser);

    // --- EN capture ---
    const enPage = await context.newPage();
    try {
      await enPage.goto(enUrl, { waitUntil: "domcontentloaded" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes("ERR_CONNECTION_REFUSED") ||
        msg.includes("ECONNREFUSED")
      ) {
        console.error(
          `Error: Cannot reach ${BASE_URL}. Start the dev server first: pnpm dev`,
        );
        process.exitCode = 1;
        return;
      }
      throw err;
    }
    await waitForPageReady(enPage);
    const enHtmlRaw = await enPage.content();
    console.log(`EN captured: ${(enHtmlRaw.length / 1024).toFixed(1)} KB`);

    // --- KO capture ---
    const koPage = await context.newPage();
    await koPage.goto(koUrl, { waitUntil: "domcontentloaded" });
    await waitForPageReady(koPage);
    const koHtmlRaw = await koPage.content();
    console.log(`KO captured: ${(koHtmlRaw.length / 1024).toFixed(1)} KB`);

    // --- Post-processing pipeline ---
    console.log("\nPost-processing...");

    // 1. Strip /_next/ assets + inline RSC payloads from both
    const enStripped = stripNextAssets(enHtmlRaw);
    const koStripped = stripNextAssets(koHtmlRaw);
    console.log(
      `  Strip complete: EN=${(enStripped.length / 1024).toFixed(1)} KB, KO=${(koStripped.length / 1024).toFixed(1)} KB`,
    );

    // 2. Absolutize content URLs from both
    const enProcessed = rewriteUrls(enStripped, SITE_URL);
    const koProcessed = rewriteUrls(koStripped, SITE_URL);

    // 3. Mark external links in EN (KO will be merged in)
    const enFinal = markExternalLinks(enProcessed, SITE_URL);
    console.log("  URL rewriting complete");

    // 4. Merge EN + KO DOM via Playwright browser-side DOMParser
    //    Reuse a new page for the merge step
    const mergePage = await context.newPage();
    const mergedHtml = await mergeLanguages(mergePage, enFinal, koProcessed);
    console.log(
      `  DOM merge complete: ${(mergedHtml.length / 1024).toFixed(1)} KB`,
    );

    // 5. Inject lang-toggle script
    const finalHtml = injectLangToggle(mergedHtml);

    // --- Write output ---
    ensureDir(OUTPUT_DIR);
    fs.writeFileSync(outPath, finalHtml, "utf8");

    const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`\nDone: ${outPath}`);
    console.log(`Size: ${sizeKb} KB`);

    // Sanity stats
    const nextCount = (finalHtml.match(/\/_next\//g) ?? []).length;
    const spanCount = (finalHtml.match(/data-lang=/g) ?? []).length;
    console.log(`  /_next/ references remaining: ${nextCount}`);
    console.log(`  Bilingual spans inserted: ${spanCount}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
