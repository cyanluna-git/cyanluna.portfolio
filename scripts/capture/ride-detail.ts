import { chromium } from "playwright";
import path from "path";

const BASE_URL = "http://localhost:3102";
const OUTPUT_DIR = path.resolve("public/projects/ride-analytics/raw");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Go to courses page and find course links
  console.log("Going to courses...");
  await page.goto(`${BASE_URL}/courses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Debug: see what links exist
  const allLinks = await page.locator('a').all();
  for (const link of allLinks.slice(0, 10)) {
    const href = await link.getAttribute("href");
    const text = (await link.textContent())?.trim().slice(0, 50);
    console.log(`  Link: ${href} → "${text}"`);
  }

  // Try clicking the course card directly (it might be a div, not an a tag)
  const courseCards = await page.locator('[class*="card"], [class*="course"], [class*="Course"]').all();
  console.log(`  Found ${courseCards.length} card elements`);

  // Try clicking on a course name/title text
  const courseTitle = page.locator('h2, h3').filter({ hasText: /수철리|아산남부순환|신방동/ }).first();
  if (await courseTitle.count() > 0) {
    const titleText = await courseTitle.textContent();
    console.log(`  Clicking course title: ${titleText}`);
    await courseTitle.click();
    await page.waitForTimeout(5000);
    console.log(`  URL after click: ${page.url()}`);
    await page.screenshot({ path: path.join(OUTPUT_DIR, "course-detail.png"), fullPage: false });
  } else {
    console.log("  No course titles found, trying any clickable area...");
    // screenshot courses page showing all the courses
    await page.screenshot({ path: path.join(OUTPUT_DIR, "courses-full.png"), fullPage: true });
  }

  await browser.close();
  console.log("Done!");
}

main().catch(console.error);
