"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import type {
  ApplicationStatus,
  KStartupAnnouncement,
  KStartupApiResponse,
  PickedAnnouncement,
} from "@/types/announcement";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  loadPicks,
  pickAnnouncement,
  savePicks,
} from "@/lib/announcement-picks";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const READ_STORAGE_KEY = "kstartup-announcements-read";
const LAST_CHECKED_KEY = "kstartup-announcements-last-checked";

const SECTIONS: PrivateNavSection[] = [
  { id: "summary", label: "1. 현황" },
  { id: "matched", label: "2. 맞춤 공고" },
  { id: "all-list", label: "3. 전체 모집중" },
];

// ---------------------------------------------------------------------------
// My filter config
// ---------------------------------------------------------------------------

const MY_REGIONS = ["충남", "전국", "대전", "세종", "아산"];

const CATEGORY_KEYWORDS = ["AI", "DX", "AX", "디지털", "인공지능"];
const STARTUP_KEYWORDS = ["예비창업", "예비 창업", "창업"];

function matchesMyFilter(item: KStartupAnnouncement): boolean {
  const region = item.supt_regin || "";
  const regionMatch = MY_REGIONS.some((r) => region.includes(r));
  if (!regionMatch) return false;

  const searchText = [
    item.biz_pbanc_nm,
    item.supt_biz_clsfc,
    item.pbanc_ctnt ?? "",
  ]
    .join(" ")
    .toUpperCase();

  const categoryMatch = CATEGORY_KEYWORDS.some((kw) =>
    searchText.includes(kw.toUpperCase()),
  );

  const startupText = [item.biz_enyy ?? "", item.aply_trgt ?? "", item.biz_pbanc_nm].join(
    " ",
  );
  const startupMatch = STARTUP_KEYWORDS.some((kw) => startupText.includes(kw));

  return categoryMatch || startupMatch;
}

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

