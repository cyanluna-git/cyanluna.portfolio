import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mocks must be hoisted before the module under test is imported.
vi.mock("@/lib/project-html-blob", () => ({
  getProjectHtmlUrl: vi.fn(),
  getProjectMeta: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/data/project-details", () => ({
  getProjectDetail: vi.fn(),
  getAllProjectSlugs: vi.fn(() => []),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

import { getProjectHtmlUrl } from "@/lib/project-html-blob";
import { getProjectDetail } from "@/data/project-details";
import { notFound } from "next/navigation";
import ProjectPage, { generateMetadata } from "@/app/projects/[slug]/page";
import ProjectDetailClient from "@/app/projects/[slug]/ProjectDetailClient";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BLOB_URL = "https://blob.vercel-storage.com/portfolio-html/test-project.html";
const SLUG = "test-project";

const MOCK_PROJECT = {
  title: { en: "Test Project", ko: "테스트 프로젝트" },
  tagline: { en: "A test tagline", ko: "테스트 태그라인" },
};

function makeParams(slug: string = SLUG) {
  return { params: Promise.resolve({ slug }), searchParams: Promise.resolve({}) };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// ProjectPage tests
// ---------------------------------------------------------------------------

describe("ProjectPage", () => {
  // AC2: blob URL + detail → iframe (blob wins)
  it("returns iframe when blob URL exists, even if detail also exists", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(BLOB_URL);
    vi.mocked(getProjectDetail).mockReturnValue(MOCK_PROJECT as never);

    const result = await ProjectPage(makeParams());

    expect(result.type).toBe("iframe");
  });

  // AC3: blob URL + no detail → iframe
  it("returns iframe when blob URL exists and no detail", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(BLOB_URL);
    vi.mocked(getProjectDetail).mockReturnValue(undefined);

    const result = await ProjectPage(makeParams());

    expect(result.type).toBe("iframe");
  });

  // AC7: iframe attrs assertion
  it("renders iframe with correct sandbox, title, and full-viewport style", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(BLOB_URL);
    vi.mocked(getProjectDetail).mockReturnValue(undefined);

    const result = await ProjectPage(makeParams());

    expect(result.type).toBe("iframe");
    expect(result.props.src).toBe(`/api/projects/${SLUG}/html`);
    expect(result.props.sandbox).toBe("allow-scripts");
    expect(result.props.title).toBe(SLUG);
    expect(result.props.style.position).toBe("fixed");
    expect(result.props.style.inset).toBe(0);
    expect(result.props.style.width).toBe("100vw");
    expect(result.props.style.height).toBe("100vh");
    expect(result.props.style.border).toBe(0);
  });

  // AC4: no blob + detail → ProjectDetailClient (regression)
  it("returns ProjectDetailClient when no blob but detail exists", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(null);
    vi.mocked(getProjectDetail).mockReturnValue(MOCK_PROJECT as never);

    const result = await ProjectPage(makeParams());

    expect(result.type).toBe(ProjectDetailClient);
    expect(result.props.project).toBe(MOCK_PROJECT);
  });

  // AC5: no blob + no detail → notFound()
  it("calls notFound() when both blob and detail are absent", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(null);
    vi.mocked(getProjectDetail).mockReturnValue(undefined);

    await expect(ProjectPage(makeParams())).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  // AC6: getProjectHtmlUrl throws + detail → ProjectDetailClient + console.error called
  it("falls back to detail and logs error when getProjectHtmlUrl throws", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(getProjectHtmlUrl).mockRejectedValue(new Error("Network failure"));
    vi.mocked(getProjectDetail).mockReturnValue(MOCK_PROJECT as never);

    const result = await ProjectPage(makeParams());

    expect(result.type).toBe(ProjectDetailClient);
    expect(consoleSpy).toHaveBeenCalledOnce();
  });

  // AC6 variant: getProjectHtmlUrl throws + no detail → notFound()
  it("calls notFound() when getProjectHtmlUrl throws and no detail exists", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(getProjectHtmlUrl).mockRejectedValue(new Error("Network failure"));
    vi.mocked(getProjectDetail).mockReturnValue(undefined);

    await expect(ProjectPage(makeParams())).rejects.toThrow("NEXT_NOT_FOUND");
  });

  // lang param is respected in detail branch
  it("passes initialLang 'ko' to ProjectDetailClient when lang=ko", async () => {
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(null);
    vi.mocked(getProjectDetail).mockReturnValue(MOCK_PROJECT as never);

    const result = await ProjectPage({
      params: Promise.resolve({ slug: SLUG }),
      searchParams: Promise.resolve({ lang: "ko" }),
    });

    expect(result.type).toBe(ProjectDetailClient);
    expect(result.props.initialLang).toBe("ko");
  });
});

// ---------------------------------------------------------------------------
// generateMetadata tests
// ---------------------------------------------------------------------------

describe("generateMetadata", () => {
  // AC8a: detail present (regardless of blob) → full detail metadata
  it("returns full detail metadata when detail exists (blob irrelevant)", async () => {
    vi.mocked(getProjectDetail).mockReturnValue(MOCK_PROJECT as never);

    const meta = await generateMetadata({ params: Promise.resolve({ slug: SLUG }) });

    expect(meta).toMatchObject({
      title: MOCK_PROJECT.title.en,
      description: MOCK_PROJECT.tagline.en,
    });
    expect(meta).toHaveProperty("openGraph");
    expect(meta).toHaveProperty("twitter");
    expect(meta).toHaveProperty("alternates");
    // getProjectHtmlUrl should NOT be called since detail check short-circuits
    expect(getProjectHtmlUrl).not.toHaveBeenCalled();
  });

  // AC8b: blob + no detail → title from meta (or slug fallback) + openGraph/twitter/alternates
  it("returns full blob metadata when blob exists but no detail", async () => {
    vi.mocked(getProjectDetail).mockReturnValue(undefined);
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(BLOB_URL);

    const meta = await generateMetadata({ params: Promise.resolve({ slug: SLUG }) });

    expect(meta).toMatchObject({
      title: SLUG,
      openGraph: { type: "article" },
      twitter: { card: "summary_large_image" },
      alternates: { canonical: `https://cyanluna.com/projects/${SLUG}` },
    });
  });

  // AC8c: no blob + no detail → { title: "Project Not Found" }
  it("returns { title: 'Project Not Found' } when neither blob nor detail exists", async () => {
    vi.mocked(getProjectDetail).mockReturnValue(undefined);
    vi.mocked(getProjectHtmlUrl).mockResolvedValue(null);

    const meta = await generateMetadata({ params: Promise.resolve({ slug: SLUG }) });

    expect(meta).toEqual({ title: "Project Not Found" });
  });

  // AC8d: getProjectHtmlUrl throws in metadata → falls back to "Project Not Found"
  it("returns { title: 'Project Not Found' } when getProjectHtmlUrl throws and no detail", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(getProjectDetail).mockReturnValue(undefined);
    vi.mocked(getProjectHtmlUrl).mockRejectedValue(new Error("Auth error"));

    const meta = await generateMetadata({ params: Promise.resolve({ slug: SLUG }) });

    expect(meta).toEqual({ title: "Project Not Found" });
  });
});
