import { type Page, type Locator, expect } from "@playwright/test";

export class ProjectPage {
  readonly page: Page;
  readonly backLink: Locator;
  readonly iframe: (slug: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.backLink = page.getByRole("link", { name: /back/i });
    this.iframe = (slug: string) => page.locator(`iframe[title="${slug}"]`);
  }

  async goto(slug: string) {
    await this.page.goto(`/projects/${slug}`);
    await expect(this.page.getByRole("main")).toBeVisible();
  }
}
