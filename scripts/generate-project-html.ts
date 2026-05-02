/**
 * Generates a full HTML snapshot of a portfolio project page.
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "http://localhost:3000";
const PROJECT_SLUG = "ai-cycling-coach";
const OUTPUT_DIR = path.resolve(__dirname, "output");

async function main(): Promise<void> {
  const outPath = path.join(OUTPUT_DIR, `${PROJECT_SLUG}.html`);
  const targetUrl = `${BASE_URL}/projects/${PROJECT_SLUG}`;

  console.log(`Generating HTML snapshot for: ${PROJECT_SLUG}`);
  console.log(`URL: ${targetUrl}`);
  console.log(`Output: ${outPath}`);
  console.log("");

  const browser = await launchBrowser();

  try {
    const context = await createContext(browser);
    const page = await context.newPage();

    try {
      await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("ERR_CONNECTION_REFUSED") || msg.includes("ECONNREFUSED")) {
        console.error(
          `Error: Cannot reach ${BASE_URL}. Start the dev server first: pnpm dev`,
        );
        process.exitCode = 1;
        return;
      }
      throw err;
    }

    await waitForPageReady(page);

    const html = await page.content();

    ensureDir(OUTPUT_DIR);
    fs.writeFileSync(outPath, html, "utf8");

    const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`Done: ${outPath}`);
    console.log(`Size: ${sizeKb} KB`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
