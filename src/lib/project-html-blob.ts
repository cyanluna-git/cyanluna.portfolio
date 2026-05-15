/**
 * Server-only. Callers (route handlers, server components) MUST run on the
 * Node runtime — `@vercel/blob` is not Edge-safe. `BLOB_READ_WRITE_TOKEN` is
 * read by the SDK; this module does not validate it.
 */

import { BlobNotFoundError, type PutBlobResult, del, head, list, put } from "@vercel/blob";

// Must stay in sync with the page.tsx folders under src/app/projects/<slug>/
export const BLOB_PREFIX = "portfolio-html/";

/**
 * Slugs that are served from hardcoded Next.js routes under src/app/projects/.
 * If you add a new route folder with its own page.tsx, add the slug here too.
 */
export const HARDCODED_SLUGS: readonly string[] = [];

/** Accepts lowercase alphanumeric slugs with hyphens, 1–64 characters. */
export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

/** Returns true when slug matches the allowed pattern. No normalization is performed. */
export function validateSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

/** Returns true when slug belongs to a hardcoded Next.js route. */
export function isHardcodedSlug(slug: string): boolean {
  return (HARDCODED_SLUGS as readonly string[]).includes(slug);
}

/** Returns the blob pathname for a given slug. */
export function getBlobKey(slug: string): string {
  return `${BLOB_PREFIX}${slug}.html`;
}

// ---------------------------------------------------------------------------
// Metadata types and helpers
// ---------------------------------------------------------------------------

/** Allowed project type values for the Lab section. */
export type ProjectType = "pitch" | "report" | "demo" | "lab";

const VALID_PROJECT_TYPES: readonly ProjectType[] = ["pitch", "report", "demo", "lab"];

/** Returns true when value is a valid ProjectType. */
export function isValidProjectType(value: unknown): value is ProjectType {
  return typeof value === "string" && (VALID_PROJECT_TYPES as readonly string[]).includes(value);
}

/**
 * Metadata stored alongside each uploaded HTML blob as a `.meta.json` sidecar.
 * @vercel/blob@2.3.3 has no native metadata field — sidecar blobs are the only option.
 */
export interface ProjectMeta {
  title: string;
  type: ProjectType;
  uploadedAt: string; // ISO 8601
}

/**
 * Summary returned by listUploadedProjects — suitable for the Lab section API response.
 */
export interface UploadedProjectSummary {
  slug: string;
  title: string;
  type: ProjectType;
  uploadedAt: string; // ISO 8601
  /** Relative URL for client-side <img src> only — do NOT fetch server-side. */
  thumbnailUrl: string;
}

const META_SUFFIX = ".meta.json";

/** Returns the blob pathname for the sidecar metadata of a given slug. */
export function getMetaBlobKey(slug: string): string {
  return `${BLOB_PREFIX}${slug}${META_SUFFIX}`;
}

/**
 * Converts a slug to a human-readable title by splitting on hyphens and
 * capitalising each word. E.g. "moru-scroll" → "Moru Scroll".
 */
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Saves metadata for a slug as a companion `.meta.json` blob.
 *
 * - Requires Node runtime (calls @vercel/blob `put`).
 * - Throws on invalid slug; other errors propagate to caller.
 * - Uses `addRandomSuffix: false, allowOverwrite: true` so re-uploads replace
 *   the previous meta file cleanly.
 */
