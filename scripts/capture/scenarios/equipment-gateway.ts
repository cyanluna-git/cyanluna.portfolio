/**
 * Playwright capture scenario for Equipment Gateway
 *
 * Usage: npx tsx scripts/capture/scenarios/equipment-gateway.ts
 *
 * Prerequisites:
 * - edwards/unify dev servers must be running (frontend: 3001, backend: 8001)
 * - InfluxDB running on port 8086
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3001";
const SLUG = "equipment-gateway";

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
    name: "devices",
    path: "/devices",
    waitMs: 2000,
  },
  {
    name: "monitoring",
    path: "/monitoring",
    waitMs: 3000,
  },
  {
    name: "flow-editor",
    path: "/flow",
    waitMs: 3000,
  },
  {
    name: "settings",
    path: "/settings",
    waitMs: 2000,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing Equipment Gateway screenshots...`);
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
