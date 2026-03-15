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

  // 1. Home / Dashboard
  console.log("1. Capturing home page...");
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home.png"), fullPage: false });

  // 2. Explore (map view)
  console.log("2. Capturing explore page...");
  await page.goto(`${BASE_URL}/explore`, { waitUntil: "networkidle" });
  await page.waitForTimeout(5000); // Maps take time to load
  await page.screenshot({ path: path.join(OUTPUT_DIR, "explore.png"), fullPage: false });

  // 3. Courses
  console.log("3. Capturing courses page...");
  await page.goto(`${BASE_URL}/courses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "courses.png"), fullPage: false });

  // 4. My Courses (may need auth)
  console.log("4. Capturing my-courses page...");
  await page.goto(`${BASE_URL}/my-courses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "my-courses.png"), fullPage: false });

  // 5. Upload page
  console.log("5. Capturing upload page...");
  await page.goto(`${BASE_URL}/upload`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "upload.png"), fullPage: false });

  // 6. Home scrolled down for more content
  console.log("6. Capturing home scrolled...");
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "home-scrolled.png"), fullPage: false });

  await browser.close();
  console.log("Done! Screenshots saved to", OUTPUT_DIR);
}

main().catch(console.error);
