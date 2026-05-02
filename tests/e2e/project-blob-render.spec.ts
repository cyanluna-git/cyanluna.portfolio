import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

// The 12 blob-rendered slugs (excludes moru and smart-factory-qc which are hardcoded pages)
const BLOB_SLUGS: { slug: string; titleEn: string }[] = [
  { slug: "equipment-gateway", titleEn: "Equipment Gateway" },
  { slug: "resource-board", titleEn: "Engineering Resource Board" },
  { slug: "ai-cycling-coach", titleEn: "AI Cycling Coach" },
  { slug: "cpet-platform", titleEn: "CPET Platform" },
  { slug: "ride-analytics", titleEn: "Ride Analytics" },
  { slug: "today-bike", titleEn: "Today.Bike" },
  { slug: "personal-finance", titleEn: "Personal Finance Tracker" },
  { slug: "assist-hub", titleEn: "Assist Hub" },
  { slug: "assist-11th", titleEn: "aSSiST 11th Community" },
  { slug: "kanban-pipeline", titleEn: "AI Kanban Pipeline" },
  { slug: "code-review-suite", titleEn: "AI Code Review Suite" },
  { slug: "javis", titleEn: "Javis" },
];

test.beforeAll(() => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "E2E requires BLOB_READ_WRITE_TOKEN. Set it in .env.local or CI secrets.",
    );
  }
});

test.describe("blob-rendered project pages", () => {
  for (const { slug, titleEn } of BLOB_SLUGS) {
    test(`${slug} — iframe present and blob contains title`, async ({
      page,
      request,
    }) => {
      await page.goto(`/projects/${slug}`);

      const iframe = page.locator(`iframe[title="${slug}"]`);
      await expect(iframe).toBeVisible();

      const blobSrc = await iframe.getAttribute("src");
      expect(blobSrc).toBeTruthy();
      expect(blobSrc).toContain("blob.vercel-storage.com");

      const blobResponse = await request.get(blobSrc!);
      expect(blobResponse.ok()).toBe(true);
      const blobText = await blobResponse.text();
      expect(blobText).toContain(titleEn);
    });
  }
});
