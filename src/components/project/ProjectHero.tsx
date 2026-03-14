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
  lang: Lang;
}

export default function ProjectHero({
  title,
  tagline,
  status,
  verticalColor,
  heroImage,
  lang,
}: ProjectHeroProps) {
  return (
    <section className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6 animate-fade-up">
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

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-up delay-1">
          {title[lang]}
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl leading-relaxed animate-fade-up delay-2">
          {tagline[lang]}
        </p>

        <div className="mt-10 animate-fade-up delay-3">
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
