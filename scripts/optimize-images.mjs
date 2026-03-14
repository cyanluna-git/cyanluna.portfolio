#!/usr/bin/env node

/**
 * Image optimization pipeline for portfolio project screenshots.
 *
 * Input:  public/projects/[slug]/raw/*.{png,jpg,jpeg}
 * Output: public/projects/[slug]/*.webp (max 1200px wide)
 *         public/projects/image-manifest.json
 *
 * Idempotent — only processes new or changed images (mtime comparison).
 * Safe to re-run at any time.
 */

import { readdir, stat, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = resolve(__dirname, "..");
const PROJECTS_DIR = join(ROOT, "public", "projects");
const MANIFEST_PATH = join(PROJECTS_DIR, "image-manifest.json");

const MAX_WIDTH = 1200;
const BLUR_SIZE = 10;
const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function directoryExists(dirPath) {
  try {
    const s = await stat(dirPath);
    return s.isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getFileMtime(filePath) {
  try {
    const s = await stat(filePath);
    return s.mtimeMs;
  } catch {
    return 0;
  }
}

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function processImage(srcPath, destPath) {
  const image = sharp(srcPath);
  const metadata = await image.metadata();

  const resizeOptions =
    metadata.width && metadata.width > MAX_WIDTH
      ? { width: MAX_WIDTH, withoutEnlargement: true }
      : { withoutEnlargement: true };

  const result = await sharp(srcPath)
    .resize(resizeOptions)
    .webp({ quality: 80 })
    .toBuffer({ resolveWithObject: true });

  await writeFile(destPath, result.data);

  return {
    width: result.info.width,
    height: result.info.height,
  };
}

async function discoverSlugs() {
  const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name !== "raw")
    .map((e) => e.name);
}

async function discoverRawImages(rawDir) {
  if (!(await directoryExists(rawDir))) {
    return [];
  }

  const entries = await readdir(rawDir, { withFileTypes: true });
  return entries
    .filter(
      (e) => e.isFile() && SUPPORTED_EXTENSIONS.has(extname(e.name).toLowerCase()),
    )
    .map((e) => e.name);
}

async function loadExistingManifest() {
  try {
    const content = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function run() {
  console.log("=== Image Optimization Pipeline ===\n");

  const slugs = await discoverSlugs();
  if (slugs.length === 0) {
    console.log("No project directories found.");
    return;
  }

  const manifest = await loadExistingManifest();
  let totalProcessed = 0;
  let totalSkipped = 0;

  for (const slug of slugs) {
    const rawDir = join(PROJECTS_DIR, slug, "raw");
    const outDir = join(PROJECTS_DIR, slug);
    const images = await discoverRawImages(rawDir);

    if (images.length === 0) {
      // Remove slug from manifest if no raw images exist
      if (manifest[slug]) {
        delete manifest[slug];
      }
      continue;
    }

    if (!manifest[slug]) {
      manifest[slug] = {};
    }

    console.log(`[${slug}] Found ${images.length} raw image(s)`);

    for (const imageName of images) {
      const srcPath = join(rawDir, imageName);
      const nameWithoutExt = basename(imageName, extname(imageName));
      const destName = `${nameWithoutExt}.webp`;
      const destPath = join(outDir, destName);

      const srcMtime = await getFileMtime(srcPath);
      const destMtime = await getFileMtime(destPath);

      if (destMtime >= srcMtime && manifest[slug][nameWithoutExt]) {
        totalSkipped++;
        continue;
      }

      console.log(`  Processing: ${imageName} -> ${destName}`);

      const { width, height } = await processImage(srcPath, destPath);
      const blurDataURL = await generateBlurDataURL(srcPath);

      manifest[slug][nameWithoutExt] = {
        src: `/projects/${slug}/${destName}`,
        width,
        height,
        blurDataURL,
        alt: manifest[slug][nameWithoutExt]?.alt || "",
      };

      totalProcessed++;
    }

    // Clean up manifest entries for images that no longer exist in raw/
    const rawNames = new Set(
      images.map((img) => basename(img, extname(img))),
    );
    for (const key of Object.keys(manifest[slug])) {
      if (!rawNames.has(key)) {
        delete manifest[slug][key];
      }
    }
  }

  // Clean up empty slug entries
  for (const slug of Object.keys(manifest)) {
    if (Object.keys(manifest[slug]).length === 0) {
      delete manifest[slug];
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  console.log(
    `\nDone. Processed: ${totalProcessed}, Skipped (unchanged): ${totalSkipped}`,
  );
  console.log(`Manifest written to: ${MANIFEST_PATH}`);
}

run().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
