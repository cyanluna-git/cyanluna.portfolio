"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import type {
  KStartupAnnouncement,
  KStartupApiResponse,
  RecruitmentFilter,
} from "@/types/announcement";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const READ_STORAGE_KEY = "kstartup-announcements-read";
const LAST_CHECKED_KEY = "kstartup-announcements-last-checked";

const SECTIONS: PrivateNavSection[] = [
  { id: "summary", label: "1. 현황" },
  { id: "recruiting", label: "2. 모집중" },
  { id: "all-list", label: "3. 전체 목록" },
];

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function loadReadSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(READ_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveReadSet(ids: Set<string>): void {
  try {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

function loadLastChecked(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(LAST_CHECKED_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveLastChecked(value: string): void {
  try {
    localStorage.setItem(LAST_CHECKED_KEY, value);
  } catch {}
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(raw: string): string {
  if (!raw || raw.length !== 8) return raw || "—";
  return `${raw.slice(0, 4)}.${raw.slice(4, 6)}.${raw.slice(6, 8)}`;
}

function daysRemaining(endDate: string): number | null {
  if (!endDate || endDate.length !== 8) return null;
  const year = Number(endDate.slice(0, 4));
  const month = Number(endDate.slice(4, 6)) - 1;
  const day = Number(endDate.slice(6, 8));
  const end = new Date(year, month, day, 23, 59, 59);
  const now = new Date();
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function dDayLabel(endDate: string): string {
  const days = daysRemaining(endDate);
  if (days === null) return "";
  if (days < 0) return "마감";
  if (days === 0) return "D-Day";
  return `D-${days}`;
}

function dDayTone(endDate: string): string {
  const days = daysRemaining(endDate);
  if (days === null) return "text-zinc-500";
  if (days < 0) return "text-zinc-600";
  if (days <= 3) return "text-rose-400";
  if (days <= 7) return "text-amber-400";
  return "text-emerald-400";
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function StatusBadge({ recruiting }: { recruiting: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${
        recruiting
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
          : "border-zinc-700 bg-zinc-800 text-zinc-500"
      }`}
    >
      {recruiting ? "모집중" : "마감"}
    </span>
  );
}

function AnnouncementCard({
  item,
  isRead,
  onMarkRead,
}: {
  item: KStartupAnnouncement;
  isRead: boolean;
  onMarkRead: (id: string) => void;
}) {
  const recruiting = item.rcrt_prgs_yn === "Y";
  const dday = dDayLabel(item.pbanc_rcpt_end_dt);
  const ddayColor = dDayTone(item.pbanc_rcpt_end_dt);

  return (
    <article
      className={`rounded-3xl border bg-zinc-950/85 overflow-hidden transition-colors ${
        isRead ? "border-zinc-800/60 opacity-70" : "border-zinc-700"
      }`}
    >
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge recruiting={recruiting} />
            {!isRead && (
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
                NEW
              </span>
            )}
            {dday && (
              <span className={`text-xs font-mono font-semibold ${ddayColor}`}>
                {dday}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => onMarkRead(String(item.pbanc_sn))}
            className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer print:hidden ${
              isRead
                ? "border-zinc-800 bg-zinc-900 text-zinc-600"
                : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300"
            }`}
          >
            {isRead ? "읽음" : "읽음 표시"}
          </button>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-zinc-100 mb-2 leading-snug">
          {item.biz_pbanc_nm}
        </h3>

        <div className="grid gap-x-6 gap-y-2 text-sm text-zinc-400 sm:grid-cols-2">
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">운영기관</span>
            <span className="text-zinc-300">{item.pbanc_ntrp_nm || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">지원지역</span>
            <span className="text-zinc-300">{item.supt_regin || "전국"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">접수기간</span>
            <span className="text-zinc-300">
              {formatDate(item.pbanc_rcpt_bgng_dt)} ~ {formatDate(item.pbanc_rcpt_end_dt)}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">지원대상</span>
            <span className="text-zinc-300 line-clamp-1">{item.aply_trgt || "—"}</span>
          </div>
        </div>

        {(item.detl_pg_url || item.biz_gdnc_url) && (
          <div className="mt-3 pt-3 border-t border-zinc-800/60">
            <a
              href={item.detl_pg_url || item.biz_gdnc_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              공고 상세 보기 &rarr;
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4">
      <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
        {label}
      </p>
      <p className="text-3xl font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AnnouncementsPage() {
  const [data, setData] = useState<KStartupAnnouncement[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RecruitmentFilter>("all");
  const [keyword, setKeyword] = useState("");
  const [readSet, setReadSet] = useState<Set<string>>(() => loadReadSet());
  const [lastChecked, setLastChecked] = useState(() => loadLastChecked());
  const [page, setPage] = useState(1);

  const perPage = 50;

  const fetchAnnouncements = useCallback(async (pageNum: number, recruitFilter: RecruitmentFilter, search: string) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("page", String(pageNum));
    params.set("perPage", String(perPage));

    if (recruitFilter === "recruiting") {
      params.set("cond[rcrt_prgs_yn::EQ]", "Y");
    } else if (recruitFilter === "closed") {
      params.set("cond[rcrt_prgs_yn::EQ]", "N");
    }

    if (search.trim()) {
      params.set("cond[biz_pbanc_nm::LIKE]", search.trim());
    }

    try {
      const res = await fetch(`/api/privacy/announcements?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => null) as Record<string, unknown> | null;
        const detail = body?.detail ? ` — ${String(body.detail).slice(0, 200)}` : "";
        throw new Error(
          `${String(body?.error ?? `HTTP ${res.status}`)}${detail}`,
        );
      }
      const json = (await res.json()) as KStartupApiResponse;
      setData(json.data ?? []);
      setTotalCount(json.totalCount ?? 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "데이터를 불러올 수 없습니다");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements(page, filter, keyword);
  }, [fetchAnnouncements, page, filter, keyword]);

  const handleMarkRead = useCallback((sn: string) => {
    setReadSet((prev) => {
      const next = new Set(prev);
      if (next.has(sn)) {
        next.delete(sn);
      } else {
        next.add(sn);
      }
      saveReadSet(next);
      return next;
    });
  }, []);

  const handleMarkChecked = useCallback(() => {
    const now = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastChecked(now);
    saveLastChecked(now);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  }, []);

  const recruitingItems = data.filter((item) => item.rcrt_prgs_yn === "Y");
  const unreadCount = data.filter((item) => !readSet.has(String(item.pbanc_sn))).length;

  const urgentItems = recruitingItems
    .filter((item) => {
      const days = daysRemaining(item.pbanc_rcpt_end_dt);
      return days !== null && days >= 0 && days <= 7;
    })
    .sort((a, b) => (daysRemaining(a.pbanc_rcpt_end_dt) ?? 99) - (daysRemaining(b.pbanc_rcpt_end_dt) ?? 99));

  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  return (
    <PrivateDocumentShell
      title="K-Startup 사업공고 트래커"
      sections={SECTIONS}
      meta={
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">data.go.kr 창업진흥원 API</span>
          <span className="text-zinc-700">|</span>
          <span>창업지원 사업공고를 놓치지 않고 추적</span>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/founder-programs"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Founder programs 보기
          </Link>
        </div>
      }
      headerExtras={
        <>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              Last checked: {lastChecked || "—"}
            </span>
            <button
              type="button"
              onClick={handleMarkChecked}
              className="text-[11px] px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer print:hidden"
            >
              오늘 확인 완료
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <SummaryCard label="Total" value={loading ? "—" : totalCount} />
            <SummaryCard label="Recruiting" value={loading ? "—" : recruitingItems.length} />
            <SummaryCard label="Unread" value={loading ? "—" : unreadCount} />
            <SummaryCard
              label="Urgent (7일 이내)"
              value={loading ? "—" : urgentItems.length}
            />
          </div>

          <div className="mt-6">
            <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
              <input
                type="text"
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                placeholder="공고명 검색..."
                className="flex-1 min-w-[200px] rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
              />
              <div className="flex gap-2">
                {(["all", "recruiting", "closed"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => { setFilter(f); setPage(1); }}
                    className={`text-xs px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                      filter === f
                        ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                        : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-300"
                    }`}
                  >
                    {f === "all" ? "전체" : f === "recruiting" ? "모집중" : "마감"}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </>
      }
    >
      {/* Section 1: Summary / Urgent */}
      <section id="summary" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          1. 마감 임박 공고
        </h2>
        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500 animate-pulse">공고를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 px-5 py-5">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        ) : urgentItems.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">7일 이내 마감 공고가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {urgentItems.map((item) => (
              <AnnouncementCard
                key={String(item.pbanc_sn)}
                item={item}
                isRead={readSet.has(String(item.pbanc_sn))}
                onMarkRead={handleMarkRead}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Recruiting */}
      <section id="recruiting" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-emerald-500">
          2. 모집중 공고
        </h2>
        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500 animate-pulse">불러오는 중...</p>
          </div>
        ) : recruitingItems.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">현재 모집중인 공고가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recruitingItems.map((item) => (
              <AnnouncementCard
                key={String(item.pbanc_sn)}
                item={item}
                isRead={readSet.has(String(item.pbanc_sn))}
                onMarkRead={handleMarkRead}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: All */}
      <section id="all-list" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-zinc-500">
          3. 전체 목록
        </h2>
        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500 animate-pulse">불러오는 중...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {data.map((item) => (
                <AnnouncementCard
                  key={String(item.pbanc_sn)}
                  item={item}
                  isRead={readSet.has(String(item.pbanc_sn))}
                  onMarkRead={handleMarkRead}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  이전
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  다음
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </PrivateDocumentShell>
  );
}
