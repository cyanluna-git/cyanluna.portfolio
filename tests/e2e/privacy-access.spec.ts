import { expect, test, type Page } from "@playwright/test";

test.describe("privacy workspace access", () => {
  test("loads the privacy landing page directly", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page).toHaveURL("/privacy");
    await expect(
      page.getByRole("heading", { name: "Career Assessment & Strategy" }),
    ).toBeVisible();
  });

  test("loads the founder workspace directly and persists state", async ({
    page,
  }) => {
    await page.goto("/privacy/founder-programs");
    await expect(page).toHaveURL("/privacy/founder-programs");
    await expect(
      page.getByRole("heading", { name: "Founder Program Strategy Workspace" }),
    ).toBeVisible();

    const templateCheckbox = page.locator("#documents").getByRole("checkbox", {
      name: /공통 사업계획서 코어/,
    });
    await templateCheckbox.check();
    await expect(templateCheckbox).toBeChecked();

    await page.getByRole("button", { name: "Mark as reviewed today" }).click();
    await expect(page.getByText(/^Last reviewed:/)).not.toContainText("—");

    await page.reload();
    await expect(page).toHaveURL("/privacy/founder-programs");
    await expect(templateCheckbox).toBeChecked();
    await expect(page.getByText(/^Last reviewed:/)).not.toContainText("—");
  });
});
