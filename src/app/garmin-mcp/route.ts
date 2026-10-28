import { projectHtml } from "@/lib/garmin-public-content";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(projectHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
