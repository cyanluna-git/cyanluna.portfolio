"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import { founderWorkspaceData } from "@/data/private";
import type {
  EmploymentCompatibility,
  FounderProgram,
  FounderStage,
  FounderTimelineMilestone,
  PlanningHorizon,
} from "@/types/founder-program";

const TRACKER_STORAGE_KEY = "founder-program-progress";
const LAST_REVIEWED_KEY = "founder-program-last-reviewed";

const SECTIONS: PrivateNavSection[] = [
  { id: "overview", label: "1. 운영 원칙" },
  { id: "timeline", label: "2. 시계열" },
  { id: "programs", label: "3. 프로그램" },
  { id: "documents", label: "4. 문서 자산" },
  { id: "tracking", label: "5. 실행 체크" },
];

const stageLabel: Record<FounderStage, string> = {
  idea: "아이디어 단계",
  "pre-incorporation": "예비창업",
  incorporation: "사업자 전환 전후",
  "post-incorporation": "초기창업",
  "investment-ready": "투자 연계",
};

const compatibilityLabel: Record<EmploymentCompatibility, string> = {
  friendly: "재직 유지 친화",
  conditional: "조건부 가능",
  "transition-required": "전환 필요",
};

const compatibilityTone: Record<EmploymentCompatibility, string> = {
  friendly: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  conditional: "border-amber-500/20 bg-amber-500/10 text-amber-200",
  "transition-required": "border-rose-500/20 bg-rose-500/10 text-rose-200",
};

const horizonLabel: Record<PlanningHorizon, string> = {
  now: "지금",
  next: "다음",
  later: "후순위",
};

const horizonTone: Record<PlanningHorizon, string> = {
  now: "border-blue-500/20 bg-blue-500/10 text-blue-200",
  next: "border-zinc-700 bg-zinc-900 text-zinc-300",
  later: "border-zinc-800 bg-zinc-950 text-zinc-500",
};

const horizonRank: Record<PlanningHorizon, number> = {
  now: 0,
  next: 1,
  later: 2,
};

