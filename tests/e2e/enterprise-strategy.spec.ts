import { expect, test, type Page } from "@playwright/test";

test.describe("Enterprise strategy workspace", () => {
  test("loads directly without unlock", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");
    await expect(page).toHaveURL("/privacy/enterprise_strategy");
  });

  test("renders the main strategy sections", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");
    await expect(page).toHaveURL("/privacy/enterprise_strategy");
    await expect(
      page.getByRole("heading", { name: "Enterprise Strategy Workspace" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "2. Current proof vs strategy claims" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "3. Enterprise architecture framing" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "6. Review checklist" }),
    ).toBeVisible();
  });

  test("persists review checklist state across reload", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");

    const checkbox = page.getByRole("checkbox").first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await page.getByRole("button", { name: "Mark as reviewed today" }).click();
    await expect(page.getByText(/^Last reviewed:/)).not.toContainText("—");

    await page.reload();
    await expect(page).toHaveURL("/privacy/enterprise_strategy");
    await expect(page.getByRole("checkbox").first()).toBeChecked();
    await expect(page.getByText(/^Last reviewed:/)).not.toContainText("—");
  });

  test("shows related navigation links", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");

    await expect(
      page.getByRole("link", { name: "Founder programs" }),
    ).toHaveAttribute("href", "/privacy/founder-programs");
    await expect(
      page.getByRole("link", { name: "Career assessment" }),
    ).toHaveAttribute("href", "/privacy");
    await expect(
      page.getByRole("link", { name: "Smart Factory QC" }).first(),
    ).toHaveAttribute("href", "/projects/smart-factory-qc");
  });
});