function matchReason(item: KStartupAnnouncement): string {
  const parts: string[] = [];
  const searchText = [item.biz_pbanc_nm, item.supt_biz_clsfc, item.pbanc_ctnt ?? ""]
    .join(" ")
    .toUpperCase();
  const matched = CATEGORY_KEYWORDS.filter((kw) => searchText.includes(kw.toUpperCase()));
  if (matched.length > 0) parts.push(matched.join(", "));

  const startupText = [item.biz_enyy ?? "", item.aply_trgt ?? "", item.biz_pbanc_nm].join(" ");
  if (STARTUP_KEYWORDS.some((kw) => startupText.includes(kw))) parts.push("창업지원");

  return parts.join(" · ");
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
  reason,
  isPicked,
  currentStatus,
  onPick,
  onStatusChange,
}: {
  item: KStartupAnnouncement;
  isRead: boolean;
  onMarkRead: (id: string) => void;
  reason?: string;
  isPicked?: boolean;
  currentStatus?: ApplicationStatus;
  onPick?: (item: KStartupAnnouncement) => void;
  onStatusChange?: (sn: string, status: ApplicationStatus) => void;
}) {
  const recruiting = item.rcrt_prgs_yn === "Y";
  const dday = dDayLabel(item.pbanc_rcpt_end_dt);
  const ddayColor = dDayTone(item.pbanc_rcpt_end_dt);

  return (
    <article
      className={`rounded-3xl border bg-zinc-950/85 overflow-hidden transition-colors ${
        isPicked
          ? "border-violet-500/30"
          : isRead
            ? "border-zinc-800/60 opacity-70"
            : "border-zinc-700"
      }`}
    >
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge recruiting={recruiting} />
            {!isRead && !isPicked && (
              <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
                NEW
              </span>
            )}
            {isPicked && currentStatus && (
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_COLORS[currentStatus].border} ${STATUS_COLORS[currentStatus].bg} ${STATUS_COLORS[currentStatus].text}`}
              >
                {STATUS_LABELS[currentStatus]}
              </span>
            )}
            {dday && (
              <span className={`text-xs font-mono font-semibold ${ddayColor}`}>
                {dday}
              </span>
            )}
            {reason && (
              <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300">
                {reason}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 print:hidden">
            {onPick && (
              <button
                type="button"
                onClick={() => onPick(item)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  isPicked
                    ? "border-violet-500/30 bg-violet-500/15 text-violet-300"
                    : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300"
                }`}
              >
                {isPicked ? "Picked" : "Pick"}
              </button>
            )}
            <button
              type="button"
              onClick={() => onMarkRead(String(item.pbanc_sn))}
              className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                isRead
                  ? "border-zinc-800 bg-zinc-900 text-zinc-600"
                  : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {isRead ? "읽음" : "읽음 표시"}
            </button>
          </div>
        </div>

        {isPicked && onStatusChange && (
          <div className="flex flex-wrap gap-1.5 mb-3 print:hidden">
            {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onStatusChange(String(item.pbanc_sn), s)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  currentStatus === s
                    ? `${STATUS_COLORS[s].border} ${STATUS_COLORS[s].bg} ${STATUS_COLORS[s].text}`
                    : "border-zinc-800 bg-zinc-900 text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        )}

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
          {item.biz_enyy && (
            <div className="flex gap-2">
              <span className="text-zinc-500 shrink-0">업력</span>
              <span className="text-zinc-300 line-clamp-1">{item.biz_enyy}</span>
            </div>
          )}
          {item.supt_biz_clsfc && (
            <div className="flex gap-2">
              <span className="text-zinc-500 shrink-0">분야</span>
              <span className="text-zinc-300">{item.supt_biz_clsfc}</span>
            </div>
          )}
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

function FilterTag({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${
        active
          ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
          : "border-zinc-700 bg-zinc-900 text-zinc-500"
      }`}
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AnnouncementsPage() {
  const [rawData, setRawData] = useState<KStartupAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myFilterOn, setMyFilterOn] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [readSet, setReadSet] = useState<Set<string>>(() => loadReadSet());
  const [lastChecked, setLastChecked] = useState(() => loadLastChecked());
  const [picks, setPicks] = useState<Record<string, PickedAnnouncement>>(
    () => loadPicks(),
  );

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("perPage", "200");
    params.set("cond[rcrt_prgs_yn::EQ]", "Y");

    try {
      const res = await fetch(`/api/privacy/announcements?${params.toString()}`);
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
        const detail = body?.detail ? ` — ${String(body.detail).slice(0, 200)}` : "";
        throw new Error(`${String(body?.error ?? `HTTP ${res.status}`)}${detail}`);
      }
      const json = (await res.json()) as KStartupApiResponse;
      setRawData(json.data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "데이터를 불러올 수 없습니다");
      setRawData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

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

  const handlePick = useCallback((item: KStartupAnnouncement) => {
    setPicks((prev) => {
      const key = String(item.pbanc_sn);
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = pickAnnouncement(item);
      }
      savePicks(next);
      return next;
    });
  }, []);

  const handleStatusChange = useCallback(
    (sn: string, status: ApplicationStatus) => {
      setPicks((prev) => {
        const existing = prev[sn];
        if (!existing) return prev;
        const next = {
          ...prev,
          [sn]: {
            ...existing,
            status,
            statusChangedAt: new Date().toISOString(),
          },
        };
        savePicks(next);
        return next;
      });
    },
    [],
  );

  const handleMarkChecked = useCallback(() => {
    const now = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastChecked(now);
    saveLastChecked(now);
  }, []);

  // ---- derived data ----

  const keywordFiltered = useMemo(() => {
    if (!keyword.trim()) return rawData;
    const kw = keyword.trim().toLowerCase();
    return rawData.filter((item) =>
      item.biz_pbanc_nm.toLowerCase().includes(kw),
    );
  }, [rawData, keyword]);

  const myMatched = useMemo(
    () => keywordFiltered.filter(matchesMyFilter),
    [keywordFiltered],
  );

  const displayItems = myFilterOn ? myMatched : keywordFiltered;

  const urgentItems = useMemo(
    () =>
      displayItems
        .filter((item) => {
          const days = daysRemaining(item.pbanc_rcpt_end_dt);
          return days !== null && days >= 0 && days <= 7;
        })
        .sort(
          (a, b) =>
            (daysRemaining(a.pbanc_rcpt_end_dt) ?? 99) -
            (daysRemaining(b.pbanc_rcpt_end_dt) ?? 99),
        ),
    [displayItems],
  );

  const unreadCount = displayItems.filter(
    (item) => !readSet.has(String(item.pbanc_sn)),
  ).length;

  const pickedCount = Object.keys(picks).length;
  const planningCount = Object.values(picks).filter(
    (p) => p.status === "planning",
  ).length;

  return (
    <PrivateDocumentShell
      title="K-Startup 사업공고 트래커"
      sections={SECTIONS}
      meta={
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">data.go.kr 창업진흥원 API</span>
          <span className="text-zinc-700">|</span>
          <span>모집중 공고 실시간 추적</span>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/founder-programs"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Founder programs 보기
          </Link>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/my-picks"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            My Picks
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

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <SummaryCard label="모집중 전체" value={loading ? "—" : rawData.length} />
            <SummaryCard label="맞춤 필터" value={loading ? "—" : myMatched.length} />
            <SummaryCard label="Unread" value={loading ? "—" : unreadCount} />
            <SummaryCard label="Picked" value={pickedCount} />
            <SummaryCard label="지원예정" value={planningCount} />
          </div>

          {/* Filter controls */}
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="공고명 검색..."
                className="flex-1 min-w-[200px] rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMyFilterOn((prev) => !prev)}
                className={`text-xs px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                  myFilterOn
                    ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-300"
                }`}
              >
                {myFilterOn ? "내 맞춤 필터 ON" : "내 맞춤 필터 OFF"}
              </button>
            </div>

            {myFilterOn && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span>지역:</span>
                {MY_REGIONS.map((r) => (
                  <FilterTag key={r} label={r} active />
                ))}
                <span className="text-zinc-700 mx-1">AND</span>
                <span>분야:</span>
                {CATEGORY_KEYWORDS.map((k) => (
                  <FilterTag key={k} label={k} active />
                ))}
                <span className="text-zinc-700">or</span>
                {STARTUP_KEYWORDS.map((k) => (
                  <FilterTag key={k} label={k} active />
                ))}
              </div>
            )}
          </div>
        </>
      }
    >
      {/* Section 1: Urgent */}
      <section id="summary" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-rose-500">
          1. 마감 임박 (7일 이내)
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
                reason={matchReason(item)}
                isPicked={Boolean(picks[String(item.pbanc_sn)])}
                currentStatus={picks[String(item.pbanc_sn)]?.status}
                onPick={handlePick}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 2: My matched */}
      <section id="matched" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-violet-500">
          2. {myFilterOn ? "맞춤 공고" : "전체 모집중"}
          <span className="ml-3 text-sm font-normal text-zinc-500">
            {displayItems.length}건
          </span>
        </h2>
        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500 animate-pulse">불러오는 중...</p>
          </div>
        ) : displayItems.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">
              {myFilterOn
                ? "필터 조건에 맞는 모집중 공고가 없습니다."
                : "현재 모집중인 공고가 없습니다."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayItems.map((item) => (
              <AnnouncementCard
                key={String(item.pbanc_sn)}
                item={item}
                isRead={readSet.has(String(item.pbanc_sn))}
                onMarkRead={handleMarkRead}
                reason={myFilterOn ? matchReason(item) : undefined}
                isPicked={Boolean(picks[String(item.pbanc_sn)])}
                currentStatus={picks[String(item.pbanc_sn)]?.status}
                onPick={handlePick}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: All recruiting (only when filter is on, show count of what was filtered out) */}
      {myFilterOn && (
        <section id="all-list" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-zinc-500">
            3. 필터 제외 공고
            <span className="ml-3 text-sm font-normal text-zinc-500">
              {keywordFiltered.length - myMatched.length}건
            </span>
          </h2>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5 text-center">
            <p className="text-sm text-zinc-400">
              전체 모집중 {rawData.length}건 중{" "}
              <span className="text-violet-300 font-medium">{myMatched.length}건</span>이
              내 필터에 매칭됨
            </p>
            <button
              type="button"
              onClick={() => setMyFilterOn(false)}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors"
            >
              전체 보기로 전환
            </button>
          </div>
        </section>
      )}
    </PrivateDocumentShell>
  );
}
