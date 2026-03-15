/**
 * Playwright capture scenario for today.bike
 *
 * Usage: npx tsx scripts/capture/scenarios/today-bike.ts
 *
 * Prerequisites:
 * - Run seed: cd ~/dev/today.bike && bin/rails db:seed
 * - today.bike dev server must be running on port 3000
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3000";
const SLUG = "today-bike";

interface CaptureScene {
  name: string;
  path: string;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

const scenes: CaptureScene[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "gallery",
    path: "/gallery",
  },
  {
    name: "service-overhaul",
    path: "/services/overhaul",
  },
  {
    name: "products",
    path: "/products",
  },
  {
    name: "blog",
    path: "/blog",
  },
  {
    name: "admin-dashboard",
    path: "/admin",
    setup: async (page) => {
      // Login to admin
      await page.fill('input[name="admin_user[email]"]', "admin@today.bike");
      await page.fill('input[name="admin_user[password]"]', "password");
      await page.click('input[type="submit"], button[type="submit"]');
      await page.waitForLoadState("networkidle");
    },
  },
  {
    name: "admin-kanban",
    path: "/admin/service_orders/kanban",
  },
  {
    name: "admin-bicycles",
    path: "/admin/bicycles",
  },
];

async function main(): Promise<void> {
  console.log(`Capturing today.bike screenshots...`);
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
      // Admin pages need login first (session persists in context)
      if (scene.name === "admin-dashboard") {
        const loginUrl = `${BASE_URL}/admin_users/sign_in`;
        console.log(`  [login] → ${loginUrl}`);
        await page.goto(loginUrl, { waitUntil: "networkidle" });
        await waitForPageReady(page);

        if (scene.setup) {
          await scene.setup(page);
          await waitForPageReady(page);
        }

        const filePath = await captureScreenshot(page, scene.name, SLUG);
        console.log(`    ✓ ${filePath}`);
        captured++;
        continue;
      }

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
