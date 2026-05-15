import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  hasConfiguredAdminKey,
  verifyAdminToken,
} from "@/lib/admin-auth";
import {
  validateSlug,
  isHardcodedSlug,
  putProjectHtml,
  getProjectHtmlUrl,
  putProjectMeta,
  isValidProjectType,
  type ProjectType,
} from "@/lib/project-html-blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/** Simple HTML entity decoding for common entities in title text. */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Converts a slug to a title by splitting on hyphens and capitalising each word. */
function formatSlugAsTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Extracts a human-readable title from HTML in priority order:
 * 1. <title> tag content
 * 2. <h1> tag text (inner tags stripped)
 * 3. formatSlug(slug) fallback
 * Truncates to 80 characters.
 */
function extractTitle(html: string, slug: string): string {
  // Try <title>
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (titleMatch) {
    const candidate = decodeEntities(titleMatch[1].trim());
    if (candidate) {
      return candidate.length > 80 ? candidate.slice(0, 79) + "…" : candidate;
    }
  }

  // Try <h1>
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (h1Match) {
    const candidate = decodeEntities(h1Match[1].replace(/<[^>]+>/g, "").trim());
    if (candidate) {
      return candidate.length > 80 ? candidate.slice(0, 79) + "…" : candidate;
    }
  }

  // Fallback
  return formatSlugAsTitle(slug);
}

function errorResponse(
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>,
): Response {
  const body: { error: { code: string; message: string; details?: Record<string, unknown> } } = {
    error: { code, message },
  };
  if (details !== undefined) {
    body.error.details = details;
  }
  return NextResponse.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  // 1. env-config check (500) — must be first so token-fail vs misconfig are distinguishable
  if (!hasConfiguredAdminKey()) {
    return errorResponse(500, "server_misconfigured", "Admin upload key is not configured on this server.");
  }

  // 2. auth (401)
  if (!verifyAdminToken(request.headers.get("authorization"))) {
    return errorResponse(401, "unauthorized", "Invalid or missing authorization token.");
  }

  // 3. multipart form parse (400)
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorResponse(400, "bad_form", "Could not parse multipart form data.", {
      reason: "multipart parse failed",
    });
  }

  // 4. slug field presence (400)
  const slugValue = form.get("slug");
  if (typeof slugValue !== "string" || slugValue === "") {
    return errorResponse(400, "bad_form", "Missing required form field.", { field: "slug" });
  }
  const slug = slugValue;

  // 5. file field presence (400)
  const fileValue = form.get("file");
  if (!(fileValue instanceof File)) {
    return errorResponse(400, "bad_form", "Missing required form field.", { field: "file" });
  }
  const file = fileValue;

  // 5b. type field (optional, default "lab")
  const typeValue = form.get("type");
  const type: ProjectType = (() => {
    if (typeof typeValue === "string" && isValidProjectType(typeValue)) {
      return typeValue;
    }
    return "lab";
  })();

  // 6. slug pattern validation (400)
  if (!validateSlug(slug)) {
    return errorResponse(400, "invalid_slug", `Slug "${slug}" does not match the allowed pattern (lowercase alphanumeric and hyphens, 1–64 chars).`);
  }

  // 7. hardcoded slug guard (409)
  if (isHardcodedSlug(slug)) {
    return errorResponse(409, "slug_locked", `Slug "${slug}" is reserved for a hardcoded Next.js route and cannot be overwritten via upload.`);
  }

  // 8. file size cap (400)
  if (file.size > MAX_FILE_SIZE) {
    return errorResponse(400, "file_too_large", "File exceeds the 5 MB size limit.", {
      maxBytes: MAX_FILE_SIZE,
      actualBytes: file.size,
    });
  }

  // 9. extension + MIME type (400)
  const allowedMimeTypes = new Set(["text/html", "application/octet-stream", ""]);
  if (!file.name.endsWith(".html") || !allowedMimeTypes.has(file.type)) {
    return errorResponse(400, "bad_file_type", "Only .html files are accepted (MIME: text/html or application/octet-stream).");
  }

  // 10. content sniff — first non-whitespace byte must be `<` (400)
  // Read the full text once; use it for both sniffing and title extraction below.
  const fullText = await file.text();
  const sniffHead = fullText.trimStart();
  if (sniffHead.length === 0 || sniffHead[0] !== "<") {
    return errorResponse(400, "bad_file_content", "File content does not appear to be valid HTML (must start with '<').");
  }

  // 11. check if slug already has a stored file → replaced flag (500 on storage error)
  let replaced: boolean;
  try {
    const existing = await getProjectHtmlUrl(slug);
    replaced = existing !== null;
  } catch (err: unknown) {
    const reason = err instanceof Error ? err.message : "unknown error";
    return errorResponse(500, "storage_check_failed", "Failed to check blob storage.", { reason });
  }

  // 12. upload to blob storage (500 on failure)
  try {
    await putProjectHtml(slug, fullText);
  } catch (err: unknown) {
    const reason = err instanceof Error ? err.message : "unknown error";
    return errorResponse(500, "storage_put_failed", "Failed to upload file to blob storage.", { reason });
  }

  // 12b. extract title and save metadata sidecar (non-fatal — upload success takes priority)
  const title = extractTitle(fullText, slug);
  try {
    await putProjectMeta(slug, { title, type, uploadedAt: new Date().toISOString() });
  } catch (err: unknown) {
    console.error("[upload] putProjectMeta failed:", err instanceof Error ? err.message : err);
  }

  // 13. revalidate cache (always on success)
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");

  // 14. success response
  return NextResponse.json({
    ok: true,
    slug,
    url: `/projects/${slug}`,
    replaced,
    title,
    type,
  });
}
