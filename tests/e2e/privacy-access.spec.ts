import { expect, test, type Page } from "@playwright/test";

const VALID_KEY = "QG4udkyfg9ZDtCJZIJmg7SE5oakNuV6NaP9Jvp9oQeg=";
const INVALID_KEY = "ZmFrZS1rZXk=";

async function unlock(page: Page, next?: string) {
  const target = next ? `/privacy/unlock?next=${encodeURIComponent(next)}` : "/privacy/unlock";
  await page.goto(target);
  await page.getByLabel("Access Key").fill(VALID_KEY);
  await page.getByRole("button", { name: "Unlock privacy workspace" }).click();
}

test.describe("privacy workspace access", () => {
  test("redirects deep links to unlock and rejects an invalid key", async ({ page }) => {
    await page.goto("/privacy/founder-programs");

    await expect(page).toHaveURL(/\/privacy\/unlock\?next=%2Fprivacy%2Ffounder-programs$/);
    await expect(
      page.getByRole("heading", { name: "Base64 key required" }),
    ).toBeVisible();

    await page.getByLabel("Access Key").fill(INVALID_KEY);
    await page.getByRole("button", { name: "Unlock privacy workspace" }).click();

    await expect(page.getByText("Base64 access key가 일치하지 않습니다.")).toBeVisible();
    await expect(page).toHaveURL(/\/privacy\/unlock/);
  });

  test("unlocks the founder workspace, persists state, and relocks on logout", async ({
    page,
  }) => {
    await unlock(page, "/privacy/founder-programs");

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

    await page.goto("/privacy");
    await expect(page).toHaveURL("/privacy");

    await page.getByRole("button", { name: "Lock workspace" }).click();
    await expect(page).toHaveURL("/privacy/unlock");

    await page.goto("/privacy/founder-programs");
    await expect(page).toHaveURL(/\/privacy\/unlock\?next=%2Fprivacy%2Ffounder-programs$/);
  });
});