function loadCheckedState(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(TRACKER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveCheckedState(state: Record<string, boolean>): void {
  try {
    localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

function loadLastReviewed(): string {
  if (typeof window === "undefined") {
    return "";
  }

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

function programDocumentKey(programSlug: string, id: string): string {
  return `doc:${programSlug}:${id}`;
}

function programActionKey(programSlug: string, id: string): string {
  return `action:${programSlug}:${id}`;
}

function templateDocumentKey(id: string): string {
  return `template:${id}`;
}

function ProgressCheckbox({
  checked,
  onChange,
  label,
  description,
  badge,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
  badge: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 cursor-pointer">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-zinc-600 bg-transparent accent-blue-500"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className={`text-sm font-medium ${
                checked ? "line-through text-zinc-500" : "text-zinc-200"
              }`}
            >
              {label}
            </p>
            {badge}
          </div>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              checked ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </label>
  );
}

function TimelineCard({ milestone }: { milestone: FounderTimelineMilestone }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5">
      <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
        {milestone.period}
      </p>
      <h3 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
        {milestone.label}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">{milestone.focus}</p>
    </div>
  );
}

function ProgramCard({
  program,
  checkedState,
  onToggle,
}: {
  program: FounderProgram;
  checkedState: Record<string, boolean>;
  onToggle: (id: string, checked: boolean) => void;
}) {
  const completedDocuments = program.documents.filter((document) =>
    checkedState[programDocumentKey(program.slug, document.id)]
  ).length;
  const completedActions = program.actions.filter((action) =>
    checkedState[programActionKey(program.slug, action.id)]
  ).length;

  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-950/85 overflow-hidden">
      <div className="border-b border-zinc-800 bg-zinc-900/70 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] font-mono text-zinc-400">
                {stageLabel[program.stage]}
              </span>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${compatibilityTone[program.employmentCompatibility]}`}
              >
                {compatibilityLabel[program.employmentCompatibility]}
              </span>
              <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] font-mono text-zinc-500">
                문서 {completedDocuments}/{program.documents.length} · 액션{" "}
                {completedActions}/{program.actions.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
              {program.order}. {program.name}
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              {program.operator} · {program.typicalWindow}
            </p>
          </div>
          <div className="max-w-sm text-sm text-zinc-400 leading-relaxed">
            {program.summary}
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[1.2fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Why this matters
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {program.positioning}
            </p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Employment note
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {program.employmentNote}
            </p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Strategy
            </p>
            <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
              {program.strategy.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Documents to prepare
            </p>
            <div className="space-y-3">
              {program.documents.map((document) => (
                <ProgressCheckbox
                  key={document.id}
                  checked={Boolean(
                    checkedState[programDocumentKey(program.slug, document.id)],
                  )}
                  onChange={(checked) =>
                    onToggle(programDocumentKey(program.slug, document.id), checked)
                  }
                  label={document.title}
                  description={document.description}
                  badge={
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[document.recommendedWhen]}`}
                    >
                      {horizonLabel[document.recommendedWhen]}
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Next moves
            </p>
            <div className="space-y-3">
              {program.actions.map((action) => (
                <ProgressCheckbox
                  key={action.id}
                  checked={Boolean(
                    checkedState[programActionKey(program.slug, action.id)],
                  )}
                  onChange={(checked) =>
                    onToggle(programActionKey(program.slug, action.id), checked)
                  }
                  label={action.title}
                  description={action.description}
                  badge={
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[action.horizon]}`}
                    >
                      {horizonLabel[action.horizon]}
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Watchouts
            </p>
            <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
              {program.cautionSignals.map((signal) => (
                <li key={signal} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Official links
            </p>
            <div className="flex flex-col gap-2">
              {program.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
                >
                  <span className="block font-medium">{source.label}</span>
                  <span className="block text-xs text-zinc-500 mt-1">
                    확인일 {source.checkedAt}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FounderProgramsPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    () => loadCheckedState(),
  );
  const [lastReviewed, setLastReviewed] = useState(() => loadLastReviewed());

  const handleToggle = useCallback((id: string, checked: boolean) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: checked };
      saveCheckedState(next);
      return next;
    });
  }, []);

  const handleMarkReviewed = useCallback(() => {
    const reviewedAt = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastReviewed(reviewedAt);
    saveLastReviewed(reviewedAt);
  }, []);

  const friendlyPrograms = founderWorkspaceData.programs.filter(
    (program) => program.employmentCompatibility === "friendly",
  ).length;

  const allTrackedActions = founderWorkspaceData.programs.flatMap((program) =>
    program.actions.map((action) => ({
      id: programActionKey(program.slug, action.id),
      title: action.title,
      description: action.description,
      horizon: action.horizon,
      group: program.name,
    })),
  );

  const allTrackedDocuments = [
    ...founderWorkspaceData.documentTemplates.map((document) => ({
      id: templateDocumentKey(document.id),
      title: document.title,
      description: document.purpose,
      horizon: "now" as const,
      group: "공통 문서 자산",
    })),
    ...founderWorkspaceData.programs.flatMap((program) =>
      program.documents.map((document) => ({
        id: programDocumentKey(program.slug, document.id),
        title: document.title,
        description: document.description,
        horizon: document.recommendedWhen,
        group: program.name,
      })),
    ),
  ];

  const pendingActions = allTrackedActions
    .filter((item) => !checkedState[item.id])
    .sort((left, right) => horizonRank[left.horizon] - horizonRank[right.horizon]);

  const pendingDocuments = allTrackedDocuments
    .filter((item) => !checkedState[item.id])
    .sort((left, right) => horizonRank[left.horizon] - horizonRank[right.horizon]);

  const totalTrackedCount =
    allTrackedActions.length + allTrackedDocuments.length;
  const completedTrackedCount =
    Object.entries(checkedState).filter(([, checked]) => checked).length;

  return (
    <PrivateDocumentShell
      title="Founder Program Strategy Workspace"
      sections={SECTIONS}
      meta={
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="font-mono">Updated {founderWorkspaceData.updatedAt}</span>
          <span className="text-zinc-700">|</span>
          <span>직장 유지 상태에서 준비 가능한 창업지원 루트 정리</span>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Career assessment 보기
          </Link>
          <span className="text-zinc-700">|</span>
          <Link
            href="/privacy/announcements"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            사업공고 트래커
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
              Last reviewed: {lastReviewed || "—"}
            </span>
            <button
              type="button"
              onClick={handleMarkReviewed}
              className="text-[11px] px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer print:hidden"
            >
              Mark as reviewed today
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-4">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                Planning note
              </p>
              <p className="text-sm leading-relaxed text-zinc-300">
                {founderWorkspaceData.note}
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                Programs tracked
              </p>
              <p className="text-3xl font-semibold text-zinc-100">
                {founderWorkspaceData.programs.length}
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                Job-friendly first
              </p>
              <p className="text-3xl font-semibold text-zinc-100">{friendlyPrograms}</p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                Tracker progress
              </p>
              <p className="text-3xl font-semibold text-zinc-100">
                {completedTrackedCount}/{totalTrackedCount}
              </p>
            </div>
          </div>
        </>
      }
    >
      <section id="overview" className="scroll-mt-24">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-3">
              Operating rules
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-300">
              {founderWorkspaceData.strategyRules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-5">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-3">
              Reading order
            </p>
            <ol className="space-y-3 text-sm leading-relaxed text-zinc-300">
              <li>1. 재직 중 준비 가능한 프로그램부터 검토한다.</li>
              <li>2. 각 프로그램마다 공통 서류를 어떻게 재사용할지 기록한다.</li>
              <li>3. 전업 전환이 필요한 시점을 별도로 표시한다.</li>
              <li>4. TIPS는 직접 출발점이 아니라 후속 단계로 본다.</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="timeline" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          2. 시계열 실행 흐름
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {founderWorkspaceData.timeline.map((milestone) => (
            <TimelineCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      <section id="programs" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          3. 프로그램별 전략
        </h2>
        <div className="space-y-6">
          {founderWorkspaceData.programs.map((program) => (
            <ProgramCard
              key={program.slug}
              program={program}
              checkedState={checkedState}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>

      <section id="documents" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          4. 공통 문서 자산
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {founderWorkspaceData.documentTemplates.map((document) => (
            <ProgressCheckbox
              key={document.id}
              checked={Boolean(checkedState[templateDocumentKey(document.id)])}
              onChange={(checked) =>
                handleToggle(templateDocumentKey(document.id), checked)
              }
              label={document.title}
              description={`${document.purpose} · ${document.bullets.join(" / ")}`}
              badge={
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone.now}`}
                >
                  {horizonLabel.now}
                </span>
              }
            />
          ))}
        </div>
      </section>

      <section id="tracking" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          5. 실행 체크
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500">
                  Pending actions
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  아직 체크하지 않은 실행 항목
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {pendingActions.length} remaining
              </span>
            </div>
            <div className="space-y-3">
              {pendingActions.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[item.horizon]}`}
                    >
                      {horizonLabel[item.horizon]}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{item.group}</p>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
              {pendingActions.length === 0 ? (
                <p className="text-sm text-zinc-500">모든 액션을 체크했습니다.</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500">
                  Draft queue
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  아직 쓰지 않은 문서 초안
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {pendingDocuments.length} remaining
              </span>
            </div>
            <div className="space-y-3">
              {pendingDocuments.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[item.horizon]}`}
                    >
                      {horizonLabel[item.horizon]}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{item.group}</p>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
              {pendingDocuments.length === 0 ? (
                <p className="text-sm text-zinc-500">모든 문서 항목을 체크했습니다.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </PrivateDocumentShell>
  );
}
