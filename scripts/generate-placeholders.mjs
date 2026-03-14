#!/usr/bin/env node

/**
 * Regenerate blur placeholder data URLs for all images in the manifest.
 *
 * Reads the existing image-manifest.json and regenerates blurDataURL
 * for every entry by reading the corresponding raw source image.
 * Useful when you want to update placeholders without re-processing
 * the full-size webp outputs.
 */

import { readFile, writeFile, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = resolve(__dirname, "..");
const PROJECTS_DIR = join(ROOT, "public", "projects");
const MANIFEST_PATH = join(PROJECTS_DIR, "image-manifest.json");

const BLUR_SIZE = 10;

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findRawSource(slug, filename) {
  const extensions = [".png", ".jpg", ".jpeg"];
  for (const ext of extensions) {
    const candidate = join(PROJECTS_DIR, slug, "raw", `${filename}${ext}`);
    if (await fileExists(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function run() {
  console.log("=== Blur Placeholder Regeneration ===\n");

  let manifest;
  try {
    const content = await readFile(MANIFEST_PATH, "utf-8");
    manifest = JSON.parse(content);
  } catch {
    console.log("No manifest found. Run optimize-images first.");
    return;
  }

  let updated = 0;
  let skipped = 0;

  for (const [slug, images] of Object.entries(manifest)) {
    for (const [filename, entry] of Object.entries(images)) {
      const rawPath = await findRawSource(slug, filename);
      if (!rawPath) {
        console.log(`  [skip] ${slug}/${filename} — raw source not found`);
        skipped++;
        continue;
      }

      console.log(`  Generating blur: ${slug}/${filename}`);
      const blurDataURL = await generateBlurDataURL(rawPath);
      entry.blurDataURL = blurDataURL;
      updated++;
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
  console.log(`Manifest written to: ${MANIFEST_PATH}`);
}

run().catch((err) => {
  console.error("Placeholder generation failed:", err);
  process.exit(1);
});
