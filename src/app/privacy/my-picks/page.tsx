"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import type { ApplicationStatus, PickedAnnouncement } from "@/types/announcement";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  loadPicks,
  savePicks,
} from "@/lib/announcement-picks";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTIONS: PrivateNavSection[] = [
  { id: "overview", label: "1. 현황" },
  { id: "planning", label: "2. 지원예정" },
  { id: "applied", label: "3. 지원완료" },
  { id: "results", label: "4. 결과" },
  { id: "watching", label: "5. 관심" },
];

const STATUS_ORDER: ApplicationStatus[] = [
  "planning",
  "applied",
  "accepted",
  "rejected",
  "picked",
];

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

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: string;
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4">
      <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
        {label}
      </p>
      <p className={`text-3xl font-semibold ${tone ?? "text-zinc-100"}`}>
        {value}
      </p>
    </div>
  );
}

function PickCard({
  pick,
  onStatusChange,
  onRemove,
  onMemoChange,
}: {
  pick: PickedAnnouncement;
  onStatusChange: (sn: string, status: ApplicationStatus) => void;
  onRemove: (sn: string) => void;
  onMemoChange: (sn: string, memo: string) => void;
}) {
  const [editingMemo, setEditingMemo] = useState(false);
  const [memoValue, setMemoValue] = useState(pick.memo ?? "");

  const dday = dDayLabel(pick.pbanc_rcpt_end_dt);
  const ddayColor = dDayTone(pick.pbanc_rcpt_end_dt);
  const colors = STATUS_COLORS[pick.status];

  const handleMemoSave = () => {
    onMemoChange(String(pick.pbanc_sn), memoValue);
    setEditingMemo(false);
  };

  return (
    <article className={`rounded-3xl border ${colors.border} bg-zinc-950/85 overflow-hidden`}>
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${colors.border} ${colors.bg} ${colors.text}`}
            >
              {STATUS_LABELS[pick.status]}
            </span>
            {dday && (
              <span className={`text-xs font-mono font-semibold ${ddayColor}`}>
                {dday}
              </span>
            )}
            <span className="text-[11px] text-zinc-600">
              {pick.supt_regin} · {pick.supt_biz_clsfc}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onRemove(String(pick.pbanc_sn))}
            className="text-[11px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-600 hover:text-rose-400 hover:border-rose-500/30 transition-colors cursor-pointer print:hidden"
          >
            삭제
          </button>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-zinc-100 mb-2 leading-snug">
          {pick.biz_pbanc_nm}
        </h3>

        <div className="grid gap-x-6 gap-y-2 text-sm text-zinc-400 sm:grid-cols-2 mb-3">
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">운영기관</span>
            <span className="text-zinc-300">{pick.pbanc_ntrp_nm || "—"}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-500 shrink-0">접수기간</span>
            <span className="text-zinc-300">
              {formatDate(pick.pbanc_rcpt_bgng_dt)} ~ {formatDate(pick.pbanc_rcpt_end_dt)}
            </span>
          </div>
        </div>

        {/* Status buttons */}
        <div className="flex flex-wrap gap-1.5 mb-3 print:hidden">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(String(pick.pbanc_sn), s)}
              className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                pick.status === s
                  ? `${STATUS_COLORS[s].border} ${STATUS_COLORS[s].bg} ${STATUS_COLORS[s].text}`
                  : "border-zinc-800 bg-zinc-900 text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Memo */}
        <div className="print:hidden">
          {editingMemo ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={memoValue}
                onChange={(e) => setMemoValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleMemoSave(); }}
                placeholder="메모 입력..."
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={handleMemoSave}
                className="text-[11px] px-2 py-1 rounded border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors"
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => setEditingMemo(false)}
                className="text-[11px] px-2 py-1 rounded border border-zinc-800 bg-zinc-900 text-zinc-600 cursor-pointer transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditingMemo(true)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {pick.memo ? `📝 ${pick.memo}` : "+ 메모 추가"}
            </button>
          )}
        </div>

        {pick.detl_pg_url && (
          <div className="mt-3 pt-3 border-t border-zinc-800/60">
            <a
              href={pick.detl_pg_url}
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

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function MyPicksPage() {
  const [picks, setPicks] = useState<Record<string, PickedAnnouncement>>(
    () => loadPicks(),
  );

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

  const handleRemove = useCallback((sn: string) => {
    setPicks((prev) => {
      const next = { ...prev };
      delete next[sn];
      savePicks(next);
      return next;
    });
  }, []);

  const handleMemoChange = useCallback((sn: string, memo: string) => {
    setPicks((prev) => {
      const existing = prev[sn];
      if (!existing) return prev;
      const next = {
        ...prev,
        [sn]: { ...existing, memo: memo || undefined },
      };
      savePicks(next);
      return next;
    });
  }, []);

  // ---- derived data ----

  const allPicks = useMemo(() => Object.values(picks), [picks]);

  const planningItems = useMemo(
    () =>
      allPicks
        .filter((p) => p.status === "planning")
        .sort(
          (a, b) =>
            (daysRemaining(a.pbanc_rcpt_end_dt) ?? 999) -
            (daysRemaining(b.pbanc_rcpt_end_dt) ?? 999),
        ),
    [allPicks],
  );

  const appliedItems = useMemo(
    () =>
      allPicks
        .filter((p) => p.status === "applied")
        .sort(
          (a, b) =>
            new Date(b.statusChangedAt).getTime() -
            new Date(a.statusChangedAt).getTime(),
        ),
    [allPicks],
  );

  const resultItems = useMemo(
    () =>
      allPicks.filter(
        (p) => p.status === "accepted" || p.status === "rejected",
      ),
    [allPicks],
  );

  const watchingItems = useMemo(
    () => allPicks.filter((p) => p.status === "picked"),
    [allPicks],
  );

  const counts: Record<ApplicationStatus, number> = useMemo(
    () => ({
      picked: watchingItems.length,
      planning: planningItems.length,
      applied: appliedItems.length,
      accepted: resultItems.filter((p) => p.status === "accepted").length,
      rejected: resultItems.filter((p) => p.status === "rejected").length,
    }),
    [watchingItems, planningItems, appliedItems, resultItems],
  );

  function renderSection(
    id: string,
    title: string,
    items: PickedAnnouncement[],
    emptyMessage: string,
    borderColor: string,
  ) {
    return (
      <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
        <h2 className={`text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 ${borderColor}`}>
          {title}
          <span className="ml-3 text-sm font-normal text-zinc-500">
            {items.length}건
          </span>
        </h2>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
            <p className="text-sm text-zinc-500">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((pick) => (
              <PickCard
                key={String(pick.pbanc_sn)}
                pick={pick}
                onStatusChange={handleStatusChange}
                onRemove={handleRemove}
                onMemoChange={handleMemoChange}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <PrivateDocumentShell
      title="내 지원 현황"
      sections={SECTIONS}
      meta={
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span>Pick한 공고의 지원 상태를 추적합니다</span>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/announcements"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            사업공고 트래커
          </Link>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/enterprise_strategy"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Enterprise strategy
          </Link>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/founder-programs"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Founder programs
          </Link>
        </div>
      }
      headerExtras={
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <SummaryCard label="전체 Pick" value={allPicks.length} />
            <SummaryCard
              label="지원예정"
              value={counts.planning}
              tone="text-amber-300"
            />
            <SummaryCard
              label="지원완료"
              value={counts.applied}
              tone="text-violet-300"
            />
            <SummaryCard
              label="합격"
              value={counts.accepted}
              tone="text-emerald-300"
            />
            <SummaryCard
              label="탈락"
              value={counts.rejected}
              tone="text-rose-300"
            />
          </div>

          {allPicks.length === 0 && (
            <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-8 text-center">
              <p className="text-sm text-zinc-400 mb-3">
                아직 Pick한 공고가 없습니다.
              </p>
              <Link
                href="/privacy/announcements"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                사업공고 트래커에서 관심 공고를 Pick하세요 &rarr;
              </Link>
            </div>
          )}
        </>
      }
    >
      <section id="overview" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          1. 현황 요약
        </h2>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5">
          <div className="grid gap-4 sm:grid-cols-5 text-center">
            {STATUS_ORDER.map((s) => {
              const c = STATUS_COLORS[s];
              return (
                <div key={s}>
                  <p className={`text-2xl font-semibold ${c.text}`}>
                    {counts[s]}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {STATUS_LABELS[s]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {renderSection(
        "planning",
        "2. 지원예정",
        planningItems,
        "지원예정으로 표시된 공고가 없습니다.",
        "border-amber-500",
      )}

      {renderSection(
        "applied",
        "3. 지원완료",
        appliedItems,
        "지원완료 공고가 없습니다.",
        "border-violet-500",
      )}

      {renderSection(
        "results",
        "4. 결과",
        resultItems,
        "합격/탈락 결과가 없습니다.",
        "border-emerald-500",
      )}

      {renderSection(
        "watching",
        "5. 관심 목록",
        watchingItems,
        "관심 목록에 공고가 없습니다.",
        "border-zinc-500",
      )}
    </PrivateDocumentShell>
  );
}
