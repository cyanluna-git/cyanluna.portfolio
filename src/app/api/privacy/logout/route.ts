import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "Privacy logout is no longer required because /privacy is open access.",
  });
}
