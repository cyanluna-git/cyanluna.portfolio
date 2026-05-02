/**
 * Uploads all generated HTML files from scripts/output/ to Vercel Blob.
 *
 * Usage: pnpm seed:project-html
 *
 * Requires BLOB_READ_WRITE_TOKEN — loaded from .env.local automatically if present.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BLOB_PREFIX = "portfolio-html/";
const OUTPUT_DIR = path.resolve(__dirname, "output");

// Load .env.local for BLOB_READ_WRITE_TOKEN if not already in environment
function loadEnvLocal(): void {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main(): Promise<void> {
  loadEnvLocal();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Error: BLOB_READ_WRITE_TOKEN not set. Add it to .env.local or export it.");
    process.exitCode = 1;
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error(`Error: scripts/output/ not found. Run pnpm generate:all-projects-html first.`);
    process.exitCode = 1;
    return;
  }

  const htmlFiles = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".html"));
  if (htmlFiles.length === 0) {
    console.error(`Error: No .html files in scripts/output/. Run pnpm generate:all-projects-html first.`);
    process.exitCode = 1;
    return;
  }

  console.log(`Uploading ${htmlFiles.length} HTML file(s) to Vercel Blob...\n`);

  let succeeded = 0;
  let failed = 0;

  for (const filename of htmlFiles) {
    const slug = filename.replace(/\.html$/, "");
    const filePath = path.join(OUTPUT_DIR, filename);

    try {
      const content = fs.readFileSync(filePath);
      const blobKey = `${BLOB_PREFIX}${slug}.html`;

      await put(blobKey, content, {
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "text/html; charset=utf-8",
        access: "public",
      });

      const sizeKb = (content.length / 1024).toFixed(1);
      console.log(`✓ ${slug} (${sizeKb} KB)`);
      succeeded++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`✗ ${slug}: ${msg}`);
      failed++;
      process.exitCode = 1;
    }
  }

  console.log(`\nCompleted: ${succeeded}/${htmlFiles.length} uploaded${failed > 0 ? `, ${failed} failed` : ""}.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
