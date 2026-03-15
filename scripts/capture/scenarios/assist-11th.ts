/**
 * Playwright capture scenario for aSSiST 11th Community
 *
 * Usage: npx tsx scripts/capture/scenarios/assist-11th.ts
 *
 * Prerequisites:
 * - assist.11th dev server must be running on port 3103
 * - Seed data loaded (users, posts, gallery, etc.)
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3103";
const SLUG = "assist-11th";

interface CaptureScene {
  name: string;
  path: string;
  waitMs?: number;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

async function login(page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>): Promise<void> {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Capture login page before authenticating
  await captureScreenshot(page, "login", SLUG);
  console.log(`    ✓ login (pre-auth)`);

  // Login via API
  await page.evaluate(async () => {
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "pjy8412@gmail.com", password: "alskqp10" }),
    });
  });

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);
}

const scenes: CaptureScene[] = [
  {
    name: "home",
    path: "/",
    waitMs: 3000,
  },
  {
    name: "posts",
    path: "/posts",
    waitMs: 3000,
  },
  {
    name: "gallery",
    path: "/gallery",
    waitMs: 3000,
  },
  {
    name: "polls",
    path: "/polls",
    waitMs: 3000,
  },
  {
    name: "organization",
    path: "/organization",
    waitMs: 3000,
  },
  {
    name: "groups",
    path: "/groups",
    waitMs: 3000,
  },
  {
    name: "lunch",
    path: "/lunch",
    waitMs: 3000,
  },
  {
    name: "settings",
    path: "/settings",
    waitMs: 3000,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing aSSiST 11th Community screenshots...`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output slug: ${SLUG}`);
  console.log(`Scenes: ${scenes.length + 1} (including login)`);
  console.log("");

  const browser = await launchBrowser();
  const context = await createContext(browser);
  const page = await context.newPage();

  // Login first (also captures login page)
  console.log("  [login] Authenticating...");
  await login(page);

  let captured = 1; // login already captured

  for (const scene of scenes) {
    try {
      const url = `${BASE_URL}${scene.path}`;
      console.log(`  [${scene.name}] → ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForTimeout(scene.waitMs ?? 3000);

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

  const totalScenes = scenes.length + 1;
  console.log(`\nDone: ${captured}/${totalScenes} screenshots captured.`);
  if (captured < totalScenes) {
    process.exit(1);
  }
}

main();
