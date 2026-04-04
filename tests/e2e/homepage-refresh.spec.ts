import { expect, test } from "@playwright/test";

test.describe("Curated homepage discovery", () => {
  test("loads the updated positioning and curated entry", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/AI-Native Problem Solver/);
    await expect(page.getByText("AI-Native Problem Solver")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /I turn messy operations, data bottlenecks, and industrial constraints into working systems\./,
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Pick the lens that matches what you want to validate first\./ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Three projects that explain the portfolio faster than a long bio\./ })).toBeVisible();
  });

  test("guides users into featured work and browse filters", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("guided-path-enterprise").getByRole("button", { name: "Focus on enterprise systems" }).click();
    await expect(page.getByRole("heading", { name: "Browse All Work" })).toBeVisible();
    await expect(page.getByText("Current track: Enterprise Systems")).toBeVisible();

    await page.getByTestId("featured-project-smart-factory-qc").click();
    await expect(page).toHaveURL(/\/projects\/smart-factory-qc$/);

    await page.goto("/");
    await page.getByTestId("track-filter-ai").click();
    await expect(page.getByText("Current track: AI Tooling")).toBeVisible();
    await expect(page.getByRole("link", { name: /AI Tooling Agentic AI Kanban Pipeline/ })).toBeVisible();
  });

  test("keeps navigation and curated sections readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByText("AI-Native Problem Solver")).toBeVisible();
    await page.getByRole("heading", { name: /Pick the lens that matches what you want to validate first\./ }).scrollIntoViewIfNeeded();
    await expect(page.getByTestId("guided-path-ai")).toBeVisible();
    await page.getByRole("heading", { name: "Browse All Work" }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "Browse All Work" })).toBeVisible();
  });
});
