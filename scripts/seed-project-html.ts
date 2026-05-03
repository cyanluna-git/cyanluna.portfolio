/**
 * Uploads generated HTML files from scripts/output/ to Vercel Blob.
 *
 * Usage:
 *   pnpm seed:project-html                          — upload all files in scripts/output/
 *   pnpm publish:project-html <slug>                — upload scripts/output/<slug>.html
 *   pnpm publish:project-html <slug> <file-path>    — upload any HTML file as <slug>
 *
 * Requires BLOB_READ_WRITE_TOKEN — loaded from .env.local automatically if present.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { del, head, put } from "@vercel/blob";

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
    console.error(`Error: scripts/output/ not found.`);
    process.exitCode = 1;
    return;
  }

  const command = process.argv[2]; // slug or "delete"
  const slugArg = command === "delete" ? process.argv[3] : command;
  const fileArg = command === "delete" ? undefined : process.argv[3];

  // Delete mode: pnpm publish:project-html delete <slug>
  if (command === "delete") {
    if (!slugArg) {
      console.error("Usage: pnpm publish:project-html delete <slug>");
      process.exitCode = 1;
      return;
    }
    const blobKey = `${BLOB_PREFIX}${slugArg}.html`;
    try {
      await head(blobKey);
    } catch {
      console.error(`✗ ${slugArg}: not found in Blob`);
      process.exitCode = 1;
      return;
    }
    await del(blobKey);
    console.log(`✓ ${slugArg} — deleted from Blob`);
    return;
  }

  // Single file mode: pnpm publish:project-html <slug> [file-path]
  if (slugArg) {
    const filePath = fileArg
      ? path.resolve(process.cwd(), fileArg)
      : path.join(OUTPUT_DIR, `${slugArg}.html`);

    if (!fs.existsSync(filePath)) {
      console.error(`Error: file not found — ${filePath}`);
      process.exitCode = 1;
      return;
    }

    const content = fs.readFileSync(filePath);
    const blobKey = `${BLOB_PREFIX}${slugArg}.html`;
    try {
      await put(blobKey, content, {
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "text/html; charset=utf-8",
        access: "public",
      });
      const sizeKb = (content.length / 1024).toFixed(1);
      console.log(`✓ ${slugArg} (${sizeKb} KB) — published`);
    } catch (err) {
      console.error(`✗ ${slugArg}: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
    return;
  }

  // Bulk mode: upload all files in scripts/output/
  const htmlFiles = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".html"));
  if (htmlFiles.length === 0) {
    console.error(`Error: No .html files in scripts/output/.`);
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
