import { expect, test } from "@playwright/test";

test.describe("Refreshed homepage narrative", () => {
  test("loads the updated positioning and metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/AI-Native Problem Solver/);
    await expect(page.getByText("AI-Native Problem Solver")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /I turn messy operations, data bottlenecks, and industrial constraints into working systems\./,
      }),
    ).toBeVisible();
    await expect(
      page.getByText("OQC-EOB → Microsoft 365 / SAP (planned)"),
    ).toBeVisible();
  });

  test("keeps about and section navigation working", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(
      page.getByText("AI-native problem solving that scales into team change"),
    ).toBeVisible();

    await page.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(
      page.getByRole("heading", { name: "Projects" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "From Three Worlds to One Strategy" }),
    ).toBeVisible();
  });

  test("renders the new narrative blocks on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByText("AI-Native Problem Solver")).toBeVisible();

    await page
      .getByRole("heading", { name: "From Three Worlds to One Strategy" })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "From Three Worlds to One Strategy" }),
    ).toBeVisible();
    await expect(page.getByText("Enterprise direction")).toBeVisible();
  });
});
