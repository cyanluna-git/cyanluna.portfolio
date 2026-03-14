"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects, verticals, stats, type Project } from "@/data/projects";
import Nav from "@/components/Nav";
import AboutSection from "@/components/AboutSection";
import IntersectionSection from "@/components/IntersectionSection";
import ContactSection from "@/components/ContactSection";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

type Lang = "en" | "ko";
type Vertical = keyof typeof verticals;

const t = {
  hero: {
    en: "I build software that works\nin factories, on bikes, and in terminals.",
    ko: "공장에서, 자전거 위에서, 터미널에서\n작동하는 소프트웨어를 만듭니다.",
  },
  sub: {
    en: "Full-stack engineer shipping across manufacturing automation, health tech, consumer apps, and AI-native developer tools.",
    ko: "제조 자동화, 헬스 테크, 컨슈머 앱, AI 네이티브 개발 도구를 아우르는 풀스택 엔지니어.",
  },
  statsLabel: {
    projects: { en: "Projects", ko: "프로젝트" },
    techStacks: { en: "Tech Stacks", ko: "기술 스택" },
    domains: { en: "Domains", ko: "도메인" },
    agents: { en: "AI Agents", ko: "AI 에이전트" },
  },
  sectionTitle: { en: "Projects", ko: "프로젝트" },
  allFilter: { en: "All", ko: "전체" },
  status: {
    live: { en: "Live", ko: "운영 중" },
    active: { en: "In Development", ko: "개발 중" },
    beta: { en: "Beta", ko: "베타" },
  },
  viewDetails: { en: "View Details \u2192", ko: "\uc790\uc138\ud788 \ubcf4\uae30 \u2192" },
  comingSoon: { en: "Coming Soon", ko: "\uc900\ube44\uc911" },
  footer: {
    en: "Built with curiosity across domains.",
    ko: "도메인을 넘나드는 호기심으로 만들었습니다.",
  },
  stackTitle: { en: "Core Stack", ko: "핵심 스택" },
};

const stackGroups = [
  { label: "Frontend", items: ["React 19", "Next.js 15/16", "Tailwind CSS", "Zustand", "TanStack Query", "Recharts", "ReactFlow"] },
  { label: "Backend", items: ["FastAPI", "Ruby on Rails 8", "Node.js"] },
  { label: "Database", items: ["PostgreSQL", "TimescaleDB", "InfluxDB", "SQLite", "Neon", "Supabase"] },
  { label: "AI / LLM", items: ["Claude API", "Groq (Llama)", "Gemini", "Multi-Agent Orchestration"] },
  { label: "Infra", items: ["Docker", "Vercel", "Cloud Run", "GitHub Actions"] },
  { label: "Protocol", items: ["Modbus TCP", "Hostlink", "SAML 2.0", "OAuth 2.0"] },
];

function StatusBadge({ status, lang }: { status: Project["status"]; lang: Lang }) {
  const colors = {
    live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    active: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    beta: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${colors[status]}`}>
      {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {t.status[status][lang]}
    </span>
  );
}

function ProjectMediaArea({ project }: { project: Project }) {
  const vColor = verticals[project.vertical].color;

  if (project.media) {
    const { type, src, poster } = project.media;

    if (type === "video") {
      return (
        <div className="aspect-video overflow-hidden bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      );
    }

    return (
      <div className="aspect-video overflow-hidden bg-black">
        <Image
          src={src}
          alt=""
          width={640}
          height={360}
          loading="lazy"
          unoptimized={type === "gif"}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="aspect-video"
      style={{
        background: `linear-gradient(to bottom, ${vColor}18, ${vColor}06)`,
      }}
    />
  );
}

function ProjectCardInner({ project, lang }: { project: Project; lang: Lang }) {
  const vColor = verticals[project.vertical].color;

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${vColor}40, transparent)` }} />

      <ProjectMediaArea project={project} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: vColor }} />
            <h3 className="text-lg font-semibold tracking-tight">{project.title[lang]}</h3>
          </div>
          <StatusBadge status={project.status} lang={lang} />
        </div>

        <p className="text-sm text-muted mb-4 leading-relaxed">{project.tagline[lang]}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-white/5 text-muted border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        {project.hasDetailPage ? (
          <span className="text-xs font-medium transition-colors" style={{ color: vColor }}>
            {t.viewDetails[lang]}
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-full border border-white/10 bg-white/5 text-muted">
            {t.comingSoon[lang]}
          </span>
        )}
      </div>
    </>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const cardClass = `group relative rounded-2xl border border-border bg-surface transition-all duration-300 overflow-hidden block ${
    project.hasDetailPage
      ? "hover:scale-[1.02] cursor-pointer"
      : "opacity-60 cursor-default"
  }`;

  if (project.hasDetailPage) {
    return (
      <Link
        href={`/projects/${project.id}`}
        data-vertical={project.vertical}
        className={cardClass}
      >
        <ProjectCardInner project={project} lang={lang} />
      </Link>
    );
  }

  return (
    <div
      data-vertical={project.vertical}
      className={cardClass}
      aria-disabled="true"
    >
      <ProjectCardInner project={project} lang={lang} />
    </div>
  );
}

