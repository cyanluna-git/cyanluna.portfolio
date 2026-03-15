import { chromium } from "playwright";
import path from "path";

const OUTPUT_BASE = path.resolve("public/projects");

async function captureAssistHub() {
  const dir = path.join(OUTPUT_BASE, "assist-hub/raw");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  const pages = [
    { name: "dashboard", path: "/" },
    { name: "materials", path: "/materials" },
    { name: "bulletin", path: "/bulletin" },
    { name: "schedule", path: "/schedule" },
  ];

  for (const p of pages) {
    console.log(`[assist-hub] Capturing ${p.name}...`);
    try {
      await page.goto(`http://localhost:5103${p.path}`, { waitUntil: "networkidle", timeout: 10000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, `${p.name}.png`), fullPage: false });
    } catch (e) {
      console.log(`  Failed: ${(e as Error).message.slice(0, 80)}`);
    }
  }

  await browser.close();
  console.log("[assist-hub] Done");
}

async function captureAssist11th() {
  const dir = path.join(OUTPUT_BASE, "assist-11th/raw");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  // First capture login page
  console.log("[assist.11th] Capturing login...");
  await page.goto("http://localhost:3103/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, "login.png"), fullPage: false });

  // Login via API to get session cookie
  console.log("[assist.11th] Logging in via API...");
  const loginRes = await page.evaluate(async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "pjy8412@gmail.com", password: "alskqp10" }),
    });
    return { status: res.status, body: await res.json() };
  });
  console.log(`[assist.11th] Login response: ${loginRes.status}`, JSON.stringify(loginRes.body));

  // Navigate to home to verify auth
  await page.goto("http://localhost:3103/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(5000);
  console.log(`[assist.11th] After login, URL: ${page.url()}`);

  // Authenticated pages
  const authPages = [
    { name: "home", path: "/" },
    { name: "posts", path: "/posts" },
    { name: "gallery", path: "/gallery" },
    { name: "polls", path: "/polls" },
    { name: "organization", path: "/organization" },
    { name: "groups", path: "/groups" },
    { name: "lunch", path: "/lunch" },
    { name: "settings", path: "/settings" },
  ];

  for (const p of authPages) {
    console.log(`[assist.11th] Capturing ${p.name}...`);
    try {
      await page.goto(`http://localhost:3103${p.path}`, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForTimeout(5000);
      await page.screenshot({ path: path.join(dir, `${p.name}.png`), fullPage: false });
    } catch (e) {
      console.log(`  Failed: ${(e as Error).message.slice(0, 80)}`);
    }
  }

  await browser.close();
  console.log("[assist.11th] Done");
}

async function main() {
  // Run sequentially to avoid server overload
  await captureAssist11th();
}

main().catch(console.error);
