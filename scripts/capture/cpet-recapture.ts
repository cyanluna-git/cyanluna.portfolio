import { chromium } from "playwright";
import path from "path";

const BASE_URL = "http://localhost:3100";
const OUTPUT_DIR = path.resolve("public/projects/cpet-platform/raw");
const PARK_SUBJECT_ID = "986b0787-25b6-4927-8fc3-aa512d8102a6";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Login
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
  await page.fill('input[type="email"]', "admin@cpet.db");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/(admin|subjects|my-dashboard)/, { timeout: 10000 });
  console.log("Logged in");

  // 1. Metabolism - scroll to pattern comparison charts
  console.log("Capturing metabolism patterns...");
  await page.goto(`${BASE_URL}/metabolism`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  // Scroll to the pattern comparison section
  await page.evaluate(() => {
    const el = document.querySelector('h2, h3, div');
    const sections = document.querySelectorAll('section, div > h2, div > h3, [class*="pattern"], [class*="Pattern"]');
    // Scroll to bottom area where pattern charts are
    window.scrollTo(0, 600);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "metabolism-patterns.png"), fullPage: false });
  
  // Full page metabolism
  await page.screenshot({ path: path.join(OUTPUT_DIR, "metabolism-full.png"), fullPage: true });

  // 2. Raw data - wait longer for chart to load
  console.log("Capturing raw data with loaded chart...");
  await page.goto(`${BASE_URL}/raw-data`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  
  // Select Park Yongdoo
  const rawSelect = page.locator("select").first();
  const allOpts = await rawSelect.locator("option").all();
  for (const opt of allOpts) {
    const text = await opt.textContent();
    if (text && text.includes("Park")) {
      const val = await opt.getAttribute("value");
      if (val) { await rawSelect.selectOption(val); break; }
    }
  }
  await page.waitForTimeout(2000);
  
  // Select first test
  const testSelect = page.locator("select").nth(1);
  const testOpts = await testSelect.locator("option").all();
  for (const opt of testOpts) {
    const val = await opt.getAttribute("value");
    const text = await opt.textContent();
    if (val && text && !text.includes("선택")) {
      await testSelect.selectOption(val);
      console.log("  Selected test:", text);
      break;
    }
  }
  
  // Click "전처리 수행" button if present
  const processBtn = page.locator('button:has-text("전처리 수행")');
  if (await processBtn.count() > 0) {
    console.log("  Clicking process button...");
    await processBtn.click();
  }
  
  // Wait longer for data to load
  await page.waitForTimeout(8000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "raw-data.png"), fullPage: false });

  // 3. Try test view via subject detail navigation
  console.log("Navigating to test from subject detail...");
  await page.goto(`${BASE_URL}/subjects/${PARK_SUBJECT_ID}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3000);
  
  // Click on "Test History" tab
  const testHistoryTab = page.locator('button:has-text("Test History"), a:has-text("Test History"), [role="tab"]:has-text("Test")');
  if (await testHistoryTab.count() > 0) {
    await testHistoryTab.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, "subject-tests.png"), fullPage: false });
    
    // Click on a test link
    const testLink = page.locator('a[href*="/tests/"], tr[data-test-id], button:has-text("상세"), button:has-text("보기")').first();
    if (await testLink.count() > 0) {
      await testLink.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(4000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, "test-from-detail.png"), fullPage: false });
    }
  }

  // 4. Cohort with male filter
  console.log("Capturing cohort with gender filter...");
  await page.goto(`${BASE_URL}/cohort`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  // Select male
  const genderSelect = page.locator('select').first();
  if (await genderSelect.count() > 0) {
    const genderOpts = await genderSelect.locator('option').allTextContents();
    console.log("  Gender options:", genderOpts);
    await genderSelect.selectOption({ label: '남성' }).catch(() => {
      console.log("  '남성' not found, trying 'Male'...");
      return genderSelect.selectOption({ label: 'Male' });
    }).catch(() => {
      console.log("  Trying '남' ...");
      return genderSelect.selectOption({ index: 1 });
    });
  }
  const filterBtn = page.locator('button:has-text("필터 적용")');
  if (await filterBtn.count() > 0) {
    await filterBtn.click();
    await page.waitForTimeout(4000);
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, "cohort.png"), fullPage: false });

  await browser.close();
  console.log("Done!");
}

main().catch(console.error);
