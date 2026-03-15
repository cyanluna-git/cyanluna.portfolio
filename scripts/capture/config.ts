import type { LaunchOptions, BrowserContextOptions } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const VIEWPORT = { width: 1200, height: 800 };

export const BROWSER_OPTIONS: LaunchOptions = {
  headless: true,
};

export const CONTEXT_OPTIONS: BrowserContextOptions = {
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  colorScheme: "dark",
};

export const DEFAULT_TIMEOUT = 30_000;

export const OUTPUT_BASE = path.resolve(__dirname, "../../public/projects");

export const PROJECTS_BASE = path.resolve(__dirname, "../../..");
