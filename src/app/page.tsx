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
import StatusBadge from "@/components/StatusBadge";
import AboutSection from "@/components/AboutSection";
import IntersectionSection from "@/components/IntersectionSection";
import ContactSection from "@/components/ContactSection";
import RecruiterBanner from "@/components/RecruiterBanner";
import { useInView } from "@/hooks/useInView";
import { useRecruiterMode } from "@/hooks/useRecruiterMode";

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

function ProofBadge({ proof, lang }: { proof: ProjectProof; lang: Lang }) {
  return (
    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
      {t.proofLabel[proof][lang]}
    </span>
  );
}

function AudiencePills({ audience, lang }: { audience: ProjectAudience[]; lang: Lang }) {
  return (
    <div className="flex flex-wrap gap-2">
      {audience.map((item) => (
        <span key={item} className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
          {t.audienceLabel[item][lang]}
        </span>
      ))}
    </div>
  );
}

/* ── Icon visuals for projects with no screenshots ───────────────── */

const PROJECT_ICONS: Record<string, string> = {
  moru: "/projects/moru/icon.svg",
  "smart-factory-qc": "/projects/smart-factory-qc/icon.svg",
  "ai-cycling-coach": "/projects/ai-cycling-coach/icon.svg",
  "equipment-gateway": "/projects/equipment-gateway/icon.svg",
  "resource-board": "/projects/resource-board/icon.svg",
  "code-review-suite": "/projects/code-review-suite/icon.svg",
  javis: "/projects/javis/icon.svg",
  "cpet-platform": "/projects/cpet-platform/icon.svg",
  "ride-analytics": "/projects/ride-analytics/icon.svg",
  "today-bike": "/projects/today-bike/icon.svg",
  "personal-finance": "/projects/personal-finance/icon.svg",
  "assist-hub": "/projects/assist-hub/icon.svg",
  "assist-11th": "/projects/assist-11th/icon.svg",
  "kanban-pipeline": "/projects/kanban-pipeline/icon.svg",
};

