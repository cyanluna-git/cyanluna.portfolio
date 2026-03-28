import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await request.json().catch(() => null);
  return NextResponse.json(
    {
      ok: false,
      error: "disabled",
      message: "Privacy unlock is disabled because /privacy is now open access.",
    },
    { status: 410 },
  );
}
