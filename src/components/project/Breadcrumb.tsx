import type { BiText } from "@/types/project-detail";

type Lang = "en" | "ko";

const verticalLabels: Record<string, BiText> = {
  industrial: { en: "Industrial", ko: "Industrial" },
  health: { en: "Health & Fitness", ko: "Health & Fitness" },
  consumer: { en: "Consumer", ko: "Consumer" },
  devtools: { en: "Developer Tools", ko: "Developer Tools" },
};

const breadcrumbT = {
  portfolio: { en: "Portfolio", ko: "포트폴리오" },
};

interface BreadcrumbProps {
  vertical: string;
  verticalColor: string;
  projectTitle: BiText;
  lang: Lang;
}

export default function Breadcrumb({
  vertical,
  verticalColor,
  projectTitle,
  lang,
}: BreadcrumbProps) {
  const langParam = lang === "ko" ? "?lang=ko" : "";
  const verticalLabel = verticalLabels[vertical] ?? { en: vertical, ko: vertical };

  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-16 sm:pt-18 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto">
        <ol className="flex items-center gap-1.5 text-xs font-mono text-muted flex-wrap">
          <li>
            <a
              href={`/${langParam}`}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumbT.portfolio[lang]}
            </a>
          </li>
          <li aria-hidden="true" className="text-zinc-600">/</li>
          <li>
            <a
              href={`/${langParam}#projects`}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: verticalColor }}
              />
              {verticalLabel[lang]}
            </a>
          </li>
          <li aria-hidden="true" className="text-zinc-600">/</li>
          <li className="text-foreground truncate max-w-[200px] sm:max-w-none">
            {projectTitle[lang]}
          </li>
        </ol>
      </div>
    </nav>
  );
}
