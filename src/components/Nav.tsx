"use client";

type Lang = "en" | "ko";

const navT = {
  about: { en: "About", ko: "About" },
  projects: { en: "Projects", ko: "프로젝트" },
  stack: { en: "Stack", ko: "스택" },
};

interface NavProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  showHomeLinks?: boolean;
}

export default function Nav({ lang, onLangChange, showHomeLinks = true }: NavProps) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href={`/${lang === "ko" ? "?lang=ko" : ""}`} className="font-mono text-sm font-semibold tracking-tight hover:text-foreground transition-colors">
          CyanLuna
        </a>
        <div className="flex items-center gap-4">
          {showHomeLinks && (
            <>
              <a href="#about" className="text-xs text-muted hover:text-foreground transition-colors">
                {navT.about[lang]}
              </a>
              <a href="#projects" className="text-xs text-muted hover:text-foreground transition-colors">
                {navT.projects[lang]}
              </a>
              <a href="#stack" className="text-xs text-muted hover:text-foreground transition-colors">
                Stack
              </a>
            </>
          )}
          <button
            onClick={() => onLangChange(lang === "en" ? "ko" : "en")}
            className="px-2.5 py-1 text-xs font-mono rounded-md border border-border hover:bg-surface-hover transition-colors cursor-pointer"
          >
            {lang === "en" ? "KO" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
