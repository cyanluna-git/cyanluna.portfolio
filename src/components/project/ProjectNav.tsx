import type { BiText } from "@/types/project-detail";

type Lang = "en" | "ko";

const navT = {
  portfolio: { en: "Portfolio", ko: "포트폴리오" },
  prev: { en: "Previous", ko: "이전" },
  next: { en: "Next Project", ko: "다음 프로젝트" },
};

interface ProjectNavProps {
  prevProject?: { slug: string; title: BiText };
  nextProject?: { slug: string; title: BiText };
  lang: Lang;
}

export default function ProjectNav({
  prevProject,
  nextProject,
  lang,
}: ProjectNavProps) {
  const langParam = lang === "ko" ? "?lang=ko" : "";

  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: Back to portfolio or previous project */}
        <div>
          {prevProject ? (
            <a
              href={`/projects/${prevProject.slug}${langParam}`}
              className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span className="flex flex-col">
                <span className="text-[11px] font-mono text-muted">
                  {navT.prev[lang]}
                </span>
                <span className="text-sm">{prevProject.title[lang]}</span>
              </span>
            </a>
          ) : (
            <a
              href={`/${langParam}`}
              className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span>{navT.portfolio[lang]}</span>
            </a>
          )}
        </div>

        {/* Right: Next project */}
        {nextProject && (
          <a
            href={`/projects/${nextProject.slug}${langParam}`}
            className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <span className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-muted">
                {navT.next[lang]}
              </span>
              <span className="text-sm">{nextProject.title[lang]}</span>
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
