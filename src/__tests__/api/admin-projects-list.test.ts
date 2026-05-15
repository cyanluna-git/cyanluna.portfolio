/**
 * Shield · GET /api/admin/projects Tests
 * Task #2814 — Auto-list uploaded HTML slugs on main page
 *
 * Covers:
 *   - 200 response with populated array when listUploadedProjects returns items
 *   - 200 response with empty array when listUploadedProjects returns []
 *   - 503 blob_unavailable when listUploadedProjects throws
 *   - Module exports: runtime = "nodejs", dynamic = "force-dynamic"
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/project-html-blob", () => ({
  listUploadedProjects: vi.fn(),
}));

import { listUploadedProjects } from "@/lib/project-html-blob";
import { GET, runtime, dynamic } from "@/app/api/admin/projects/route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SAMPLE_ITEMS = [
  {
    slug: "moru-scroll",
    title: "Moru Scroll",
    type: "pitch",
    uploadedAt: "2024-06-01T00:00:00Z",
    thumbnailUrl: "/api/og/lab?title=Moru+Scroll&type=pitch",
  },
  {
    slug: "ai-coach-demo",
    title: "AI Coach Demo",
    type: "demo",
    uploadedAt: "2024-05-15T00:00:00Z",
    thumbnailUrl: "/api/og/lab?title=AI+Coach+Demo&type=demo",
  },
];

// ---------------------------------------------------------------------------
// Runtime / dynamic exports
// ---------------------------------------------------------------------------

describe("GET /api/admin/projects — module exports", () => {
  it('exports runtime = "nodejs"', () => {
    expect(runtime).toBe("nodejs");
  });

  it('exports dynamic = "force-dynamic"', () => {
    expect(dynamic).toBe("force-dynamic");
  });
});

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe("GET /api/admin/projects — happy path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with the items array when listUploadedProjects returns items", async () => {
    vi.mocked(listUploadedProjects).mockResolvedValueOnce(SAMPLE_ITEMS as any);

    const res = await GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual(SAMPLE_ITEMS);
  });

  it("returns 200 with empty array when listUploadedProjects returns []", async () => {
    vi.mocked(listUploadedProjects).mockResolvedValueOnce([]);

    const res = await GET();

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });

  it("calls listUploadedProjects exactly once per request", async () => {
    vi.mocked(listUploadedProjects).mockResolvedValueOnce([]);

    await GET();

    expect(vi.mocked(listUploadedProjects)).toHaveBeenCalledTimes(1);
  });

  it("response body is a JSON array (typeof Array)", async () => {
    vi.mocked(listUploadedProjects).mockResolvedValueOnce(SAMPLE_ITEMS as any);

    const res = await GET();
    const body = await res.json();

    expect(Array.isArray(body)).toBe(true);
  });

  it("each item in response has slug, title, type, uploadedAt, thumbnailUrl", async () => {
    vi.mocked(listUploadedProjects).mockResolvedValueOnce(SAMPLE_ITEMS as any);

    const res = await GET();
    const body = await res.json();

    for (const item of body) {
      expect(typeof item.slug).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.type).toBe("string");
      expect(typeof item.uploadedAt).toBe("string");
      expect(typeof item.thumbnailUrl).toBe("string");
    }
  });
});

// ---------------------------------------------------------------------------
// Error path
// ---------------------------------------------------------------------------

describe("GET /api/admin/projects — error path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 503 when listUploadedProjects throws", async () => {
    vi.mocked(listUploadedProjects).mockRejectedValueOnce(new Error("Blob token missing"));

    const res = await GET();

    expect(res.status).toBe(503);
  });

  it("returns error code blob_unavailable on 503", async () => {
    vi.mocked(listUploadedProjects).mockRejectedValueOnce(new Error("storage failure"));

    const res = await GET();
    const body = await res.json() as { error: { code: string; message: string } };

    expect(body.error.code).toBe("blob_unavailable");
  });

  it("503 response includes a message field", async () => {
    vi.mocked(listUploadedProjects).mockRejectedValueOnce(new Error("BLOB_READ_WRITE_TOKEN missing"));

    const res = await GET();
    const body = await res.json() as { error: { code: string; message: string } };

    expect(typeof body.error.message).toBe("string");
    expect(body.error.message.length).toBeGreaterThan(0);
  });

  it("503 on any thrown error type (not just Error instances)", async () => {
    vi.mocked(listUploadedProjects).mockRejectedValueOnce("string error");

    const res = await GET();

    expect(res.status).toBe(503);
  });
});
