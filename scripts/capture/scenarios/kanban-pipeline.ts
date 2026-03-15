/**
 * Playwright capture scenario for AI Kanban Pipeline
 *
 * Usage: npx tsx scripts/capture/scenarios/kanban-pipeline.ts
 *
 * Prerequisites:
 * - Kanban board must be running on port 5173
 */
import {
  launchBrowser,
  captureScreenshot,
} from "../helpers.js";

const BASE_URL = "http://localhost:5173";
const SLUG = "kanban-pipeline";
const PROJECT = "cyanluna.skills";

async function main(): Promise<void> {
  console.log(`Capturing kanban-pipeline screenshots...`);

  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  context.setDefaultTimeout(15000);
  const page = await context.newPage();

  let captured = 0;

  // 1. Board view
  try {
    console.log(`  [board] → Board view`);
    await page.goto(`${BASE_URL}/?project=${PROJECT}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);
    await captureScreenshot(page, "board", SLUG);
    console.log(`    ✓ board`);
    captured++;
  } catch (err) {
    console.error(`    ✗ board: ${err instanceof Error ? err.message : err}`);
  }

  // 2. Task detail — click on a card's title area (not + button)
  try {
    console.log(`  [task-detail] → Opening task card detail...`);
    // Click on the card-title div inside a .card element
    const cardTitle = page.locator('.card .card-title').first();
    if (await cardTitle.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cardTitle.click();
      await page.waitForTimeout(1500);

      // Check modal opened
      const modal = page.locator('#modal-overlay:not(.hidden)');
      if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
        await captureScreenshot(page, "task-detail", SLUG);
        console.log(`    ✓ task-detail`);
        captured++;
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
      } else {
        console.log(`    ⚠ Modal did not open`);
      }
    } else {
      console.log(`    ⚠ No card titles visible`);
    }
  } catch (err) {
    console.error(`    ✗ task-detail: ${err instanceof Error ? err.message : err}`);
  }

  // 3. List view
  try {
    console.log(`  [list-view] → List view`);
    const listBtn = page.locator('#tab-list');
    await listBtn.click();
    await page.waitForTimeout(1500);

    // Uncheck "Hide old" by clicking the toggle button
    const hideBtn = page.locator('#hide-done-btn');
    const btnText = await hideBtn.textContent().catch(() => '');
    if (btnText?.includes('✅')) {
      await hideBtn.click();
      await page.waitForTimeout(1500);
    }

    await captureScreenshot(page, "list-view", SLUG);
    console.log(`    ✓ list-view`);
    captured++;
  } catch (err) {
    console.error(`    ✗ list-view: ${err instanceof Error ? err.message : err}`);
  }

  // 4. Chronicle view
  try {
    console.log(`  [chronicle] → Chronicle view`);
    const chronicleBtn = page.locator('#tab-chronicle');
    await chronicleBtn.click();
    await page.waitForTimeout(1500);

    const hideBtn = page.locator('#hide-done-btn');
    const btnText = await hideBtn.textContent().catch(() => '');
    if (btnText?.includes('✅')) {
      await hideBtn.click();
      await page.waitForTimeout(1500);
    }

    await captureScreenshot(page, "chronicle", SLUG);
    console.log(`    ✓ chronicle`);
    captured++;
  } catch (err) {
    console.error(`    ✗ chronicle: ${err instanceof Error ? err.message : err}`);
  }

  await browser.close();
  console.log(`\nDone: ${captured} screenshots captured.`);
}

main();
