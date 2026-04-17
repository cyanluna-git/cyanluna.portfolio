import type { ProjectDetail, BiText } from "@/types/project-detail";
import BrowserFrame from "./BrowserFrame";

type Lang = "en" | "ko";

const statusLabels: Record<ProjectDetail["status"], BiText> = {
  live: { en: "Live", ko: "운영 중" },
  active: { en: "In Development", ko: "개발 중" },
  beta: { en: "Beta", ko: "베타" },
};

const statusColors: Record<ProjectDetail["status"], string> = {
  live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  active: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  beta: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

interface ProjectHeroProps {
  title: BiText;
  tagline: BiText;
  status: ProjectDetail["status"];
  verticalColor: string;
  heroImage?: string;
  liveUrl?: string;
  lang: Lang;
}

export default function ProjectHero({
  title,
  tagline,
  status,
  verticalColor,
  heroImage,
  liveUrl,
  lang,
}: ProjectHeroProps) {
  return (
    <section className="pt-20 pb-10 sm:pt-24 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-6 animate-fade-up">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: verticalColor }}
          />
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[status]}`}
          >
            {status === "live" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {statusLabels[status][lang]}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] animate-fade-up delay-1">
          {title[lang]}
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted max-w-2xl leading-relaxed animate-fade-up delay-2">
          {tagline[lang]}
        </p>

        {liveUrl && (
          <div className="mt-5 animate-fade-up delay-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
              style={{
                borderColor: verticalColor,
                color: verticalColor,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: verticalColor }} />
              {lang === "ko" ? "라이브 데모 보기" : "View Live Demo"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}

        <div className="mt-8 sm:mt-10 animate-fade-up delay-3">
          <BrowserFrame
            accentColor={verticalColor}
            imageSrc={heroImage}
            title={title.en.toLowerCase().replace(/\s+/g, "-")}
          />
        </div>
      </div>
    </section>
  );
}
