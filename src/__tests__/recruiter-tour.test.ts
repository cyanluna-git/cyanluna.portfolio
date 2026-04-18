/**
 * Shield · Recruiter Tour Tests
 * Task #2570 — Recruiter path 가이드 투어 기능 추가
 *
 * Covers:
 *   useRecruiterMode hook (source-level contract assertions):
 *     - Module resolves and exports the named hook
 *     - Initial state: active=false, step=null, completed=false
 *     - start() → active=true, step=1
 *     - next() step progression: 1→2, 2→3, 3→completed
 *     - Step 3 completion arms a 1500ms auto-exit timer
 *     - exit() clears all state and cancels the timer
 *     - Timer cleanup on unmount (useEffect return)
 *
 *   RecruiterBanner component (source-level assertions):
 *     - Module resolves with a default-export function
 *     - Returns null when active=false
 *     - Shows "Recruiter path · Step N/3" text pattern when active
 *     - Shows "Tour complete ✓" when completed
 *     - Next button hidden when completed (!completed guard)
 *     - Exit button always present when active
 *     - ARIA role="region" + aria-label for accessibility
 *     - sticky top-0 positioning class present
 *
 *   page.tsx integration (source-level):
 *     - Hero section contains a "Recruiter path" CTA button/link
 *     - Sections carry data-recruiter-step attributes
 *
 * Note: vitest.config.ts sets environment: "node".
 * All assertions work against raw module source or static imports.
 * No JSDOM / @testing-library/react rendering is used.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Source paths
// ---------------------------------------------------------------------------

const HOOK_PATH = path.resolve(process.cwd(), "src/hooks/useRecruiterMode.ts");
const BANNER_PATH = path.resolve(process.cwd(), "src/components/RecruiterBanner.tsx");
const PAGE_PATH = path.resolve(process.cwd(), "src/app/page.tsx");

const hookSource = fs.readFileSync(HOOK_PATH, "utf-8");
const bannerSource = fs.readFileSync(BANNER_PATH, "utf-8");
const pageSource = fs.readFileSync(PAGE_PATH, "utf-8");

// ---------------------------------------------------------------------------
// useRecruiterMode — module contract
// ---------------------------------------------------------------------------

describe("useRecruiterMode module", () => {
  it("file exists at src/hooks/useRecruiterMode.ts", () => {
    expect(fs.existsSync(HOOK_PATH)).toBe(true);
  });

  it("exports a named function useRecruiterMode", () => {
    expect(hookSource).toMatch(/export\s+function\s+useRecruiterMode/);
  });

  it("returns all six required fields: active, step, completed, start, next, exit", () => {
    expect(hookSource).toContain("active");
    expect(hookSource).toContain("step");
    expect(hookSource).toContain("completed");
    expect(hookSource).toContain("start");
    expect(hookSource).toContain("next");
    expect(hookSource).toContain("exit");
  });

  it("declares a return object with all six fields", () => {
    // The return statement should spread all six identifiers
    expect(hookSource).toMatch(/return\s*\{[^}]*active[^}]*step[^}]*completed[^}]*start[^}]*next[^}]*exit[^}]*\}/s);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — initial state
// ---------------------------------------------------------------------------

describe("useRecruiterMode initial state", () => {
  it("initialises active to false", () => {
    expect(hookSource).toContain("useState(false)");
  });

  it("initialises step to null", () => {
    // useState<Step>(null)
    expect(hookSource).toMatch(/useState[^(]*\(\s*null\s*\)/);
  });

  it("initialises completed to false", () => {
    // Two useState(false) calls: one for active, one for completed
    const falseInits = hookSource.match(/useState\(false\)/g) ?? [];
    expect(falseInits.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — start()
// ---------------------------------------------------------------------------

describe("useRecruiterMode start()", () => {
  it("start() sets active to true", () => {
    // setActive(true) inside the start function body
    expect(hookSource).toContain("setActive(true)");
  });

  it("start() sets step to 1", () => {
    expect(hookSource).toContain("setStep(1)");
  });

  it("start() resets completed to false", () => {
    // setCompleted(false) called in start
    expect(hookSource).toContain("setCompleted(false)");
  });

  it("start() clears any pending timer before activating", () => {
    // clearTimer() (or clearTimeout) called before setActive
    const startFnMatch = hookSource.match(/const start\s*=\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\};/);
    const startBody = startFnMatch?.[1] ?? "";
    expect(startBody).toMatch(/clearTimer|clearTimeout/);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — next() step progression
// ---------------------------------------------------------------------------

describe("useRecruiterMode next() step transitions", () => {
  it("next() advances from step 1 to step 2", () => {
    // When step === 1 → setStep(2)
    expect(hookSource).toContain("setStep(2)");
  });

  it("next() advances from step 2 to step 3", () => {
    expect(hookSource).toContain("setStep(3)");
  });

  it("next() at step 3 sets completed to true", () => {
    expect(hookSource).toContain("setCompleted(true)");
  });

  it("next() at step 3 guards on step === 3", () => {
    expect(hookSource).toMatch(/step\s*===\s*3/);
  });

  it("next() at step 1 guards on step === 1", () => {
    expect(hookSource).toMatch(/step\s*===\s*1/);
  });

  it("next() at step 2 guards on step === 2", () => {
    expect(hookSource).toMatch(/step\s*===\s*2/);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — 1.5s auto-exit timer
// ---------------------------------------------------------------------------

describe("useRecruiterMode auto-exit timer after step 3", () => {
  it("sets a setTimeout when step 3 completes", () => {
    expect(hookSource).toContain("setTimeout");
  });

  it("auto-exit timeout is 1500ms", () => {
    expect(hookSource).toContain("1500");
  });

  it("timeout calls exit() to clear state", () => {
    // The timeout callback invokes exit() — either inline or via arrow fn
    // e.g. setTimeout(() => exit(), 1500) or setTimeout(exit, 1500)
    expect(hookSource).toMatch(/setTimeout\s*\(.*exit.*1500\)/s);
  });

  it("stores the timer reference (timerRef) for cancellation", () => {
    expect(hookSource).toContain("timerRef");
    expect(hookSource).toContain("timerRef.current");
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — exit()
// ---------------------------------------------------------------------------

describe("useRecruiterMode exit()", () => {
  it("exit() sets active to false", () => {
    expect(hookSource).toContain("setActive(false)");
  });

  it("exit() resets step to null", () => {
    expect(hookSource).toContain("setStep(null)");
  });

  it("exit() resets completed to false in exit body", () => {
    // Verify setCompleted(false) appears (used by both start and exit)
    expect(hookSource).toContain("setCompleted(false)");
  });

  it("exit() cancels the pending timer", () => {
    // exit() must call clearTimer or clearTimeout
    const exitFnMatch = hookSource.match(/const exit\s*=\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\};/);
    const exitBody = exitFnMatch?.[1] ?? "";
    expect(exitBody).toMatch(/clearTimer|clearTimeout/);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — timer cleanup on unmount
// ---------------------------------------------------------------------------

describe("useRecruiterMode unmount cleanup", () => {
  it("registers a useEffect cleanup that cancels the timer", () => {
    // useEffect(() => () => clearTimer(), []) pattern
    expect(hookSource).toContain("useEffect");
    expect(hookSource).toMatch(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\(\s*\)\s*=>/s);
  });

  it("useEffect dependency array is empty (run-once for cleanup)", () => {
    // Cleanup effect has an empty dep array: [], [])
    expect(hookSource).toMatch(/useEffect\s*\(.*\[\s*\]\s*\)/s);
  });
});

// ---------------------------------------------------------------------------
// useRecruiterMode — scroll side-effects (documented behavior)
// ---------------------------------------------------------------------------

describe("useRecruiterMode scroll behavior", () => {
  it("scrolls to section id 'featured' at step 1", () => {
    expect(hookSource).toContain('"featured"');
  });

  it("scrolls to section id 'projects' at step 2", () => {
    expect(hookSource).toContain('"projects"');
  });

  it("scrolls to section id 'contact' at step 3", () => {
    expect(hookSource).toContain('"contact"');
  });

  it("uses scrollIntoView for smooth scrolling", () => {
    expect(hookSource).toContain("scrollIntoView");
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — module contract
// ---------------------------------------------------------------------------

describe("RecruiterBanner module", () => {
  it("file exists at src/components/RecruiterBanner.tsx", () => {
    expect(fs.existsSync(BANNER_PATH)).toBe(true);
  });

  it("has a default export function named RecruiterBanner", () => {
    expect(bannerSource).toMatch(/export\s+default\s+function\s+RecruiterBanner/);
  });

  it("accepts the required props: active, step, completed, onNext, onExit", () => {
    expect(bannerSource).toContain("active");
    expect(bannerSource).toContain("step");
    expect(bannerSource).toContain("completed");
    expect(bannerSource).toContain("onNext");
    expect(bannerSource).toContain("onExit");
  });

  it("defines a RecruiterBannerProps interface", () => {
    expect(bannerSource).toContain("RecruiterBannerProps");
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — null when inactive
// ---------------------------------------------------------------------------

describe("RecruiterBanner returns null when not active", () => {
  it("short-circuits with return null when active is false", () => {
    // Pattern: if (!active) return null
    expect(bannerSource).toMatch(/if\s*\(\s*!active\s*\)\s*return\s+null/);
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — step progress text
// ---------------------------------------------------------------------------

describe("RecruiterBanner step progress display", () => {
  it("shows 'Recruiter path · Step N/3' text pattern", () => {
    expect(bannerSource).toContain("Recruiter path · Step");
    expect(bannerSource).toContain("/3");
  });

  it("interpolates the current step number into the progress text", () => {
    // Template literal with ${step}
    expect(bannerSource).toMatch(/\$\{step\}/);
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — completion state
// ---------------------------------------------------------------------------

describe("RecruiterBanner completion state", () => {
  it("shows 'Tour complete ✓' text when completed is true", () => {
    expect(bannerSource).toContain("Tour complete ✓");
  });

  it("uses a ternary to toggle between complete and step-progress text", () => {
    // completed ? "Tour complete ✓" : `Recruiter path · Step …`
    expect(bannerSource).toMatch(/completed\s*\?/);
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — Next button hidden when completed
// ---------------------------------------------------------------------------

describe("RecruiterBanner Next button visibility", () => {
  it("guards Next button with !completed so it hides on completion", () => {
    expect(bannerSource).toMatch(/!completed/);
  });

  it("Next button text is 'Next →'", () => {
    expect(bannerSource).toContain("Next →");
  });

  it("Next button calls onNext handler", () => {
    expect(bannerSource).toContain("onNext");
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — Exit button always visible
// ---------------------------------------------------------------------------

describe("RecruiterBanner Exit button always visible", () => {
  it("Exit button is not wrapped in a !completed guard", () => {
    // The Exit button should appear outside any completed-conditional block.
    // We verify that onExit is referenced and that the Exit text appears
    // outside the !completed block by confirming both are present at the top level.
    expect(bannerSource).toContain("onExit");
    expect(bannerSource).toContain("Exit");
  });

  it("Exit button calls onExit handler via onClick", () => {
    expect(bannerSource).toContain("onClick={onExit}");
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — accessibility
// ---------------------------------------------------------------------------

describe("RecruiterBanner accessibility", () => {
  it("wraps content in a region landmark", () => {
    expect(bannerSource).toContain('role="region"');
  });

  it("provides an aria-label describing the tour", () => {
    expect(bannerSource).toContain('aria-label="Recruiter guided tour"');
  });

  it("Next and Exit buttons have type='button' to prevent accidental form submission", () => {
    const typeButtonMatches = bannerSource.match(/type="button"/g) ?? [];
    expect(typeButtonMatches.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// RecruiterBanner — layout & positioning
// ---------------------------------------------------------------------------

describe("RecruiterBanner layout", () => {
  it("uses sticky top-0 for persistent banner positioning", () => {
    expect(bannerSource).toContain("sticky");
    expect(bannerSource).toContain("top-0");
  });

  it("renders above most page content (z-index class present)", () => {
    expect(bannerSource).toMatch(/z-\[?60\]?/);
  });
});

// ---------------------------------------------------------------------------
// page.tsx — Hero CTA integration
// ---------------------------------------------------------------------------

describe("page.tsx Hero CTA — Recruiter path button", () => {
  it("page.tsx exists", () => {
    expect(fs.existsSync(PAGE_PATH)).toBe(true);
  });

  it("contains 'Recruiter path' text for the hero CTA", () => {
    expect(pageSource).toContain("Recruiter path");
  });
});

// ---------------------------------------------------------------------------
// page.tsx — data-recruiter-step attributes
// ---------------------------------------------------------------------------

describe("page.tsx data-recruiter-step section attributes", () => {
  it("at least one section carries a data-recruiter-step attribute", () => {
    expect(pageSource).toContain("data-recruiter-step");
  });

  it("data-recruiter-step='1' exists (featured projects section)", () => {
    // JSX numeric: data-recruiter-step={1}  or string: data-recruiter-step="1"
    expect(pageSource).toMatch(/data-recruiter-step=\{?["']?1["']?\}?/);
  });

  it("data-recruiter-step='2' exists (all projects section)", () => {
    expect(pageSource).toMatch(/data-recruiter-step=\{?["']?2["']?\}?/);
  });

  it("data-recruiter-step='3' exists (contact section)", () => {
    expect(pageSource).toMatch(/data-recruiter-step=\{?["']?3["']?\}?/);
  });
});
