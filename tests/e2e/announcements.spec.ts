import { expect, test, type Page } from "@playwright/test";

test.describe("K-Startup announcements page", () => {
  test("loads the announcements page directly", async ({ page }) => {
    await page.goto("/privacy/announcements");
    await expect(page).toHaveURL("/privacy/announcements");
    await expect(
      page.getByRole("heading", { name: "K-Startup 사업공고 트래커" }),
    ).toBeVisible();
  });

  test("shows summary cards and section headings", async ({ page }) => {
    await page.goto("/privacy/announcements");

    await expect(page.getByText("Unread")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /마감 임박/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /맞춤 공고/ }),
    ).toBeVisible();
  });

  test("my filter toggle switches between on and off", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const filterBtn = page.locator("button", { hasText: "맞춤 필터" });
    await expect(filterBtn).toBeVisible();
    await expect(filterBtn).toContainText("ON");

    await filterBtn.click();
    await expect(filterBtn).toContainText("OFF");
  });

  test("search input exists and accepts text", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const searchInput = page.getByPlaceholder("공고명 검색...");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("테스트 검색어");
    await expect(searchInput).toHaveValue("테스트 검색어");
  });

  test("last checked button updates timestamp", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const lastChecked = page.getByText(/^Last checked:/);
    await expect(lastChecked).toBeVisible();

    await page.getByRole("button", { name: "오늘 확인 완료" }).click();
    await expect(lastChecked).not.toContainText("—");
  });

  test("last checked state persists across reload", async ({ page }) => {
    await page.goto("/privacy/announcements");

    await page.getByRole("button", { name: "오늘 확인 완료" }).click();
    const lastChecked = page.getByText(/^Last checked:/);
    await expect(lastChecked).not.toContainText("—");

    await page.reload();
    await expect(lastChecked).not.toContainText("—");
  });

  test("navigation link to founder programs exists", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const link = page.getByRole("link", { name: "Founder programs 보기" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/privacy/founder-programs");
  });
});
