import { NextResponse } from "next/server";
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
    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: `upstream ${res.status}`, detail: text.slice(0, 500) },
        { status: 502 },
      );
    }

    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "invalid_json", detail: text.slice(0, 500) },
        { status: 502 },
      );
    }

    return NextResponse.json(json as KStartupApiResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      { error: "fetch_failed", detail: message },
      { status: 502 },
    );
  }
}
