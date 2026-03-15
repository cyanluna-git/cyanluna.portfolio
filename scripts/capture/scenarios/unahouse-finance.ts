/**
 * Playwright capture scenario for unahouse.finance
 *
 * Usage: npx tsx scripts/capture/scenarios/unahouse-finance.ts
 *
 * Prerequisites:
 * - Run seed script first: npx tsx scripts/capture/seeds/unahouse-finance.ts --reset
 * - unahouse.finance dev server must be running on port 3104
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3104";
const SLUG = "personal-finance";

interface CaptureScene {
  name: string;
  path: string;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

const scenes: CaptureScene[] = [
  {
    name: "dashboard",
    path: "/",
  },
  {
    name: "transactions",
    path: "/transactions",
  },
  {
    name: "income",
    path: "/income",
  },
  {
    name: "cards",
    path: "/cards",
  },
  {
    name: "loans",
    path: "/loans",
  },
  {
    name: "fixed-expenses",
    path: "/fixed-expenses",
  },
  {
    name: "trips",
    path: "/trips",
  },
];

async function main(): Promise<void> {
  console.log(`Capturing unahouse.finance screenshots...`);
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
      await waitForPageReady(page);

      if (scene.setup) {
        await scene.setup(page);
        await waitForPageReady(page);
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
  if (captured < scenes.length) {
    process.exit(1);
  }
}

main();
