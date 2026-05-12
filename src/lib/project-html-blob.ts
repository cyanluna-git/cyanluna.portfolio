/**
 * Server-only. Callers (route handlers, server components) MUST run on the
 * Node runtime — `@vercel/blob` is not Edge-safe. `BLOB_READ_WRITE_TOKEN` is
 * read by the SDK; this module does not validate it.
 */

import { BlobNotFoundError, type PutBlobResult, del, head, put } from "@vercel/blob";

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
