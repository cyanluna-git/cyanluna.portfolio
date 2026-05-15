import { NextResponse } from "next/server";
import { listUploadedProjects } from "@/lib/project-html-blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(
  status: number,
  code: string,
  message: string,
): Response {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function GET(): Promise<Response> {
  try {
    const items = await listUploadedProjects();
    return NextResponse.json(items);
  } catch {
    return errorResponse(503, "blob_unavailable", "Blob storage unavailable.");
  }
}
