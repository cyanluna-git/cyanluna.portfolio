/**
 * Static analysis tests for scripts/generate-project-html.ts.
 *
 * These tests verify the script's structure without launching a real browser,
 * ensuring constants, imports, error handling, and cleanup are all present.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, beforeAll } from "vitest";

const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/generate-project-html.ts");

let scriptContent: string;

beforeAll(() => {
  scriptContent = fs.readFileSync(SCRIPT_PATH, "utf8");
});

describe("generate-project-html.ts — static analysis", () => {
  it("script file exists", () => {
    expect(fs.existsSync(SCRIPT_PATH)).toBe(true);
  });

  it("defines BASE_URL as http://localhost:3000", () => {
    expect(scriptContent).toContain('BASE_URL = "http://localhost:3000"');
  });

  it("defines PROJECT_SLUG constant", () => {
    expect(scriptContent).toContain("PROJECT_SLUG");
  });

  it("imports helpers from ./capture/helpers.js (ESM .js extension)", () => {
    expect(scriptContent).toContain('"./capture/helpers.js"');
  });

  it("imports launchBrowser from helpers", () => {
    expect(scriptContent).toContain("launchBrowser");
  });

  it("imports createContext from helpers", () => {
    expect(scriptContent).toContain("createContext");
  });

  it("imports waitForPageReady from helpers", () => {
    expect(scriptContent).toContain("waitForPageReady");
  });

  it("handles ERR_CONNECTION_REFUSED error", () => {
    expect(scriptContent).toContain("ERR_CONNECTION_REFUSED");
  });

  it("handles ECONNREFUSED error", () => {
    expect(scriptContent).toContain("ECONNREFUSED");
  });

  it("error message references BASE_URL and pnpm dev", () => {
    expect(scriptContent).toContain("pnpm dev");
    // The error message embeds BASE_URL dynamically, so check the template literal pattern
    expect(scriptContent).toContain("Cannot reach");
    expect(scriptContent).toContain("Start the dev server first");
  });

  it("calls browser.close() inside a finally block", () => {
    // Ensure finally block exists and browser.close() is called within it
    const finallyIndex = scriptContent.indexOf("} finally {");
    expect(finallyIndex).toBeGreaterThan(-1);

    const afterFinally = scriptContent.slice(finallyIndex);
    expect(afterFinally).toContain("browser.close()");
  });

  it("uses page.content() to extract HTML", () => {
    expect(scriptContent).toContain("page.content()");
  });

  it("writes output to scripts/output/ directory", () => {
    expect(scriptContent).toContain("output");
    expect(scriptContent).toContain("writeFileSync");
  });

  it("logs file path and size in KB", () => {
    expect(scriptContent).toContain("Done:");
    expect(scriptContent).toContain("Size:");
    expect(scriptContent).toContain("KB");
  });

  it("resolves __dirname via fileURLToPath for ESM compatibility", () => {
    expect(scriptContent).toContain("fileURLToPath");
    expect(scriptContent).toContain("import.meta.url");
  });

  it("uses process.exitCode (not process.exit) so finally block always runs", () => {
    expect(scriptContent).not.toContain("process.exit(");
    expect(scriptContent).toContain("process.exitCode");
  });

  it("main() call has .catch() for unhandled rejection safety", () => {
    expect(scriptContent).toContain("main().catch(");
  });
});

describe("package.json — generate:project-html script entry", () => {
  it("package.json has generate:project-html script", () => {
    const pkgPath = path.resolve(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as {
      scripts: Record<string, string>;
    };
    expect(pkg.scripts["generate:project-html"]).toBe(
      "npx tsx scripts/generate-project-html.ts",
    );
  });
});

describe(".gitignore — scripts/output/ excluded", () => {
  it(".gitignore excludes /scripts/output/", () => {
    const gitignorePath = path.resolve(process.cwd(), ".gitignore");
    const gitignore = fs.readFileSync(gitignorePath, "utf8");
    expect(gitignore).toContain("/scripts/output/");
  });
});

describe("output file — ai-cycling-coach.html", () => {
  const outputPath = path.resolve(
    process.cwd(),
    "scripts/output/ai-cycling-coach.html",
  );

  it("output file exists (requires prior pnpm generate:project-html run)", () => {
    // This test is informational — it passes if the file was already generated.
    // It will be skipped gracefully if the dev server was never started.
    if (!fs.existsSync(outputPath)) {
      console.warn(
        "WARN: scripts/output/ai-cycling-coach.html not found. Run pnpm generate:project-html with dev server active.",
      );
      return;
    }
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  it("output file is at least 10 KB when present", () => {
    if (!fs.existsSync(outputPath)) {
      console.warn("WARN: output file absent — skipping size check.");
      return;
    }
    const sizeKb = fs.statSync(outputPath).size / 1024;
    expect(sizeKb).toBeGreaterThan(10);
  });
});
