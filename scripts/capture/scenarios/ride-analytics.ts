/**
 * Playwright capture scenario for Ride Analytics
 *
 * Usage: npx tsx scripts/capture/scenarios/ride-analytics.ts
 *
 * Prerequisites:
 * - asan.bicycle dev server must be running on port 3102
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3102";
const SLUG = "ride-analytics";

interface CaptureScene {
  name: string;
  path: string;
  waitMs?: number;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

const scenes: CaptureScene[] = [
  {
    name: "home",
    path: "/",
    waitMs: 3000,
  },
  {
    name: "explore",
    path: "/explore",
    waitMs: 5000,
  },
  {
    name: "courses",
    path: "/courses",
    waitMs: 3000,
  },
  {
    name: "my-courses",
    path: "/my-courses",
    waitMs: 3000,
  },
  {
    name: "upload",
    path: "/upload",
    waitMs: 2000,
  },
  {
    name: "home-scrolled",
    path: "/",
    waitMs: 3000,
    setup: async (page) => {
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(2000);
    },
  },
];

async function main(): Promise<void> {
  console.log(`Capturing Ride Analytics screenshots...`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output slug: ${SLUG}`);
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

      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(scene.waitMs ?? 1500);

      if (scene.setup) {
        await scene.setup(page);
      }

      await waitForPageReady(page);
      const filePath = await captureScreenshot(page, scene.name, SLUG);
      console.log(`    ✓ ${filePath}`);
      captured++;
    } catch (err) {
      console.error(`    ✗ Failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  await browser.close();

  console.log(`\nDone: ${captured}/${scenes.length} screenshots captured.`);
  if (captured < scenes.length) {
    process.exit(1);
  }
}

main();
