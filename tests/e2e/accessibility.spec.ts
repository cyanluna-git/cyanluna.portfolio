import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

test.describe("Keyboard & A11y", () => {
  test("skip link appears on first Tab", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.keyboard.press("Tab");
    await expect(home.skipLink).toBeVisible();
  });

  test("skip link navigates to main content", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(home.mainContent).toBeFocused();
  });

  test("aria-live region exists for filter results", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(home.resultCount).toBeAttached();
  });

  test("filter by track updates result count text", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.filterByTrack("ai");
    await expect(home.resultCount).toContainText(/\d/);
  });

  test("mobile menu opens on hamburger click", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const home = new HomePage(page);
    await home.goto();
    await home.hamburgerButton.click();
    await expect(
      page.getByRole("button", { name: /close menu/i }),
    ).toBeVisible();
  });

  test("focus ring visible on first focused element", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });

  test("page has accessible title", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(page).toHaveTitle(/.+/);
  });
});
