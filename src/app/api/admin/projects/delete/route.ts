import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { hasConfiguredAdminKey, verifyAdminToken } from "@/lib/admin-auth";
import { validateSlug, isHardcodedSlug, deleteProjectHtml } from "@/lib/project-html-blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(status: number, code: string, message: string): Response {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function DELETE(request: Request): Promise<Response> {
  if (!hasConfiguredAdminKey()) {
    return errorResponse(500, "server_misconfigured", "Admin key is not configured.");
  }

  if (!verifyAdminToken(request.headers.get("authorization"))) {
    return errorResponse(401, "unauthorized", "Invalid or missing authorization token.");
  }

  let slug: string;
  try {
    const body = await request.json() as { slug?: unknown };
    slug = typeof body.slug === "string" ? body.slug : "";
  } catch {
    return errorResponse(400, "bad_request", "Request body must be JSON with a 'slug' field.");
  }

  if (!slug || !validateSlug(slug)) {
    return errorResponse(400, "invalid_slug", `Slug "${slug}" is invalid.`);
  }

  if (isHardcodedSlug(slug)) {
    return errorResponse(409, "slug_locked", `Slug "${slug}" is reserved and cannot be deleted.`);
  }

  let deleted: boolean;
  try {
    deleted = await deleteProjectHtml(slug);
  } catch (err: unknown) {
    const reason = err instanceof Error ? err.message : "unknown error";
    return errorResponse(500, "storage_delete_failed", `Failed to delete: ${reason}`);
  }

  if (!deleted) {
    return errorResponse(404, "not_found", `No uploaded HTML found for slug "${slug}".`);
  }

  revalidatePath(`/projects/${slug}`);

  return NextResponse.json({ ok: true, slug, deleted: true });
}
