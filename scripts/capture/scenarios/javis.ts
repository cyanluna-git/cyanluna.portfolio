/**
 * Playwright capture scenario for Javis
 *
 * Usage: npx tsx scripts/capture/scenarios/javis.ts
 *
 * Prerequisites:
 * - jira.javis dev server must be running on port 3009
 * - PostgreSQL running on port 5439
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3009";
const SLUG = "javis";

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
    waitMs: 3000,
  },
  {
    name: "sprints",
    path: "/sprints",
    waitMs: 2000,
  },
  {
    name: "risks",
    path: "/risks",
    waitMs: 2000,
  },
  {
    name: "sync",
    path: "/sync",
    waitMs: 2000,
  },
  {
    name: "stories",
    path: "/stories",
    waitMs: 2000,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing Javis screenshots...`);
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

      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
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
