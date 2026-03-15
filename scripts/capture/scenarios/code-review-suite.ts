/**
 * Playwright capture scenario for AI Code Review Suite
 *
 * Usage: npx tsx scripts/capture/scenarios/code-review-suite.ts
 *
 * NOTE: Code Review Suite is a CLI-based tool (no web UI).
 * This scenario captures representative terminal output screenshots.
 * Since there is no running server, it generates static placeholder images
 * by capturing a local HTML page that renders terminal-style output.
 *
 * For actual screenshots, use manual terminal capture or asciinema recordings.
 */
import {
  launchBrowser,
  createContext,
  captureScreenshot,
} from "../helpers.js";

const SLUG = "code-review-suite";

const TERMINAL_HTML = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0; padding: 40px;
    background: #1e1e2e; color: #cdd6f4;
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
    font-size: 14px; line-height: 1.6;
  }
  .prompt { color: #a6e3a1; }
  .cmd { color: #89b4fa; }
  .output { color: #cdd6f4; }
  .highlight { color: #f9e2af; }
  .error { color: #f38ba8; }
  .success { color: #a6e3a1; }
  .dim { color: #6c7086; }
  .title { color: #cba6f7; font-weight: bold; font-size: 16px; }
</style>
</head>
<body>
<div class="title">AI Code Review Suite</div>
<br>
<span class="prompt">$</span> <span class="cmd">python review.py --pr 142 --domain backend</span>
<br><br>
<span class="dim">[1/4]</span> <span class="output">Fetching PR #142 from Bitbucket...</span><br>
<span class="dim">[2/4]</span> <span class="output">Detected domain: <span class="highlight">backend</span> (12 files, 3 services)</span><br>
<span class="dim">[3/4]</span> <span class="output">Analyzing with Claude API...</span><br>
<span class="dim">[4/4]</span> <span class="output">Posting 8 review comments to PR</span><br>
<br>
<span class="success">Review complete:</span><br>
<span class="output">  API Design: 3 suggestions</span><br>
<span class="output">  Security: 2 warnings</span><br>
<span class="output">  DB Queries: 2 optimizations</span><br>
<span class="output">  Architecture: 1 note</span><br>
</body>
</html>
`;

async function main(): Promise<void> {
  console.log(`Capturing Code Review Suite screenshots...`);
  console.log(`Output slug: ${SLUG}`);
  console.log(`Mode: Static HTML terminal rendering`);
  console.log("");

  const browser = await launchBrowser();
  const context = await createContext(browser);
  const page = await context.newPage();

  try {
    console.log(`  [terminal-output] → rendering CLI output`);
    await page.setContent(TERMINAL_HTML, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const filePath = await captureScreenshot(page, "terminal-output", SLUG);
    console.log(`    ✓ ${filePath}`);
  } catch (err) {
    console.error(`    ✗ Failed: ${err instanceof Error ? err.message : err}`);
  }

  await browser.close();
  console.log(`\nDone: 1 screenshot captured.`);
}

main();