function ProjectIconVisual({ project }: { project: Project }) {
  const iconSrc = PROJECT_ICONS[project.id];
  if (!iconSrc) return null;
  return (
    <div className="flex items-center justify-center py-6">
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "color-mix(in srgb, var(--v-color) 10%, var(--surface))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            maskImage: `url(${iconSrc})`,
            WebkitMaskImage: `url(${iconSrc})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            backgroundColor: "var(--v-color)",
          }}
        />
      </div>
    </div>
  );
}

function FeaturedIconTile({ project }: { project: Project }) {
  const iconSrc = PROJECT_ICONS[project.id];
  if (!iconSrc) return null;
  return (
    <div
      style={{
        aspectRatio: "1 / 1",
        maxHeight: 180,
        width: "100%",
        background:
          "radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--v-color) 18%, var(--surface)), color-mix(in srgb, var(--v-color) 6%, var(--surface)))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          backgroundColor: "var(--v-color)",
        }}
      />
    </div>
  );
}

/* ── Project media: icon if available, else first-frame / video ──── */

function ProjectMediaArea({ project }: { project: Project }) {
  // If there's a dedicated icon for this project, always use it
  if (PROJECT_ICONS[project.id]) {
    return <ProjectIconVisual project={project} />;
  }

  const media = project.media;
  if (!media) return null;

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
      <ProjectMediaArea project={project} />

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: vColor }} />
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
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
              {t.comingSoon[lang]}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const cardClass = `group relative block overflow-hidden rounded-[28px] border border-border bg-surface/95 dark-glass shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-300 ${
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
  recruiterStep,
  recruiterActive,
}: {
  lang: Lang;
  onSelectTrack: (track: CurationTrack) => void;
  recruiterStep?: number | null;
  recruiterActive?: boolean;
}) {
  const [ref, inView] = useInView();
  const isRecruiterActive = recruiterActive && recruiterStep === 1;

  return (
    <section
      id="featured"
      ref={ref as React.RefObject<HTMLElement>}
      data-recruiter-step={1}
      className={`border-t border-border px-4 py-12 sm:px-6 sm:py-20${isRecruiterActive ? " recruiter-active" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className={`scroll-fade ${inView ? "in-view" : ""}`}>
          <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
            {t.featured.eyebrow[lang]}
          </div>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold font-display tracking-tight sm:text-4xl">
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
                data-vertical={project.vertical}
                data-testid={`featured-project-${project.id}`}
                className={`group relative overflow-hidden rounded-[30px] border border-border bg-surface/95 dark-glass p-6 shadow-[0_24px_60px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 scroll-fade stagger-${Math.min(index + 1, 3)} ${inView ? "in-view" : ""}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${vColor}, transparent)` }}
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                      {t.featured.rank[lang]} {project.curation.featuredRank}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight">{project.title[lang]}</h3>
                  </div>
                  <StatusBadge status={project.status} lang={lang} />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{project.curation.quickPitch[lang]}</p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/5">
                  <FeaturedIconTile project={project} />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
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
  recruiterStep,
  recruiterActive,
}: {
  lang: Lang;
  verticalFilter: Vertical | "all";
  setVerticalFilter: (v: Vertical | "all") => void;
  trackFilter: CurationTrack | "all";
  setTrackFilter: (v: CurationTrack | "all") => void;
  filtered: Project[];
  recruiterStep?: number | null;
  recruiterActive?: boolean;
}) {
  const [ref, inView] = useInView();
  const isRecruiterActive = recruiterActive && recruiterStep === 2;

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      data-recruiter-step={2}
      className={`border-t border-border px-4 py-12 sm:px-6 sm:py-20${isRecruiterActive ? " recruiter-active" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className={`scroll-fade ${inView ? "in-view" : ""}`}>
          <h2 className="text-2xl font-bold font-display tracking-tight sm:text-4xl">{t.browse.title[lang]}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {t.browse.sub[lang]}
          </p>
        </div>

        <div className={`mt-8 rounded-[28px] border border-border bg-surface/90 dark-glass p-5 scroll-fade ${inView ? "in-view" : ""}`}>
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
  const { active: recruiterActive, step: recruiterStep, completed: recruiterCompleted, start: recruiterStart, next: recruiterNext, exit: recruiterExit } = useRecruiterMode();

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
    <div className="min-h-screen" data-recruiter-active={recruiterActive ? "true" : undefined}>
      <RecruiterBanner
        active={recruiterActive}
        step={recruiterStep}
        completed={recruiterCompleted}
        onNext={recruiterNext}
        onExit={recruiterExit}
      />
      <Nav lang={lang} onLangChange={setLang} showHomeLinks />

      <section className="px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted animate-fade-up">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t.heroBadge[lang]}
              </div>
              <h1 className="animate-fade-up whitespace-pre-line text-3xl font-bold font-display leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
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
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
                >
                  {t.ctas.featured[lang]}
                </button>
                <a
                  href="#projects"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-white/20 hover:bg-surface-hover"
                >
                  {t.ctas.browseAll[lang]}
                </a>
                <button
                  type="button"
                  onClick={recruiterStart}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-accent/60 px-5 py-3 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10"
                >
                  Recruiter path →
                </button>
              </div>
            </div>
            {/* Right: decorative orb */}
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <div
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent) 15%, transparent), color-mix(in srgb, var(--accent) 5%, transparent) 70%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <CuratedEntrySection lang={lang} onSelectTrack={jumpToProjects} recruiterStep={recruiterStep} recruiterActive={recruiterActive} />
      <ProjectsSection
        lang={lang}
        verticalFilter={verticalFilter}
        setVerticalFilter={setVerticalFilter}
        trackFilter={trackFilter}
        setTrackFilter={setTrackFilter}
        filtered={filtered}
        recruiterStep={recruiterStep}
        recruiterActive={recruiterActive}
      />
      <IntersectionSection lang={lang} />
      <AboutSection lang={lang} />
      <div
        data-recruiter-step={3}
        className={recruiterActive && recruiterStep === 3 ? "recruiter-active" : undefined}
      >
        <ContactSection lang={lang} />
      </div>

      <footer className="border-t border-border px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted">{t.footer[lang]}</p>
          <p className="mt-2 font-mono text-xs text-zinc-600">cyanluna.dev</p>
        </div>
      </footer>
    </div>
  );
}
