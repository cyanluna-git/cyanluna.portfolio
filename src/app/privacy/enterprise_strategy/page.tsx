"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import {
  enterpriseStrategyWorkspaceData,
  STRATEGY_STATUS_META,
} from "@/data/private";
import type {
  StrategyArchitectureLayer,
  StrategyEvidenceItem,
  StrategyPathOption,
  StrategyRoadmapPhase,
} from "@/types/enterprise-strategy";

const STORAGE_KEY = "enterprise-strategy-checklist";
const LAST_REVIEWED_KEY = "enterprise-strategy-last-reviewed";

const SECTIONS: PrivateNavSection[] = [
  { id: "overview", label: "1. 개요" },
  { id: "assessment", label: "2. 포지셔닝 평가" },
  { id: "evidence", label: "3. 근거와 주장" },
  { id: "architecture", label: "4. 구조 프레임" },
  { id: "roadmap", label: "5. 전환 로드맵" },
  { id: "paths", label: "6. 전략 분기" },
  { id: "review", label: "7. 검토 체크" },
];

function loadChecklist(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveChecklist(next: Record<string, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable
  }
}

function loadLastReviewed(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(LAST_REVIEWED_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveLastReviewed(value: string): void {
  try {
    localStorage.setItem(LAST_REVIEWED_KEY, value);
  } catch {
    // localStorage unavailable
  }
}

function StatusPill({ status }: { status: keyof typeof STRATEGY_STATUS_META }) {
  const meta = STRATEGY_STATUS_META[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.tone}`}
    >
      {meta.label}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[28px] border border-zinc-800 bg-zinc-950/90 px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold tracking-tight text-zinc-100">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{note}</p>
    </div>
  );
}

function EvidenceCard({ item }: { item: StrategyEvidenceItem }) {
  return (
    <article className="rounded-[30px] border border-zinc-800 bg-[linear-gradient(180deg,rgba(24,24,27,0.94),rgba(9,9,11,0.94))] px-5 py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
            근거 블록
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {item.title}
          </h3>
        </div>
        <StatusPill status={item.status} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
          왜 중요한가
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">{item.proof}</p>
      </div>
      {item.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

function LayerCard({ layer }: { layer: StrategyArchitectureLayer }) {
  return (
    <article className="rounded-[30px] border border-zinc-800 bg-zinc-950/90 px-5 py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
            아키텍처 레이어
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {layer.name}
          </h3>
        </div>
        <StatusPill status={layer.status} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{layer.description}</p>
      <ul className="mt-4 space-y-2">
        {layer.notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function RoadmapCard({ phase }: { phase: StrategyRoadmapPhase }) {
  return (
    <article className="rounded-[30px] border border-zinc-800 bg-zinc-950/85 px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
            {phase.window}
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {phase.phase}
          </h3>
        </div>
        <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-mono text-zinc-400">
          실행 단계
        </div>
      </div>
      <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-200">
        {phase.objective}
      </p>
      <ul className="mt-4 space-y-2">
        {phase.moves.map((move) => (
          <li key={move} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <span>{move}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PathCard({ option }: { option: StrategyPathOption }) {
  return (
    <article className="rounded-[30px] border border-zinc-800 bg-zinc-950/90 px-5 py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
            전략 분기
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
            {option.name}
          </h3>
        </div>
        <StatusPill status={option.status} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{option.thesis}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-300/80 mb-2">
            기대효과
          </p>
          <ul className="space-y-2">
            {option.pros.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-500/15 bg-rose-500/5 px-4 py-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-rose-300/80 mb-2">
            리스크
          </p>
          <ul className="space-y-2">
            {option.risks.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function EnterpriseStrategyPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    () => loadChecklist(),
  );
  const [lastReviewed, setLastReviewed] = useState(() => loadLastReviewed());

  const completedCount = useMemo(
    () =>
      enterpriseStrategyWorkspaceData.validationChecklist.filter(
        (_, index) => checkedState[`check-${index}`],
      ).length,
    [checkedState],
  );

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: checked };
      saveChecklist(next);
      return next;
    });
  }, []);

  const handleMarkReviewed = useCallback(() => {
    const value = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastReviewed(value);
    saveLastReviewed(value);
  }, []);

  return (
    <PrivateDocumentShell
      title={enterpriseStrategyWorkspaceData.title}
      sections={SECTIONS}
      meta={
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">업데이트 {enterpriseStrategyWorkspaceData.updatedAt}</span>
          <span className="text-zinc-700">|</span>
          <span>{enterpriseStrategyWorkspaceData.subtitle}</span>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            커리어 진단
          </Link>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/founder-programs"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            창업 프로그램
          </Link>
        </div>
      }
      headerExtras={
        <>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              마지막 검토: {lastReviewed || "—"}
            </span>
            <button
              type="button"
              onClick={handleMarkReviewed}
              className="text-[11px] px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer print:hidden"
            >
              오늘 검토 완료
            </button>
          </div>

          <div className="mt-6 rounded-[32px] border border-zinc-800 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_38%),linear-gradient(180deg,rgba(24,24,27,0.92),rgba(9,9,11,0.96))] px-6 py-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-zinc-500 mb-3">
                  Private strategy frame
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                  기존 산업 실증을 하나의 엔터프라이즈 전략으로 묶기.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {enterpriseStrategyWorkspaceData.note}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/20 px-4 py-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
                  검토 진행도
                </p>
                <p className="text-3xl font-semibold tracking-tight text-zinc-100">
                  {completedCount}/{enterpriseStrategyWorkspaceData.validationChecklist.length}
                </p>
                <p className="mt-2 text-sm text-zinc-400">검토 체크 완료</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {enterpriseStrategyWorkspaceData.summaryCards.map((card) => (
                <SummaryCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  note={card.note}
                />
              ))}
            </div>
          </div>
        </>
      }
    >
      <section id="overview" className="scroll-mt-24">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {enterpriseStrategyWorkspaceData.narratives.map((item) => (
            <article
              key={item.title}
              className="rounded-[30px] border border-zinc-800 bg-zinc-950/85 px-5 py-5"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-3">
                {item.eyebrow}
              </p>
              <h2 className="text-xl font-bold tracking-tight text-zinc-100">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="assessment" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-cyan-500">
          2. 포지셔닝 평가
        </h2>
        <div className="rounded-[30px] border border-zinc-800 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_34%),linear-gradient(180deg,rgba(24,24,27,0.94),rgba(9,9,11,0.94))] px-5 py-5">
          <p className="text-lg font-semibold tracking-tight text-zinc-100">
            {enterpriseStrategyWorkspaceData.assessment.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {enterpriseStrategyWorkspaceData.assessment.summary}
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[26px] border border-emerald-500/15 bg-emerald-500/5 px-4 py-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-300/80 mb-3">
                강점
              </p>
              <ul className="space-y-2">
                {enterpriseStrategyWorkspaceData.assessment.strengths.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[26px] border border-amber-500/15 bg-amber-500/5 px-4 py-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300/80 mb-3">
                보완 포인트
              </p>
              <ul className="space-y-2">
                {enterpriseStrategyWorkspaceData.assessment.gaps.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[26px] border border-cyan-500/15 bg-cyan-500/5 px-4 py-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-300/80 mb-3">
                권장 포지셔닝
              </p>
              <ul className="space-y-2">
                {enterpriseStrategyWorkspaceData.assessment.positioning.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="evidence" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          3. 현재 근거와 전략 주장
        </h2>
        <div className="space-y-4">
          {enterpriseStrategyWorkspaceData.evidenceItems.map((item) => (
            <EvidenceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="architecture" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-sky-500">
          4. 엔터프라이즈 구조 프레이밍
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {enterpriseStrategyWorkspaceData.architectureLayers.map((layer) => (
            <LayerCard key={layer.id} layer={layer} />
          ))}
        </div>
      </section>

      <section id="roadmap" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-amber-500">
          5. 전환 로드맵
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {enterpriseStrategyWorkspaceData.roadmap.map((phase) => (
            <RoadmapCard key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      <section id="paths" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-violet-500">
          6. 전략 분기
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {enterpriseStrategyWorkspaceData.pathOptions.map((option) => (
            <PathCard key={option.id} option={option} />
          ))}
        </div>
      </section>

      <section id="review" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-emerald-500">
          7. 검토 체크리스트
        </h2>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950/85 px-5 py-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">
              검증 체크리스트
            </p>
            <div className="space-y-3">
              {enterpriseStrategyWorkspaceData.validationChecklist.map((item, index) => {
                const id = `check-${index}`;
                const checked = Boolean(checkedState[id]);
                return (
                  <label
                    key={id}
                    className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => handleToggle(id, event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-zinc-600 bg-transparent accent-blue-500"
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        checked ? "line-through text-zinc-600" : "text-zinc-300"
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="rounded-[30px] border border-zinc-800 bg-zinc-950/85 px-5 py-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 mb-4">
              관련 프로젝트
            </p>
            <div className="space-y-3">
              <Link
                href="/projects/smart-factory-qc"
                className="block rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors hover:border-zinc-700"
              >
                <p className="text-sm font-medium text-zinc-200">Smart Factory QC</p>
                <p className="mt-1 text-sm text-zinc-500">
                  품질 실행 근거
                </p>
              </Link>
              <Link
                href="/projects/equipment-gateway"
                className="block rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors hover:border-zinc-700"
              >
                <p className="text-sm font-medium text-zinc-200">Equipment Gateway</p>
                <p className="mt-1 text-sm text-zinc-500">
                  설비 텔레메트리 근거
                </p>
              </Link>
              <Link
                href="/projects/resource-board"
                className="block rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-colors hover:border-zinc-700"
              >
                <p className="text-sm font-medium text-zinc-200">
                  Engineering Resource Board
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  리소스 가시성 근거
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PrivateDocumentShell>
  );
}
