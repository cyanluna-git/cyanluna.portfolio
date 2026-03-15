/**
 * Generate animated GIF thumbnails for portfolio project cards.
 *
 * Captures multiple pages per project → combines into looping GIF.
 * Requires: ffmpeg installed, target servers running.
 *
 * Usage: npx tsx scripts/capture/generate-gifs.ts
 */
import { chromium, type Page } from "@playwright/test";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUTPUT_BASE = path.resolve("public/projects");
const FRAME_DELAY_MS = 500; // time each frame shows in the GIF
const GIF_WIDTH = 640;

interface GifProject {
  slug: string;
  baseUrl: string;
  scenes: { name: string; path: string; setup?: (page: Page) => Promise<void> }[];
}

const projects: GifProject[] = [
  {
    slug: "today-bike",
    baseUrl: "http://localhost:3000",
    scenes: [
      { name: "home", path: "/" },
      { name: "service", path: "/services/overhaul" },
      { name: "gallery", path: "/gallery" },
      { name: "products", path: "/products" },
    ],
  },
  {
    slug: "personal-finance",
    baseUrl: "http://168.138.52.26",
    scenes: [
      { name: "dashboard", path: "/" },
      { name: "transactions", path: "/transactions" },
      { name: "income", path: "/income" },
      { name: "assets", path: "/assets" },
    ],
  },
  {
    slug: "kanban-pipeline",
    baseUrl: "http://localhost:5173",
    scenes: [
      {
        name: "board",
        path: "/?project=cyanluna.skills",
        setup: async (page) => {
          await page.waitForTimeout(2000);
        },
      },
      {
        name: "list",
        path: "/?project=cyanluna.skills",
        setup: async (page) => {
          await page.waitForTimeout(1500);
          await page.locator("#tab-list").click();
          await page.waitForTimeout(1000);
          const hideBtn = page.locator("#hide-done-btn");
          const text = await hideBtn.textContent().catch(() => "");
          if (text?.includes("✅")) {
            await hideBtn.click();
            await page.waitForTimeout(1000);
          }
        },
      },
      {
        name: "chronicle",
        path: "/?project=cyanluna.skills",
        setup: async (page) => {
          await page.waitForTimeout(1500);
          await page.locator("#tab-chronicle").click();
          await page.waitForTimeout(1000);
          const hideBtn = page.locator("#hide-done-btn");
          const text = await hideBtn.textContent().catch(() => "");
          if (text?.includes("✅")) {
            await hideBtn.click();
            await page.waitForTimeout(1000);
          }
        },
      },
    ],
  },
];

async function captureFrames(project: GifProject): Promise<string[]> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 675 }, // 16:9
    deviceScaleFactor: 1,
    colorScheme: project.slug === "kanban-pipeline" ? "dark" : "light",
  });
  context.setDefaultTimeout(15000);

  const framesDir = path.join(OUTPUT_BASE, project.slug, "gif-frames");
  fs.mkdirSync(framesDir, { recursive: true });

  const framePaths: string[] = [];
  const page = await context.newPage();

  // For kanban, login/auth might be needed
  if (project.slug === "today-bike") {
    // Admin login for today.bike
    await page.goto(`${project.baseUrl}/admin_users/sign_in`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });
    await page.waitForTimeout(1000);
    try {
      await page.fill('input[name="admin_user[email]"]', "admin@today.bike");
      await page.fill('input[name="admin_user[password]"]', "password");
      await page.click('input[type="submit"]');
      await page.waitForLoadState("networkidle");
    } catch {
      // Login not needed or already logged in
    }
  }

  for (let i = 0; i < project.scenes.length; i++) {
    const scene = project.scenes[i];
    const framePath = path.join(framesDir, `frame-${String(i).padStart(2, "0")}.png`);

    try {
      await page.goto(`${project.baseUrl}${scene.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);

      if (scene.setup) {
        await scene.setup(page);
      }

      await page.screenshot({ path: framePath, fullPage: false });
      framePaths.push(framePath);
      console.log(`    frame ${i}: ${scene.name}`);
    } catch (err) {
      console.error(`    ✗ frame ${i} (${scene.name}): ${err instanceof Error ? err.message : err}`);
    }
  }

  await browser.close();
  return framePaths;
}

function assembleGif(slug: string, framePaths: string[]): string {
  if (framePaths.length === 0) throw new Error("No frames to assemble");

  const framesDir = path.join(OUTPUT_BASE, slug, "gif-frames");
  const outputPath = path.join(OUTPUT_BASE, slug, "thumbnail.gif");
  const fps = 1000 / FRAME_DELAY_MS; // 500ms → 2fps

  // Generate palette for better GIF quality
  const palettePath = path.join(framesDir, "palette.png");

  // Use ffmpeg: input frames → scale → palette → high-quality GIF
  execSync(
    `ffmpeg -y -framerate ${fps} -i "${framesDir}/frame-%02d.png" ` +
    `-vf "scale=${GIF_WIDTH}:-1:flags=lanczos,palettegen=stats_mode=diff" ` +
    `"${palettePath}"`,
    { stdio: "pipe" },
  );

  execSync(
    `ffmpeg -y -framerate ${fps} -i "${framesDir}/frame-%02d.png" -i "${palettePath}" ` +
    `-lavfi "scale=${GIF_WIDTH}:-1:flags=lanczos [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5" ` +
    `-loop 0 "${outputPath}"`,
    { stdio: "pipe" },
  );

  // Cleanup frames
  fs.rmSync(framesDir, { recursive: true, force: true });

  const size = fs.statSync(outputPath).size;
  console.log(`    → ${outputPath} (${(size / 1024).toFixed(0)} KB)`);
  return outputPath;
}

async function main(): Promise<void> {
  console.log("=== Generating GIF Thumbnails ===\n");

  for (const project of projects) {
    console.log(`[${project.slug}]`);

    // Check if server is reachable
    try {
      const resp = await fetch(project.baseUrl, { signal: AbortSignal.timeout(3000) });
      if (!resp.ok && resp.status !== 302) {
        console.log(`  ⚠ Server not reachable (${resp.status}), skipping`);
        continue;
      }
    } catch {
      console.log(`  ⚠ Server not reachable, skipping`);
      continue;
    }

    const frames = await captureFrames(project);
    if (frames.length >= 2) {
      assembleGif(project.slug, frames);
    } else {
      console.log(`  ⚠ Not enough frames (${frames.length}), skipping GIF`);
    }
    console.log();
  }

  console.log("Done.");
}

main();
