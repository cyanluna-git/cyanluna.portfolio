/**
 * Playwright capture scenario for CPET Platform
 *
 * Usage: npx tsx scripts/capture/scenarios/cpet-platform.ts
 *
 * Prerequisites:
 * - cpet.db dev servers must be running (frontend: 3100, backend: 8100)
 * - Seed data loaded in PostgreSQL + TimescaleDB
 */
import {
  launchBrowser,
  createContext,
  waitForPageReady,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:3100";
const SLUG = "cpet-platform";

// Known subject/test IDs for deterministic screenshots
const PARK_SUBJECT_ID = "986b0787-25b6-4927-8fc3-aa512d8102a6";
const KO_TEST_ID = "1d82039a-15b8-4ea2-bff9-578289024640";

interface CaptureScene {
  name: string;
  path: string;
  waitMs?: number;
  setup?: (page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>) => Promise<void>;
}

async function login(page: Awaited<ReturnType<Awaited<ReturnType<typeof createContext>>["newPage"]>>): Promise<void> {
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"], input[name="email"]', "admin@cpet.db");
  await page.fill('input[type="password"], input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/(admin|subjects|my-dashboard)/, { timeout: 10000 });
}

const scenes: CaptureScene[] = [
  {
    name: "subjects",
    path: "/subjects",
    waitMs: 2000,
  },
  {
    name: "subject-detail",
    path: `/subjects/${PARK_SUBJECT_ID}`,
    waitMs: 3000,
  },
  {
    name: "test-view",
    path: `/tests/${KO_TEST_ID}`,
    waitMs: 4000,
  },
  {
    name: "metabolism",
    path: "/metabolism",
    waitMs: 2000,
    setup: async (page) => {
      const subjectSelect = page.locator("select").first();
      if ((await subjectSelect.count()) > 0) {
        const realOptions = await subjectSelect.locator('option:not([value=""])').all();
        for (const opt of realOptions) {
          const text = await opt.textContent();
          if (text && !text.includes("선택")) {
            const val = await opt.getAttribute("value");
            if (val) {
              await subjectSelect.selectOption(val);
              await page.waitForTimeout(4000);
              break;
            }
          }
        }
      }
    },
  },
  {
    name: "raw-data",
    path: "/raw-data",
    waitMs: 2000,
    setup: async (page) => {
      const rawSelect = page.locator("select").first();
      if ((await rawSelect.count()) > 0) {
        const allOpts = await rawSelect.locator("option").all();
        for (const opt of allOpts) {
          const text = await opt.textContent();
          if (text && (text.includes("Park") || text.includes("SUB-PAR"))) {
            const val = await opt.getAttribute("value");
            if (val) {
              await rawSelect.selectOption(val);
              await page.waitForTimeout(2000);
              break;
            }
          }
        }
        const testSelect = page.locator("select").nth(1);
        await page.waitForTimeout(1000);
        if ((await testSelect.count()) > 0) {
          const testOpts = await testSelect.locator("option").all();
          for (const opt of testOpts) {
            const val = await opt.getAttribute("value");
            const text = await opt.textContent();
            if (val && text && !text.includes("선택")) {
              await testSelect.selectOption(val);
              await page.waitForTimeout(4000);
              break;
            }
          }
        }
      }
    },
  },
  {
    name: "cohort",
    path: "/cohort",
    waitMs: 2000,
    setup: async (page) => {
      const filterBtn = page.locator('button:has-text("필터 적용")');
      if ((await filterBtn.count()) > 0) {
        await filterBtn.click();
        await page.waitForTimeout(3000);
      }
    },
  },
  {
    name: "admin",
    path: "/admin",
    waitMs: 2000,
  },
];

async function main(): Promise<void> {
  console.log(`Capturing CPET Platform screenshots...`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output slug: ${SLUG}`);
  console.log(`Scenes: ${scenes.length}`);
  console.log("");

  const browser = await launchBrowser();
  const context = await createContext(browser);
  const page = await context.newPage();

  // Login first
  console.log("  [login] Authenticating...");
  await login(page);

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
