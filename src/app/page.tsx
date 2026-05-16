"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  curationTracks,
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
import LabSection from "@/components/LabSection";
import { useInView } from "@/hooks/useInView";
import { useRecruiterMode } from "@/hooks/useRecruiterMode";

type Lang = "en" | "ko";
type Vertical = keyof typeof verticals;

const t = {
  heroBadge: {
    en: "Enterprise Systems Builder",
    ko: "엔터프라이즈 시스템 빌더",
  },
  hero: {
    en: "I enter unknown domains,\nbuild the process from zero,\nand leave working systems behind.",
    ko: "모르는 도메인에 뛰어들어\n처음부터 과정을 만들고\n작동하는 시스템을 남깁니다.",
  },
  sub: {
    en: "Full-stack engineer and cross-regional program lead — I've shipped manufacturing DX platforms, enterprise cloud infrastructure, and AI-integrated tooling from scratch. If it crosses organizational, technical, or geographic boundaries, I build it.",
    ko: "제조 DX, 엔터프라이즈 클라우드 인프라, AI 통합 도구를 처음부터 구축해온 풀스택 엔지니어 겸 크로스리지널 프로그램 리더입니다. 조직·기술·지리적 경계를 넘는 시스템이라면 제 일입니다.",
  },
  pills: {
    manufacturing: {
      en: "Manufacturing DX",
      ko: "제조 DX",
    },
    tooling: {
      en: "Enterprise Cloud & AI",
      ko: "엔터프라이즈 클라우드 & AI",
    },
  },
  ctas: {
    browseAll: {
      en: "Browse all projects",
      ko: "전체 프로젝트 보기",
    },
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

      <section id="main-content" className="px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
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
                <a
                  href="#projects"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
                >
                  {t.ctas.browseAll[lang]}
                </a>
              </div>
              <div className="mt-4 animate-fade-up delay-3">
                <button
                  type="button"
                  onClick={recruiterStart}
                  className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors hover:text-foreground"
                >
                  → {lang === "en" ? "Recruiter path" : "채용 담당자용 가이드"}
                </button>
              </div>
            </div>
            {/* Right: domain compass */}
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <svg viewBox="-60 -20 600 520" width="420" height="364" style={{ display: "block" }}>
                <defs>
                  <radialGradient id="hgCenter" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="hgArc1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5b9cff" />
                    <stop offset="100%" stopColor="#5b9cff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hgArc2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3ecf8e" />
                    <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hgArc3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5a524" />
                    <stop offset="100%" stopColor="#f5a524" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="hgArc4" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* background glow */}
                <circle cx="240" cy="240" r="200" fill="url(#hgCenter)" />
                {/* grid rings */}
                <circle cx="240" cy="240" r="60" fill="none" stroke="rgba(148,170,210,0.15)" strokeWidth="1" />
                <circle cx="240" cy="240" r="110" fill="none" stroke="rgba(148,170,210,0.12)" strokeWidth="1" strokeDasharray="2 4" />
                <circle cx="240" cy="240" r="170" fill="none" stroke="rgba(148,170,210,0.08)" strokeWidth="1" />
                <circle cx="240" cy="240" r="220" fill="none" stroke="rgba(148,170,210,0.05)" strokeWidth="1" strokeDasharray="1 5" />
                {/* arc segments */}
                <g strokeLinecap="round" fill="none" strokeWidth="12">
                  <path d="M 240 80 A 160 160 0 0 1 400 240" stroke="url(#hgArc1)" />
                  <path d="M 400 240 A 160 160 0 0 1 240 400" stroke="url(#hgArc2)" />
                  <path d="M 240 400 A 160 160 0 0 1 80 240" stroke="url(#hgArc3)" />
                  <path d="M 80 240 A 160 160 0 0 1 240 80" stroke="url(#hgArc4)" />
                </g>
                {/* domain node dots */}
                <g>
                  <circle cx="240" cy="80" r="10" fill="#5b9cff" />
                  <circle cx="240" cy="80" r="20" fill="none" stroke="#5b9cff" strokeOpacity="0.3" strokeWidth="1" />
                  <circle cx="400" cy="240" r="10" fill="#3ecf8e" />
                  <circle cx="400" cy="240" r="20" fill="none" stroke="#3ecf8e" strokeOpacity="0.3" strokeWidth="1" />
                  <circle cx="240" cy="400" r="10" fill="#f5a524" />
                  <circle cx="240" cy="400" r="20" fill="none" stroke="#f5a524" strokeOpacity="0.3" strokeWidth="1" />
                  <circle cx="80" cy="240" r="10" fill="#a78bfa" />
                  <circle cx="80" cy="240" r="20" fill="none" stroke="#a78bfa" strokeOpacity="0.3" strokeWidth="1" />
                </g>
                {/* axis lines */}
                <g stroke="rgba(148,170,210,0.12)" strokeWidth="1">
                  <line x1="80" y1="240" x2="400" y2="240" />
                  <line x1="240" y1="80" x2="240" y2="400" />
                </g>
                {/* center node */}
                <circle cx="240" cy="240" r="26" fill="#0a0f1a" stroke="#5b8cff" strokeWidth="1.5" />
                <circle cx="240" cy="240" r="8" fill="#5b8cff" />
                <circle cx="240" cy="240" r="4" fill="#e6ecf7" />
                {/* domain labels */}
                <g fontFamily="'JetBrains Mono', 'Geist Mono', monospace" fontSize="10" fill="#7a8599" letterSpacing="1.5">
                  <text x="240" y="56" textAnchor="middle">INDUSTRIAL</text>
                  <text x="432" y="244" textAnchor="start">CYCLING</text>
                  <text x="240" y="432" textAnchor="middle">CLOUD / OPS</text>
                  <text x="48" y="244" textAnchor="end">AI AGENTS</text>
                </g>
                {/* decorative dots */}
                <g fill="#aab5cc" opacity="0.5">
                  <circle cx="330" cy="130" r="2" /><circle cx="360" cy="160" r="2" />
                  <circle cx="360" cy="320" r="2" /><circle cx="320" cy="350" r="2" />
                  <circle cx="160" cy="350" r="2" /><circle cx="130" cy="320" r="2" />
                  <circle cx="120" cy="150" r="2" /><circle cx="160" cy="125" r="2" />
                  <circle cx="305" cy="105" r="2" /><circle cx="380" cy="200" r="2" />
                  <circle cx="380" cy="280" r="2" /><circle cx="100" cy="195" r="2" />
                  <circle cx="100" cy="290" r="2" /><circle cx="185" cy="100" r="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

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
      <LabSection lang={lang} />
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
