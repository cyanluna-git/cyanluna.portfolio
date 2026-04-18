"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  curationTracks,
  featuredProjects,
  projects,
  verticals,
  type CurationTrack,
  type Project,
  type ProjectAudience,
  type ProjectProof,
} from "@/data/projects";
import Nav from "@/components/Nav";
import AboutSection from "@/components/AboutSection";
import IntersectionSection from "@/components/IntersectionSection";
import ContactSection from "@/components/ContactSection";
import { useInView } from "@/hooks/useInView";

type Lang = "en" | "ko";
type Vertical = keyof typeof verticals;

const t = {
  heroBadge: {
    en: "AI-Native Problem Solver",
    ko: "AI Native 문제 해결자",
  },
  hero: {
    en: "I turn messy operations,\ndata bottlenecks, and industrial constraints\ninto working systems.",
    ko: "복잡한 운영 문제와 데이터 병목,\n산업 현장의 제약을\n작동하는 시스템으로 바꿉니다.",
  },
  sub: {
    en: "AI-native full-stack engineer and strategic program solver building manufacturing DX, internal operating tools, and decision systems that teams can use immediately.",
    ko: "제조 DX, 내부 운영 도구, 의사결정 시스템을 빠르게 제품화하는 AI Native 풀스택 엔지니어이자 전략적 프로그램 솔버입니다.",
  },
  pills: {
    manufacturing: {
      en: "Manufacturing DX systems",
      ko: "제조 DX 시스템",
    },
    tooling: {
      en: "Rapid data and ops tooling",
      ko: "빠른 데이터·운영 도구 제작",
    },
  },
  ctas: {
    featured: {
      en: "See featured work",
      ko: "추천 작업 보기",
    },
    browseAll: {
      en: "Browse all projects",
      ko: "전체 프로젝트 보기",
    },
  },
  featured: {
    eyebrow: { en: "Featured Proof", ko: "Featured Proof" },
    title: {
      en: "Three projects that explain the portfolio faster than a long bio.",
      ko: "긴 자기소개보다 빠르게 포트폴리오를 설명해주는 대표 프로젝트 3개입니다.",
    },
    sub: {
      en: "These are the strongest entry points if you want to understand enterprise systems, AI orchestration, and delivery quality.",
      ko: "엔터프라이즈 시스템, AI 오케스트레이션, 전달 품질을 빠르게 이해하려면 여기서 시작하는 편이 가장 좋습니다.",
    },
    why: { en: "Why start here", ko: "왜 먼저 봐야 하나" },
    rank: { en: "Featured", ko: "추천" },
  },
  browse: {
    title: { en: "Browse All Work", ko: "전체 프로젝트 둘러보기" },
    sub: {
      en: "After the curated entry, browse the rest by strategic track or domain.",
      ko: "추천 진입 이후에는 전략 트랙이나 도메인 기준으로 나머지 프로젝트를 둘러볼 수 있습니다.",
    },
    allTracks: { en: "All tracks", ko: "전체 트랙" },
    allVerticals: { en: "All domains", ko: "전체 도메인" },
    currentTrack: { en: "Current track", ko: "현재 트랙" },
    currentDomain: { en: "현재 도메인", ko: "현재 도메인" },
    clear: { en: "Clear filters", ko: "필터 초기화" },
    results: {
      en: "projects shown",
      ko: "개 프로젝트 표시",
    },
  },
  proofLabel: {
    system: { en: "System", ko: "System" },
    automation: { en: "Automation", ko: "Automation" },
    analytics: { en: "Analytics", ko: "Analytics" },
    agentic: { en: "Agentic", ko: "Agentic" },
  },
  audienceLabel: {
    leadership: { en: "Leadership", ko: "리더십" },
    ops: { en: "Ops", ko: "운영" },
    engineering: { en: "Engineering", ko: "엔지니어링" },
    product: { en: "Product", ko: "프로덕트" },
  },
  status: {
    live: { en: "Live", ko: "운영 중" },
    active: { en: "In Development", ko: "개발 중" },
    beta: { en: "Beta", ko: "베타" },
  },
  viewDetails: { en: "View Details →", ko: "자세히 보기 →" },
  comingSoon: { en: "Coming Soon", ko: "준비중" },
  footer: {
    en: "Built with curiosity across domains.",
    ko: "도메인을 넘나드는 호기심으로 만들었습니다.",
  },
};

