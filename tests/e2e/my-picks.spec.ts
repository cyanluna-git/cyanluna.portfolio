import { expect, test, type Page } from "@playwright/test";

test.describe("My Picks page", () => {
  test("loads page and shows empty state when no picks", async ({ page }) => {
    await page.goto("/privacy/my-picks");
    await expect(page).toHaveURL("/privacy/my-picks");
    await expect(
      page.getByRole("heading", { name: "내 지원 현황" }),
    ).toBeVisible();
    await expect(page.getByText("아직 Pick한 공고가 없습니다")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /사업공고 트래커에서/ }),
    ).toBeVisible();
  });

  test("shows summary cards with zero counts", async ({ page }) => {
    await page.goto("/privacy/my-picks");

    await expect(page.getByRole("heading", { name: /현황 요약/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /지원예정/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /지원완료/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /결과/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /관심 목록/ })).toBeVisible();
  });

  test("navigation links to announcements and founder programs", async ({
    page,
  }) => {
    await page.goto("/privacy/my-picks");

    const announcementsLink = page.getByRole("link", { name: "사업공고 트래커", exact: true });
    await expect(announcementsLink).toBeVisible();
    await expect(announcementsLink).toHaveAttribute("href", "/privacy/announcements");

    const founderLink = page.getByRole("link", { name: "Founder programs" });
    await expect(founderLink).toBeVisible();
    await expect(founderLink).toHaveAttribute("href", "/privacy/founder-programs");
  });
});

test.describe("Pick flow: announcements → my-picks", () => {
  test("pick button appears on announcement cards", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const pickButtons = page.locator("button", { hasText: "Pick" });
    await expect(pickButtons.first()).toBeVisible();
  });

  test("pick button toggles between Pick and Picked", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const firstPickBtn = page.locator("button", { hasText: "Pick" }).first();
    await expect(firstPickBtn).toBeVisible();
    await firstPickBtn.click();

    await expect(firstPickBtn).toContainText("Picked");

    await firstPickBtn.click();
    await expect(firstPickBtn).toContainText("Pick");
    await expect(firstPickBtn).not.toContainText("Picked");
  });

  test("picked card shows status selector buttons", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const firstPickBtn = page.locator("button", { hasText: "Pick" }).first();
    await firstPickBtn.click();

    await expect(page.locator("button", { hasText: "관심" }).first()).toBeVisible();
    await expect(page.locator("button", { hasText: "지원예정" }).first()).toBeVisible();
    await expect(page.locator("button", { hasText: "지원완료" }).first()).toBeVisible();
  });

  test("pick state persists across reload", async ({ page }) => {
    await page.goto("/privacy/announcements");

    const firstPickBtn = page.locator("button", { hasText: "Pick" }).first();
    await firstPickBtn.click();
    await expect(firstPickBtn).toContainText("Picked");

    await page.reload();
    const pickedBtn = page.locator("button", { hasText: "Picked" }).first();
    await expect(pickedBtn).toBeVisible();
  });
});
