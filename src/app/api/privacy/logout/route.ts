import { NextResponse } from "next/server";
import { PRIVACY_ACCESS_COOKIE } from "@/lib/privacy-access";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: PRIVACY_ACCESS_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
  return response;
}
