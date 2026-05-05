import { NextResponse } from "next/server";
import { getProjectHtmlUrl } from "@/lib/project-html-blob";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;

  let blobUrl: string | null;
  try {
    blobUrl = await getProjectHtmlUrl(slug);
  } catch {
    return new NextResponse("Failed to resolve blob URL", { status: 502 });
  }

  if (!blobUrl) {
    return new NextResponse("Not found", { status: 404 });
  }

  const upstream = await fetch(blobUrl);
  if (!upstream.ok) {
    return new NextResponse("Upstream fetch failed", { status: 502 });
  }

  const html = await upstream.text();

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Permissive CSP — scripts run in isolated sandbox (allow-scripts, no allow-same-origin)
      "Content-Security-Policy":
        "default-src * blob: data: 'unsafe-inline' 'unsafe-eval'",
      "X-Frame-Options": "SAMEORIGIN",
      "Cache-Control": "no-store",
    },
  });
}
