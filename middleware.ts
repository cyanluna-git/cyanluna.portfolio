import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  PRIVACY_ACCESS_COOKIE,
  isValidPrivacySessionToken,
  sanitizePrivacyNextPath,
} from "@/lib/privacy-access";

function isPrivacyRoute(pathname: string): boolean {
  return pathname === "/privacy" || pathname.startsWith("/privacy/");
}

function isUnlockRoute(pathname: string): boolean {
  return pathname === "/privacy/unlock" || pathname.startsWith("/privacy/unlock/");
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isPrivacyRoute(pathname) || isUnlockRoute(pathname)) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(PRIVACY_ACCESS_COOKIE)?.value;
  if (await isValidPrivacySessionToken(sessionToken)) {
    return NextResponse.next();
  }

  const unlockUrl = request.nextUrl.clone();
  unlockUrl.pathname = "/privacy/unlock";
  unlockUrl.searchParams.set("next", sanitizePrivacyNextPath(`${pathname}${search}`));

  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/privacy", "/privacy/:path*"],
};
