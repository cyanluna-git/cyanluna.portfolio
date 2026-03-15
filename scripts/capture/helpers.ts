import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import {
  BROWSER_OPTIONS,
  CONTEXT_OPTIONS,
  DEFAULT_TIMEOUT,
  OUTPUT_BASE,
} from "./config.js";

export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export async function launchBrowser(): Promise<Browser> {
  return chromium.launch(BROWSER_OPTIONS);
}

export async function createContext(browser: Browser): Promise<BrowserContext> {
  const context = await browser.newContext(CONTEXT_OPTIONS);
  context.setDefaultTimeout(DEFAULT_TIMEOUT);
  return context;
}

export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle");
  // Extra wait for chart/animation rendering
  await page.waitForTimeout(500);
}

export async function captureScreenshot(
  page: Page,
  name: string,
  slug: string,
): Promise<string> {
  const outputDir = path.join(OUTPUT_BASE, slug, "raw");
  ensureDir(outputDir);

  const filePath = path.join(outputDir, `${name}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  return filePath;
}

export function getOutputDir(slug: string): string {
  return path.join(OUTPUT_BASE, slug, "raw");
}