function StatusBadge({ status, lang }: { status: Project["status"]; lang: Lang }) {
  const colors = {
    live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    active: "bg-blue-500/15 text-blue-400 border-blue-400/20",
    beta: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border whitespace-nowrap ${colors[status]}`}>
      {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {t.status[status][lang]}
    </span>
  );
}

function ProofBadge({ proof, lang }: { proof: ProjectProof; lang: Lang }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
      {t.proofLabel[proof][lang]}
    </span>
  );
}

function AudiencePills({ audience, lang }: { audience: ProjectAudience[]; lang: Lang }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {audience.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium text-muted"
        >
          {t.audienceLabel[item][lang]}
        </span>
      ))}
    </div>
  );
}

/* ── Icon-flow visuals for projects with no screenshots ─────────── */

type IconPath = { d: string; clip?: string };

const ICON_PATHS: Record<string, IconPath[]> = {
  Terminal: [
    { d: "M4 17l6-6-6-6" },
    { d: "M12 19h8" },
  ],
  Sparkles: [
    { d: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" },
  ],
  Cpu: [
    { d: "M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3v2M15 3h2a2 2 0 012 2v2M15 3v2M21 9v6M21 15v2a2 2 0 01-2 2h-2M21 15h-2M3 9v6M3 15v2a2 2 0 002 2h2M3 15h2M9 21h6M9 21v-2M15 21v-2M9 9h6v6H9z" },
  ],
  ShieldCheck: [
    { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { d: "M9 12l2 2 4-4" },
  ],
  Cloud: [
    { d: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" },
  ],
  FileCode: [
    { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" },
    { d: "M14 2v6h6" },
    { d: "M10 13l-2 2 2 2" },
    { d: "M14 13l2 2-2 2" },
  ],
  Activity: [
    { d: "M22 12h-4l-3 9L9 3l-3 9H2" },
  ],
  Users: [
    { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" },
    { d: "M9 11a4 4 0 100-8 4 4 0 000 8z" },
    { d: "M23 21v-2a4 4 0 00-3-3.87" },
    { d: "M16 3.13a4 4 0 010 7.75" },
  ],
  Calendar: [
    { d: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" },
    { d: "M16 2v4M8 2v4M3 10h18" },
  ],
  GitPR: [
    { d: "M18 15a3 3 0 100 6 3 3 0 000-6z" },
    { d: "M6 3a3 3 0 100 6 3 3 0 000-6z" },
    { d: "M13 6h3a2 2 0 012 2v7" },
    { d: "M6 9v12" },
  ],
  Search: [
    { d: "M21 21l-4.35-4.35" },
    { d: "M17 11A6 6 0 105 11a6 6 0 0012 0z" },
  ],
  MessageSquare: [
    { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
  ],
  Layout: [
    { d: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" },
    { d: "M3 9h18M9 21V9" },
  ],
  Bell: [
    { d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" },
    { d: "M13.73 21a2 2 0 01-3.46 0" },
  ],
  ArrowRight: [
    { d: "M5 12h14M12 5l7 7-7 7" },
  ],
};

function SvgIcon({ name, size = 20 }: { name: string; size?: number }) {
  const paths = ICON_PATHS[name] ?? [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} />
      ))}
    </svg>
  );
}

type IconFlowStep = { icon: string; label: { en: string; ko: string } };

const PROJECT_ICON_FLOWS: Record<string, IconFlowStep[]> = {
  moru: [
    { icon: "Terminal", label: { en: "LLM Control", ko: "LLM 제어" } },
    { icon: "Sparkles", label: { en: "AI Planning", ko: "AI 기획" } },
    { icon: "Cpu", label: { en: "MES Execution", ko: "MES 실행" } },
  ],
  "smart-factory-qc": [
    { icon: "Cpu", label: { en: "Equipment", ko: "장비" } },
    { icon: "ShieldCheck", label: { en: "BDD Tests", ko: "BDD 검증" } },
    { icon: "Cloud", label: { en: "Digital Record", ko: "디지털 기록" } },
  ],
  "equipment-gateway": [
    { icon: "FileCode", label: { en: "YAML Config", ko: "YAML 설정" } },
    { icon: "ArrowRight", label: { en: "Gateway", ko: "게이트웨이" } },
    { icon: "Activity", label: { en: "Time-series", ko: "시계열" } },
  ],
  "resource-board": [
    { icon: "Users", label: { en: "Org Structure", ko: "조직 구조" } },
    { icon: "Calendar", label: { en: "Planning", ko: "일정 계획" } },
    { icon: "Sparkles", label: { en: "AI Parser", ko: "AI 파서" } },
  ],
  "code-review-suite": [
    { icon: "GitPR", label: { en: "Pull Request", ko: "PR" } },
    { icon: "Search", label: { en: "AI Lens", ko: "AI 분석" } },
    { icon: "MessageSquare", label: { en: "Review", ko: "리뷰" } },
  ],
  javis: [
    { icon: "Layout", label: { en: "Jira", ko: "Jira" } },
    { icon: "ArrowRight", label: { en: "Bridge", ko: "브릿지" } },
    { icon: "Bell", label: { en: "Slack Alerts", ko: "슬랙 알림" } },
  ],
};

function ProjectIconVisual({ project, lang }: { project: Project; lang: Lang }) {
  const vColor = verticals[project.vertical].color;
  const steps = PROJECT_ICON_FLOWS[project.id];

  if (!steps) return null;

  return (
    <div
      className="flex aspect-video items-center justify-center gap-0"
      style={{ backgroundColor: `${vColor}08` }}
    >
      {steps.map((step, i) => (
        <div key={step.icon} className="flex items-center">
          <div className="flex flex-col items-center gap-2 px-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: `${vColor}15`,
                borderColor: `${vColor}30`,
                color: vColor,
              }}
            >
              <SvgIcon name={step.icon} size={22} />
            </div>
            <span className="text-[10px] font-medium text-zinc-400 whitespace-nowrap">
              {step.label[lang]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-zinc-600"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Project media: static first-frame for sequences, icon for no-media ── */

function ProjectMediaArea({ project, lang }: { project: Project; lang: Lang }) {
  const media = project.media;

  if (media) {
    const { type, src, poster } = media;

    if (type === "video") {
      return (
        <div className="aspect-video overflow-hidden bg-black">
          <video autoPlay muted loop playsInline poster={poster} className="w-full h-full object-cover">
            <source src={src} type="video/mp4" />
          </video>
        </div>
      );
    }

    if (type === "sequence" && media.frames && media.frames.length > 0) {
      return (
        <div className="relative aspect-video overflow-hidden bg-black">
          <Image
            src={media.frames[0]}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="eager"
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="aspect-video overflow-hidden bg-black">
        <Image
          src={src!}
          alt=""
          width={640}
          height={360}
          loading="lazy"
          unoptimized={type === "gif"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return <ProjectIconVisual project={project} lang={lang} />;
}

function ProjectCardInner({ project, lang }: { project: Project; lang: Lang }) {
  const vColor = verticals[project.vertical].color;
  const highlights = project.highlights[lang].slice(0, 2);
  const track = curationTracks[project.curation.track];

  return (
    <>
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${vColor}4d, transparent)` }}
      />
      <ProjectMediaArea project={project} lang={lang} />

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: vColor }} />
                {track.label[lang]}
              </span>
              <ProofBadge proof={project.curation.proof} lang={lang} />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{project.title[lang]}</h3>
          </div>
          <StatusBadge status={project.status} lang={lang} />
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.curation.quickPitch[lang]}</p>

        <ul className="space-y-2 text-sm text-zinc-300">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: vColor }} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-between gap-3">
          <AudiencePills audience={project.curation.audience} lang={lang} />
          {project.hasDetailPage ? (
            <span className="text-xs font-medium transition-colors" style={{ color: vColor }}>
              {t.viewDetails[lang]}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-muted">
              {t.comingSoon[lang]}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const cardClass = `group relative block overflow-hidden rounded-[28px] border border-border bg-surface/95 shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-300 ${
    project.hasDetailPage ? "hover:-translate-y-1 hover:border-white/20" : "opacity-60"
  }`;

  if (project.hasDetailPage) {
    return (
      <Link href={`/projects/${project.id}`} data-vertical={project.vertical} className={cardClass}>
        <ProjectCardInner project={project} lang={lang} />
      </Link>
    );
  }

  return (
    <div data-vertical={project.vertical} className={cardClass} aria-disabled="true">
      <ProjectCardInner project={project} lang={lang} />
    </div>
  );
}

function CuratedEntrySection({
  lang,
  onSelectTrack,
}: {
  lang: Lang;
  onSelectTrack: (track: CurationTrack) => void;
}) {
  const [ref, inView] = useInView();

  return (
    <section
      id="featured"
      ref={ref as React.RefObject<HTMLElement>}
      className="border-t border-border px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className={`scroll-fade ${inView ? "in-view" : ""}`}>
          <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#b87749]">
            {t.featured.eyebrow[lang]}
          </div>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold tracking-tight sm:text-4xl">
            {t.featured.title[lang]}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {t.featured.sub[lang]}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {(["enterprise", "ai", "data"] as const).map((trackKey) => (
            <button
              key={trackKey}
              type="button"
              data-testid={`guided-path-${trackKey}`}
              onClick={() => onSelectTrack(trackKey)}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-white/20 hover:bg-surface-hover"
            >
              {curationTracks[trackKey].label[lang]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => {
            const vColor = verticals[project.vertical].color;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                data-testid={`featured-project-${project.id}`}
                className={`group relative overflow-hidden rounded-[30px] border border-border bg-surface/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 scroll-fade stagger-${Math.min(index + 1, 3)} ${inView ? "in-view" : ""}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${vColor}, transparent)` }}
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                      {t.featured.rank[lang]} {project.curation.featuredRank}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight">{project.title[lang]}</h3>
                  </div>
                  <StatusBadge status={project.status} lang={lang} />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{project.curation.quickPitch[lang]}</p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/5">
                  <ProjectMediaArea project={project} lang={lang} />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                    {curationTracks[project.curation.track].label[lang]}
                  </span>
                  <ProofBadge proof={project.curation.proof} lang={lang} />
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-background/65 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
                    {t.featured.why[lang]}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.curation.whyStartHere[lang]}</p>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <AudiencePills audience={project.curation.audience} lang={lang} />
                  <span className="text-xs font-medium" style={{ color: vColor }}>
                    {t.viewDetails[lang]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({
  lang,
  verticalFilter,
  setVerticalFilter,
  trackFilter,
  setTrackFilter,
  filtered,
}: {
  lang: Lang;
  verticalFilter: Vertical | "all";
  setVerticalFilter: (v: Vertical | "all") => void;
  trackFilter: CurationTrack | "all";
  setTrackFilter: (v: CurationTrack | "all") => void;
  filtered: Project[];
}) {
  const [ref, inView] = useInView();

  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} className="border-t border-border px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className={`scroll-fade ${inView ? "in-view" : ""}`}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">{t.browse.title[lang]}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {t.browse.sub[lang]}
          </p>
        </div>

        <div className={`mt-8 rounded-[28px] border border-border bg-surface/90 p-5 scroll-fade ${inView ? "in-view" : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTrackFilter("all")}
              className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                trackFilter === "all"
                  ? "border-white/20 bg-white/10 text-foreground"
                  : "border-border text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {t.browse.allTracks[lang]}
            </button>
            {(Object.entries(curationTracks) as [CurationTrack, (typeof curationTracks)[CurationTrack]][]).map(([key, track]) => (
              <button
                key={key}
                type="button"
                data-testid={`track-filter-${key}`}
                onClick={() => setTrackFilter(key)}
                className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  trackFilter === key
                    ? "border-white/20 bg-white/10 text-foreground"
                    : "border-border text-muted hover:border-white/20 hover:text-foreground"
                }`}
              >
                {track.label[lang]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setVerticalFilter("all")}
              className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                verticalFilter === "all"
                  ? "border-white/20 bg-white/10 text-foreground"
                  : "border-border text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {t.browse.allVerticals[lang]}
            </button>
            {(Object.entries(verticals) as [Vertical, (typeof verticals)[Vertical]][]).map(([key, vertical]) => (
              <button
                key={key}
                type="button"
                onClick={() => setVerticalFilter(key)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  verticalFilter === key
                    ? "border-white/20 bg-white/10 text-foreground"
                    : "border-border text-muted hover:border-white/20 hover:text-foreground"
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: vertical.color }} />
                {vertical.label[lang]}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap items-center gap-2 text-muted">
              {trackFilter !== "all" && (
                <span className="rounded-full border border-border bg-background/60 px-3 py-1.5">
                  {t.browse.currentTrack[lang]}: {curationTracks[trackFilter].label[lang]}
                </span>
              )}
              {verticalFilter !== "all" && (
                <span className="rounded-full border border-border bg-background/60 px-3 py-1.5">
                  {t.browse.currentDomain[lang]}: {verticals[verticalFilter].label[lang]}
                </span>
              )}
              {(trackFilter !== "all" || verticalFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setTrackFilter("all");
                    setVerticalFilter("all");
                  }}
                  className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-white/20 hover:text-foreground"
                >
                  {t.browse.clear[lang]}
                </button>
              )}
            </div>
            <span className="font-mono text-muted">
              {filtered.length} {t.browse.results[lang]}
            </span>
          </div>
        </div>

        {trackFilter !== "all" && (
          <p className={`mt-5 max-w-3xl text-sm leading-relaxed text-muted scroll-fade ${inView ? "in-view" : ""}`}>
            {curationTracks[trackFilter].description[lang]}
          </p>
        )}

        {verticalFilter !== "all" && (
          <p className={`mt-3 max-w-3xl text-sm leading-relaxed text-muted scroll-fade ${inView ? "in-view" : ""}`}>
            {verticals[verticalFilter].description[lang]}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <div key={project.id} className={`scroll-fade stagger-${Math.min(index + 1, 6)} ${inView ? "in-view" : ""}`}>
              <ProjectCard project={project} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [verticalFilter, setVerticalFilter] = useState<Vertical | "all">("all");
  const [trackFilter, setTrackFilter] = useState<CurationTrack | "all">("all");

  const filtered = [...projects]
    .filter((project) => trackFilter === "all" || project.curation.track === trackFilter)
    .filter((project) => verticalFilter === "all" || project.vertical === verticalFilter)
    .sort((a, b) => {
      const rankA = a.curation.featuredRank ?? Number.MAX_SAFE_INTEGER;
      const rankB = b.curation.featuredRank ?? Number.MAX_SAFE_INTEGER;
      if (rankA !== rankB) return rankA - rankB;
      return a.title.en.localeCompare(b.title.en);
    });

  const jumpToProjects = (track?: CurationTrack) => {
    if (track) {
      setTrackFilter(track);
      setVerticalFilter("all");
    }
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen">
      <Nav lang={lang} onLangChange={setLang} showHomeLinks />

      <section className="px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted animate-fade-up">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {t.heroBadge[lang]}
          </div>
          <h1 className="animate-fade-up whitespace-pre-line text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {t.hero[lang]}
          </h1>
          <p className="mt-4 max-w-3xl animate-fade-up text-base leading-relaxed text-muted delay-1 sm:mt-6 sm:text-lg">
            {t.sub[lang]}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 animate-fade-up delay-2">
            {(["manufacturing", "tooling"] as const).map((key) => (
              <span key={key} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-zinc-300">
                {t.pills[key][lang]}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 animate-fade-up delay-2">
            <button
              type="button"
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#b87749]/40 bg-[#b87749]/15 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#b87749]/70 hover:bg-[#b87749]/20"
            >
              {t.ctas.featured[lang]}
            </button>
            <a
              href="#projects"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-white/20 hover:bg-surface-hover"
            >
              {t.ctas.browseAll[lang]}
            </a>
          </div>

        </div>
      </section>

      <CuratedEntrySection lang={lang} onSelectTrack={jumpToProjects} />
      <ProjectsSection
        lang={lang}
        verticalFilter={verticalFilter}
        setVerticalFilter={setVerticalFilter}
        trackFilter={trackFilter}
        setTrackFilter={setTrackFilter}
        filtered={filtered}
      />
      <IntersectionSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} />

      <footer className="border-t border-border px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted">{t.footer[lang]}</p>
          <p className="mt-2 font-mono text-xs text-zinc-600">cyanluna.dev</p>
        </div>
      </footer>
    </div>
  );
}
