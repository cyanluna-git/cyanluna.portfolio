import { type Page, type Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly skipLink: Locator;
  readonly hamburgerButton: Locator;
  readonly mainContent: Locator;
  readonly resultCount: Locator;
  readonly browseSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.skipLink = page.getByText("Skip to main content");
    this.hamburgerButton = page.getByRole("button", { name: /open menu/i });
    this.mainContent = page.locator("#main-content");
    this.resultCount = page.locator("[aria-live='polite']");
    this.browseSection = page.getByRole("heading", { name: /Browse All Work/ });
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.page.getByRole("main")).toBeVisible();
  }

  async filterByTrack(testId: string) {
    await this.page.getByTestId(`track-filter-${testId}`).click();
    await expect(this.resultCount).toBeAttached();
  }

  async clickGuidedPath(name: string) {
    await this.page.getByTestId(`guided-path-${name}`).click();
    await expect(this.browseSection).toBeVisible();
  }
}
