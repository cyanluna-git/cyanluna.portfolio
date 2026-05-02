/**
 * Batch-generates bilingual HTML snapshots for all eligible portfolio project pages.
 *
 * Applies the full Phase 1-4 pipeline (EN + KO capture, CSS inline, post-process,
 * DOM merge, lang-toggle injection) to all 12 eligible slugs in a single browser
 * session. Excluded: moru, smart-factory-qc (hardcoded pages).
 *
 * Usage: pnpm generate:all-projects-html
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
  inlineCss,
} from "./lib/post-process.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "http://localhost:3000";
const SITE_URL = "https://cyanluna.com";
const OUTPUT_DIR = path.resolve(__dirname, "output");

// All 12 eligible slugs (14 total minus 2 hardcoded: moru, smart-factory-qc)
const SLUGS = [
  "equipment-gateway",
  "resource-board",
  "ai-cycling-coach",
  "cpet-platform",
  "ride-analytics",
  "today-bike",
  "personal-finance",
  "assist-hub",
  "assist-11th",
  "kanban-pipeline",
  "code-review-suite",
  "javis",
] as const;

async function main(): Promise<void> {
  console.log(`Generating bilingual HTML snapshots for ${SLUGS.length} slugs`);
  console.log(`BASE_URL: ${BASE_URL}`);
  console.log(`Output:   ${OUTPUT_DIR}`);
  console.log("");

  ensureDir(OUTPUT_DIR);

  const browser = await launchBrowser();
  let failedCount = 0;

  try {
    for (const slug of SLUGS) {
      const context = await createContext(browser);
      try {
        const enUrl = `${BASE_URL}/projects/${slug}`;
        const koUrl = `${BASE_URL}/projects/${slug}?lang=ko`;

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
        await inlineCss(enPage);
        const enHtmlRaw = await enPage.content();

        // --- KO capture ---
        const koPage = await context.newPage();
        await koPage.goto(koUrl, { waitUntil: "domcontentloaded" });
        await waitForPageReady(koPage);
        await inlineCss(koPage);
        const koHtmlRaw = await koPage.content();

        // --- Post-processing pipeline ---
        // 1. Strip /_next/ assets from both
        const enStripped = stripNextAssets(enHtmlRaw);
        const koStripped = stripNextAssets(koHtmlRaw);

        // 2. Absolutize content URLs
        const enRewritten = rewriteUrls(enStripped, SITE_URL);
        const koRewritten = rewriteUrls(koStripped, SITE_URL);

        // 3. Mark external links in EN
        const enProcessed = markExternalLinks(enRewritten, SITE_URL);

        // 4. Merge EN + KO DOM via browser-side DOMParser
        const mergePage = await context.newPage();
        const mergedHtml = await mergeLanguages(mergePage, enProcessed, koRewritten);

        // 5. Inject lang-toggle script
        const finalHtml = injectLangToggle(mergedHtml);

        // --- Write output ---
        const outPath = path.join(OUTPUT_DIR, `${slug}.html`);
        fs.writeFileSync(outPath, finalHtml, "utf8");
        const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
        console.log(`✓ ${slug} (${sizeKb} KB)`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`✗ ${slug}: ${msg}`);
        failedCount++;
        process.exitCode = 1;
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const successCount = SLUGS.length - failedCount;
  console.log(
    `\nCompleted: ${successCount}/${SLUGS.length}${failedCount > 0 ? ` (${failedCount} failed)` : ""}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