export async function putProjectMeta(slug: string, meta: ProjectMeta): Promise<void> {
  if (!validateSlug(slug)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
  await put(getMetaBlobKey(slug), JSON.stringify(meta), {
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    access: "public",
  });
}

/**
 * Retrieves the metadata for a slug from its companion `.meta.json` blob.
 *
 * - Requires Node runtime (calls @vercel/blob `head`, then fetches the URL).
 * - Returns `null` when the sidecar does not exist (BlobNotFoundError) or
 *   when the content is not valid JSON / does not match the expected shape.
 * - Any other storage error is re-thrown.
 */
export async function getProjectMeta(slug: string): Promise<ProjectMeta | null> {
  let blobUrl: string;
  try {
    const result = await head(getMetaBlobKey(slug));
    blobUrl = result.url;
  } catch (err: unknown) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }

  try {
    const res = await fetch(blobUrl);
    if (!res.ok) return null;
    const raw: unknown = await res.json();
    if (
      raw !== null &&
      typeof raw === "object" &&
      typeof (raw as Record<string, unknown>).title === "string" &&
      isValidProjectType((raw as Record<string, unknown>).type) &&
      typeof (raw as Record<string, unknown>).uploadedAt === "string"
    ) {
      return raw as ProjectMeta;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Lists all uploaded HTML projects and their metadata.
 *
 * - Requires Node runtime (calls @vercel/blob `list` and `head`/fetch for each meta).
 * - Filters to `.html` blobs only (excludes `.meta.json` sidecars).
 * - Excludes hardcoded slugs (those served by Next.js filesystem routes).
 * - For slugs without a `.meta.json`, falls back to `{ title: formatSlug(slug), type: "lab" }`.
 * - Returns items sorted by `uploadedAt` descending (most recent first).
 * - `thumbnailUrl` is a relative `/api/og/lab?...` path for client-side `<img src>` only;
 *   do NOT fetch this on the server.
 */
export async function listUploadedProjects(): Promise<UploadedProjectSummary[]> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });

  // Defensive double-filter: include only .html, exclude .meta.json sidecars
  const htmlBlobs = blobs.filter(
    (b) => b.pathname.endsWith(".html") && !b.pathname.endsWith(".meta.json"),
  );

  // Extract slug from pathname like "portfolio-html/my-project.html"
  const entries = htmlBlobs.map((b) => {
    const filename = b.pathname.slice(BLOB_PREFIX.length); // "my-project.html"
    const slug = filename.slice(0, -5); // remove ".html"
    return { slug, htmlBlob: b };
  });

  // Exclude hardcoded slugs
  const filtered = entries.filter(({ slug }) => !isHardcodedSlug(slug));

  // Parallel meta fetch
  const metas = await Promise.all(filtered.map(({ slug }) => getProjectMeta(slug)));

  const summaries: UploadedProjectSummary[] = filtered.map(({ slug, htmlBlob }, i) => {
    const meta = metas[i];
    const title = meta?.title ?? formatSlug(slug);
    const type: ProjectType = meta?.type ?? "lab";
    // Prefer meta.uploadedAt; fall back to the .html blob's uploadedAt
    const uploadedAt = meta?.uploadedAt ?? htmlBlob.uploadedAt.toISOString();
    const thumbnailUrl = `/api/og/lab?title=${encodeURIComponent(title)}&type=${type}`;
    return { slug, title, type, uploadedAt, thumbnailUrl };
  });

  // Sort newest first
  return summaries.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

/**
 * Uploads HTML content for a slug to Vercel Blob.
 *
 * Throws if:
 * - slug fails pattern validation
 * - slug is a hardcoded route (those are served from the filesystem, not blob)
 *
 * Caller is responsible for Node runtime guarantee.
 */
export async function putProjectHtml(
  slug: string,
  body: Blob | ArrayBuffer | Buffer | string,
): Promise<{ url: string; pathname: string }> {
  if (!validateSlug(slug)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
  if (isHardcodedSlug(slug)) {
    throw new Error(`Slug is hardcoded and cannot be uploaded: "${slug}"`);
  }

  const result: PutBlobResult = await put(getBlobKey(slug), body, {
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "text/html; charset=utf-8",
    access: "public",
  });

  return { url: result.url, pathname: result.pathname };
}

/**
 * Deletes the stored HTML for a slug from Vercel Blob.
 * Returns true if deleted, false if it did not exist.
 *
 * Throws when slug is hardcoded or invalid.
 * Caller is responsible for Node runtime guarantee.
 */
export async function deleteProjectHtml(slug: string): Promise<boolean> {
  if (!validateSlug(slug)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
  if (isHardcodedSlug(slug)) {
    throw new Error(`Slug is hardcoded and cannot be deleted: "${slug}"`);
  }

  try {
    await head(getBlobKey(slug));
  } catch (err: unknown) {
    if (err instanceof BlobNotFoundError) return false;
    throw err;
  }

  await del(getBlobKey(slug));
  return true;
}

/**
 * Returns the public URL of the stored HTML for a slug, or null if not found.
 *
 * - 404 / BlobNotFoundError → returns null (slug was never uploaded)
 * - Any other error (auth failure, network, etc.) → re-thrown for the caller to handle
 *
 * Note: does not validate slug on read — caller (Phase 4 render branch) is
 * expected to short-circuit hardcoded slugs before calling this function.
 *
 * Caller is responsible for Node runtime guarantee.
 */
export async function getProjectHtmlUrl(slug: string): Promise<string | null> {
  try {
    const result = await head(getBlobKey(slug));
    return result.url;
  } catch (err: unknown) {
    if (err instanceof BlobNotFoundError) {
      return null;
    }
    throw err;
  }
}
