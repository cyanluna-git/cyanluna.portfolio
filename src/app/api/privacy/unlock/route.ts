import { NextResponse } from "next/server";
import {
  PRIVACY_ACCESS_COOKIE,
  createPrivacySessionToken,
  hasConfiguredPrivacyKey,
  isValidPrivacyKey,
  sanitizePrivacyNextPath,
} from "@/lib/privacy-access";

const SESSION_MAX_AGE = 60 * 60 * 8;

export async function POST(request: Request) {
  if (!hasConfiguredPrivacyKey()) {
    return NextResponse.json(
      {
        ok: false,
        error: "config_missing",
        message: "PRIVACY_ACCESS_KEY_B64 is not configured locally.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { key?: string; nextPath?: string }
    | null;

  const key = body?.key ?? "";
  const nextPath = sanitizePrivacyNextPath(body?.nextPath);

  if (!(await isValidPrivacyKey(key))) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_key",
        message: "The privacy access key is invalid.",
      },
      { status: 401 },
    );
  }

  const sessionToken = await createPrivacySessionToken();
  if (!sessionToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "config_missing",
        message: "PRIVACY_ACCESS_KEY_B64 is not configured locally.",
      },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true, nextPath });
  response.cookies.set({
    name: PRIVACY_ACCESS_COOKIE,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
