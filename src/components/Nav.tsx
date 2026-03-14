"use client";

import { useState, useEffect } from "react";

type Lang = "en" | "ko";

const navT = {
  about: { en: "About", ko: "About" },
  projects: { en: "Projects", ko: "프로젝트" },
  stack: { en: "Stack", ko: "스택" },
  contact: { en: "Contact", ko: "연락" },
};

interface NavProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  showHomeLinks?: boolean;
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export default function Nav({ lang, onLangChange, showHomeLinks = true }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "#about", label: navT.about[lang] },
    { href: "#projects", label: navT.projects[lang] },
    { href: "#stack", label: navT.stack[lang] },
    { href: "#contact", label: navT.contact[lang] },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href={`/${lang === "ko" ? "?lang=ko" : ""}`} className="font-mono text-sm font-semibold tracking-tight hover:text-foreground transition-colors">
          CyanLuna
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4">
          {showHomeLinks && (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted hover:text-foreground transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </>
          )}
          <button
            onClick={() => onLangChange(lang === "en" ? "ko" : "en")}
            className="px-2.5 py-1 text-xs font-mono rounded-md border border-border hover:bg-surface-hover transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {lang === "en" ? "KO" : "EN"}
          </button>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onLangChange(lang === "en" ? "ko" : "en")}
            className="px-2.5 py-1 text-xs font-mono rounded-md border border-border hover:bg-surface-hover transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {lang === "en" ? "KO" : "EN"}
          </button>
          {showHomeLinks && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {showHomeLinks && menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-surface-hover min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
