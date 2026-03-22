import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  PRIVACY_ACCESS_COOKIE,
  isValidPrivacySessionToken,
} from "@/lib/privacy-access";
import type { KStartupApiResponse } from "@/types/announcement";

const API_BASE =
  "https://apis.data.go.kr/B552735/kisedKstartupService01/getAnnouncementInformation01";

const ALLOWED_PARAMS = new Set([
  "page",
  "perPage",
  "cond[rcrt_prgs_yn::EQ]",
  "cond[biz_pbanc_nm::LIKE]",
  "cond[supt_biz_clsfc::LIKE]",
  "cond[supt_regin::LIKE]",
  "cond[aply_trgt::LIKE]",
  "cond[pbanc_rcpt_bgng_dt::GTE]",
  "cond[pbanc_rcpt_end_dt::LTE]",
]);

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(PRIVACY_ACCESS_COOKIE)?.value;
  if (!(await isValidPrivacySessionToken(sessionToken))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const serviceKey = process.env.DATA_GO_KR;
  if (!serviceKey) {
    return NextResponse.json(
      { error: "DATA_GO_KR env var is not configured" },
      { status: 503 },
    );
  }

  const incoming = new URL(request.url).searchParams;
  const upstream = new URLSearchParams();
  upstream.set("serviceKey", serviceKey);
  upstream.set("returnType", "json");

  for (const [key, value] of incoming.entries()) {
    if (ALLOWED_PARAMS.has(key) && value) {
      upstream.set(key, value);
    }
  }

  if (!incoming.has("perPage")) {
    upstream.set("perPage", "50");
  }

  const apiUrl = `${API_BASE}?${upstream.toString()}`;

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 300 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "upstream_error", status: res.status, detail: text },
        { status: 502 },
      );
    }

    const json = (await res.json()) as KStartupApiResponse;
    return NextResponse.json(json);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      { error: "fetch_failed", message },
      { status: 502 },
    );
  }
}
