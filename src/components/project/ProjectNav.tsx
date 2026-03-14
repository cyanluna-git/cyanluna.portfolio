import type { BiText } from "@/types/project-detail";

type Lang = "en" | "ko";

const navT = {
  portfolio: { en: "Back to Portfolio", ko: "포트폴리오로 돌아가기" },
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
    <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Back to Portfolio — always visible */}
        <div className="flex justify-center mb-8">
          <a
            href={`/${langParam}#projects`}
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-foreground border border-border rounded-lg hover:bg-surface-hover transition-all min-h-[44px]"
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
            {navT.portfolio[lang]}
          </a>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Previous project */}
          <div className="min-w-0 flex-1">
            {prevProject && (
              <a
                href={`/projects/${prevProject.slug}${langParam}`}
                className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors min-h-[44px] py-2"
              >
                <svg
                  className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform"
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
                <span className="flex flex-col min-w-0">
                  <span className="text-[11px] font-mono text-muted">
                    {navT.prev[lang]}
                  </span>
                  <span className="text-sm truncate">
                    {prevProject.title[lang]}
                  </span>
                </span>
              </a>
            )}
          </div>

          {/* Right: Next project */}
          <div className="min-w-0 flex-1 flex justify-end">
            {nextProject && (
              <a
                href={`/projects/${nextProject.slug}${langParam}`}
                className="group flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors min-h-[44px] py-2"
              >
                <span className="flex flex-col items-end min-w-0">
                  <span className="text-[11px] font-mono text-muted">
                    {navT.next[lang]}
                  </span>
                  <span className="text-sm truncate">
                    {nextProject.title[lang]}
                  </span>
                </span>
                <svg
                  className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
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
        </div>
      </div>
    </section>
  );
}