function ProjectsSection({
  lang,
  filter,
  setFilter,
  filtered,
}: {
  lang: Lang;
  filter: Vertical | "all";
  setFilter: (v: Vertical | "all") => void;
  filtered: Project[];
}) {
  const [ref, inView] = useInView();

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 sm:py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 scroll-fade ${inView ? "in-view" : ""}`}>
          {t.sectionTitle[lang]}
        </h2>

        <div className={`flex flex-wrap gap-2 mb-8 sm:mb-10 scroll-fade ${inView ? "in-view" : ""}`}>
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-2 text-sm rounded-lg border transition-colors cursor-pointer min-h-[44px] ${
              filter === "all"
                ? "bg-white/10 border-white/20 text-foreground"
                : "border-border text-muted hover:text-foreground hover:border-white/20"
            }`}
          >
            {t.allFilter[lang]}
          </button>
          {(Object.entries(verticals) as [Vertical, (typeof verticals)[Vertical]][]).map(([key, v]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3.5 py-2 text-sm rounded-lg border transition-colors flex items-center gap-2 cursor-pointer min-h-[44px] ${
                filter === key
                  ? "bg-white/10 border-white/20 text-foreground"
                  : "border-border text-muted hover:text-foreground hover:border-white/20"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
              {v.label[lang]}
            </button>
          ))}
        </div>

        {filter !== "all" && (
          <p className={`text-sm text-muted mb-6 sm:mb-8 scroll-fade ${inView ? "in-view" : ""}`}>
            {verticals[filter].description[lang]}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`scroll-fade stagger-${Math.min(i + 1, 6)} ${inView ? "in-view" : ""}`}
            >
              <ProjectCard project={project} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection({ lang }: { lang: Lang }) {
  const [ref, inView] = useInView();

  return (
    <section
      id="stack"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-10 scroll-fade ${inView ? "in-view" : ""}`}>
          {t.stackTitle[lang]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackGroups.map((group, i) => (
            <div
              key={group.label}
              className={`space-y-3 scroll-fade stagger-${Math.min(i + 1, 6)} ${inView ? "in-view" : ""}`}
            >
              <h3 className="text-xs font-mono text-muted uppercase tracking-widest">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 text-sm rounded-lg border border-border bg-surface text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroStatCard({ label, end }: { label: string; end: number }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const display = useCounter({ end, duration: 400, enabled: inView });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="text-center p-3 sm:p-4 rounded-xl border border-border bg-surface"
    >
      <div className="text-xl sm:text-2xl font-bold font-mono">{display}</div>
      <div className="text-[11px] sm:text-xs text-muted mt-1">{label}</div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [filter, setFilter] = useState<Vertical | "all">("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.vertical === filter);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <Nav lang={lang} onLangChange={setLang} showHomeLinks />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] whitespace-pre-line animate-fade-up">
            {t.hero[lang]}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed animate-fade-up delay-1">
            {t.sub[lang]}
          </p>

          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl animate-fade-up delay-2">
            {(Object.entries(stats) as [keyof typeof stats, number][]).map(([key, val]) => (
              <HeroStatCard key={key} label={t.statsLabel[key][lang]} end={val} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <AboutSection lang={lang} />

      {/* Three Worlds Intersection */}
      <IntersectionSection lang={lang} />

      {/* Projects */}
      <ProjectsSection lang={lang} filter={filter} setFilter={setFilter} filtered={filtered} />

      {/* Stack */}
      <StackSection lang={lang} />

      {/* Contact CTA */}
      <ContactSection lang={lang} />

      {/* Footer */}
      <footer className="py-10 sm:py-16 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted">{t.footer[lang]}</p>
          <p className="text-xs text-zinc-600 mt-2 font-mono">cyanluna.dev</p>
        </div>
      </footer>
    </div>
  );
}
