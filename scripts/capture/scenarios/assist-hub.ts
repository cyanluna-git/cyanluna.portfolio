/**
 * Playwright capture scenario for Assist Hub
 *
 * Usage: npx tsx scripts/capture/scenarios/assist-hub.ts
 *
 * Prerequisites:
 * - assist-hub dev server must be running on port 5103
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:5103";
const SLUG = "assist-hub";

interface CaptureScene {
  name: string;
  path: string;
  waitMs?: number;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

const scenes: CaptureScene[] = [
  {
    name: "dashboard",
    path: "/",
    waitMs: 2000,
  },
  {
    name: "materials",
    path: "/materials",
    waitMs: 2000,
  },
  {
    name: "bulletin",
    path: "/bulletin",
    waitMs: 2000,
  },
  {
    name: "schedule",
    path: "/schedule",
    waitMs: 2000,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing Assist Hub screenshots...`);
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

      await page.goto(url, { waitUntil: "networkidle", timeout: 10000 });
      await page.waitForTimeout(scene.waitMs ?? 2000);

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
