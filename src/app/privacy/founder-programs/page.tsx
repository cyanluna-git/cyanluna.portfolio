import Link from "next/link";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";
import { founderWorkspaceData } from "@/data/private";
import type {
  EmploymentCompatibility,
  FounderProgram,
  FounderStage,
  PlanningHorizon,
} from "@/types/founder-program";

const SECTIONS: PrivateNavSection[] = [
  { id: "overview", label: "1. 운영 원칙" },
  { id: "timeline", label: "2. 시계열" },
  { id: "programs", label: "3. 프로그램" },
  { id: "documents", label: "4. 문서 자산" },
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

function ProgramCard({ program }: { program: FounderProgram }) {
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
                <div
                  key={document.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-200">
                      {document.title}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[document.recommendedWhen]}`}
                    >
                      {horizonLabel[document.recommendedWhen]}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {document.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Next moves
            </p>
            <div className="space-y-3">
              {program.actions.map((action) => (
                <div
                  key={action.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-200">
                      {action.title}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${horizonTone[action.horizon]}`}
                    >
                      {horizonLabel[action.horizon]}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                    {action.description}
                  </p>
                </div>
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
  const friendlyPrograms = founderWorkspaceData.programs.filter(
    (program) => program.employmentCompatibility === "friendly",
  ).length;

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
        </div>
      }
      headerExtras={
        <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
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
        </div>
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
            <div
              key={milestone.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5"
            >
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                {milestone.period}
              </p>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
                {milestone.label}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {milestone.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          3. 프로그램별 전략
        </h2>
        <div className="space-y-6">
          {founderWorkspaceData.programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <section id="documents" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold tracking-tight mb-5 pl-4 border-l-4 border-blue-500">
          4. 공통 문서 자산
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {founderWorkspaceData.documentTemplates.map((document) => (
            <article
              key={document.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/80 px-5 py-5"
            >
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500 mb-2">
                Shared asset
              </p>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
                {document.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 mb-4">
                {document.purpose}
              </p>
              <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                {document.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PrivateDocumentShell>
  );
}
