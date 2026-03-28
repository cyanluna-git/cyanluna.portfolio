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
      page.getByRole("heading", { name: "엔터프라이즈 전략 워크스페이스" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "2. 포지셔닝 평가" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "4. 엔터프라이즈 구조 프레이밍" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "7. 검토 체크리스트" }),
    ).toBeVisible();
  });

  test("persists review checklist state across reload", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");

    const checkbox = page.getByRole("checkbox").first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await page.getByRole("button", { name: "오늘 검토 완료" }).click();
    await expect(page.getByText(/^마지막 검토:/)).not.toContainText("—");

    await page.reload();
    await expect(page).toHaveURL("/privacy/enterprise_strategy");
    await expect(page.getByRole("checkbox").first()).toBeChecked();
    await expect(page.getByText(/^마지막 검토:/)).not.toContainText("—");
  });

  test("shows related navigation links", async ({ page }) => {
    await page.goto("/privacy/enterprise_strategy");

    await expect(
      page.getByRole("link", { name: "창업 프로그램" }),
    ).toHaveAttribute("href", "/privacy/founder-programs");
    await expect(
      page.getByRole("link", { name: "커리어 진단" }),
    ).toHaveAttribute("href", "/privacy");
    await expect(
      page.getByRole("link", { name: "Smart Factory QC" }).first(),
    ).toHaveAttribute("href", "/projects/smart-factory-qc");
  });
});
