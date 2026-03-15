/**
 * Playwright capture scenario for AI Cycling Coach
 *
 * Usage: npx tsx scripts/capture/scenarios/ai-cycling-coach.ts
 *
 * Captures from production URL (Vercel).
 * Landing page: no auth needed.
 * Dashboard: requires Supabase auth session.
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "https://ai-cycling-workout-planner.vercel.app";
const SLUG = "ai-cycling-coach";

interface CaptureScene {
  name: string;
  path: string;
  waitMs?: number;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

const scenes: CaptureScene[] = [
  {
    name: "landing",
    path: "/",
    waitMs: 2000,
  },
  {
    name: "auth",
    path: "/auth",
    waitMs: 1500,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing AI Cycling Coach screenshots...`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log("");

  const browser = await launchBrowser();
  const context = await createContext(browser);
  const page = await context.newPage();

  let captured = 0;

  for (const scene of scenes) {
    try {
      const url = `${BASE_URL}${scene.path}`;
      console.log(`  [${scene.name}] → ${url}`);

      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(scene.waitMs ?? 1500);

      if (scene.setup) {
        await scene.setup(page);
      }

      const filePath = await captureScreenshot(page, scene.name, SLUG);
      console.log(`    ✓ ${filePath}`);
      captured++;
    } catch (err) {
      console.error(`    ✗ Failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  await browser.close();
  console.log(`\nDone: ${captured}/${scenes.length} screenshots captured.`);
}

main();
