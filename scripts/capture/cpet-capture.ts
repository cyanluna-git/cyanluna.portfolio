import { chromium } from "playwright";
import path from "path";

const BASE_URL = "http://localhost:3100";
const OUTPUT_DIR = path.resolve("public/projects/cpet-platform/raw");

const PARK_SUBJECT_ID = "986b0787-25b6-4927-8fc3-aa512d8102a6";
const KO_TEST_ID = "1d82039a-15b8-4ea2-bff9-578289024640";
const SONG_TEST_ID = "3df9f7f7-c645-48a7-980c-078907a68ef2";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Login
  console.log("Logging in...");
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
  await page.fill('input[type="email"], input[name="email"]', "admin@cpet.db");
  await page.fill('input[type="password"], input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/(admin|subjects|my-dashboard)/, { timeout: 10000 });
  console.log("Logged in, URL:", page.url());

  // 1. Subject List
  console.log("1. Capturing subjects list...");
  await page.goto(`${BASE_URL}/subjects`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "subjects.png"), fullPage: false });

  // 2. Subject Detail - Park Yongdoo (most tests)
  console.log("2. Capturing subject detail...");
  await page.goto(`${BASE_URL}/subjects/${PARK_SUBJECT_ID}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "subject-detail.png"), fullPage: false });

  // 3. Single Test View - Ko Jongseok (complete analysis)
  console.log("3. Capturing test view (Ko Jongseok)...");
  await page.goto(`${BASE_URL}/tests/${KO_TEST_ID}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "test-view.png"), fullPage: false });

  // 3b. Song Daseul's test
  console.log("3b. Capturing test view (Song Daseul)...");
  await page.goto(`${BASE_URL}/tests/${SONG_TEST_ID}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "test-view-2.png"), fullPage: false });

  // 4. Metabolism Page - select a subject
  console.log("4. Capturing metabolism page...");
  await page.goto(`${BASE_URL}/metabolism`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  const subjectSelect = page.locator("select").first();
  if ((await subjectSelect.count()) > 0) {
    const options = await subjectSelect.locator("option").allTextContents();
    console.log("   Options:", options.slice(0, 5));
    const realOptions = await subjectSelect.locator('option:not([value=""])').all();
    for (const opt of realOptions) {
      const text = await opt.textContent();
      if (text && !text.includes("선택")) {
        const val = await opt.getAttribute("value");
        if (val) {
          await subjectSelect.selectOption(val);
          console.log("   Selected:", text);
          await page.waitForTimeout(4000);
          break;
        }
      }
    }
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "metabolism.png"), fullPage: false });

  // 5. Raw Data Viewer - select subject + test
  console.log("5. Capturing raw data viewer...");
  await page.goto(`${BASE_URL}/raw-data`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  const rawSelect = page.locator("select").first();
  if ((await rawSelect.count()) > 0) {
    const allOpts = await rawSelect.locator("option").all();
    for (const opt of allOpts) {
      const text = await opt.textContent();
      if (text && (text.includes("Park") || text.includes("SUB-PAR") || text.includes("Yongdoo"))) {
        const val = await opt.getAttribute("value");
        if (val) {
          await rawSelect.selectOption(val);
          console.log("   Selected subject:", text);
          await page.waitForTimeout(2000);
          break;
        }
      }
    }
    // Select first test
    const testSelect = page.locator("select").nth(1);
    await page.waitForTimeout(1000);
    if ((await testSelect.count()) > 0) {
      const testOpts = await testSelect.locator("option").all();
      for (const opt of testOpts) {
        const val = await opt.getAttribute("value");
        const text = await opt.textContent();
        if (val && text && !text.includes("선택")) {
          await testSelect.selectOption(val);
          console.log("   Selected test:", text);
          await page.waitForTimeout(4000);
          break;
        }
      }
    }
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "raw-data.png"), fullPage: false });

  // 6. Cohort Analysis - apply filter
  console.log("6. Capturing cohort analysis...");
  await page.goto(`${BASE_URL}/cohort`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  const filterBtn = page.locator('button:has-text("필터 적용")');
  if ((await filterBtn.count()) > 0) {
    await filterBtn.click();
    await page.waitForTimeout(3000);
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "cohort.png"), fullPage: false });

  // 7. Admin Dashboard
  console.log("7. Capturing admin dashboard...");
  await page.goto(`${BASE_URL}/admin`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "admin.png"), fullPage: false });

  await browser.close();
  console.log("Done! Screenshots saved to", OUTPUT_DIR);
}

main().catch(console.error);
