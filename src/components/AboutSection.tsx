"use client";

type Lang = "en" | "ko";

const t = {
  sectionTitle: { en: "About", ko: "About" },
  bio: {
    en: "I'm a full-stack engineer who ships across domains\u2014from factory floors to fitness labs to developer terminals. I don't pick a lane; I pick problems worth solving, then build the software end-to-end.",
    ko: "\uC800\uB294 \uACF5\uC7A5 \uD604\uC7A5\uBD80\uD130 \uD53C\uD2B8\uB2C8\uC2A4 \uB7A9, \uAC1C\uBC1C\uC790 \uD130\uBBF8\uB110\uAE4C\uC9C0 \uB3C4\uBA54\uC778\uC744 \uB118\uB098\uB4DC\uB294 \uD480\uC2A4\uD0DD \uC5D4\uC9C0\uB2C8\uC5B4\uC785\uB2C8\uB2E4. \uD2B9\uC815 \uBD84\uC57C\uC5D0 \uBA38\uBB34\uB974\uC9C0 \uC54A\uACE0, \uD480 \uAC00\uCE58\uAC00 \uC788\uB294 \uBB38\uC81C\uB97C \uACE8\uB77C \uC18C\uD504\uD2B8\uC6E8\uC5B4\uB97C \uCC98\uC74C\uBD80\uD130 \uB05D\uAE4C\uC9C0 \uB9CC\uB4ED\uB2C8\uB2E4.",
  },
};

const domains = [
  {
    label: "Industrial",
    color: "#3B82F6",
    keywords: ["Manufacturing Automation", "PLC / Modbus", "Edge-to-Cloud"],
  },
  {
    label: "Health",
    color: "#10B981",
    keywords: ["Metabolic Analysis", "Training Science", "Wearable Data"],
  },
  {
    label: "Consumer",
    color: "#F59E0B",
    keywords: ["Service Platforms", "Multi-bank Parsing", "OAuth Flows"],
  },
  {
    label: "DevTools",
    color: "#8B5CF6",
    keywords: ["Multi-Agent AI", "Code Review", "CI/CD Automation"],
  },
];

const counters = [
  { value: "12+", label: { en: "Projects Shipped", ko: "\uD504\uB85C\uC81D\uD2B8" } },
  { value: "4", label: { en: "Domain Verticals", ko: "\uB3C4\uBA54\uC778" } },
  { value: "15+", label: { en: "Tech Stacks", ko: "\uAE30\uC220 \uC2A4\uD0DD" } },
];

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutSection({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className="text-2xl font-bold tracking-tight mb-8 animate-fade-up">
          {t.sectionTitle[lang]}
        </h2>

        {/* Bio + Social */}
        <div className="mb-12 animate-fade-up delay-1">
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            {t.bio[lang]}
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://github.com/cyanluna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/cyanluna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Domain Expertise */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {domains.map((domain, i) => (
            <div
              key={domain.label}
              className={`relative rounded-2xl border border-border bg-surface p-5 animate-fade-up delay-${Math.min(i + 2, 5)}`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${domain.color}40, transparent)`,
                }}
              />
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: domain.color }}
                />
                <h3 className="text-sm font-semibold tracking-tight">
                  {domain.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {domain.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-md border"
                    style={{
                      backgroundColor: `${domain.color}10`,
                      borderColor: `${domain.color}20`,
                      color: domain.color,
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Counter highlights */}
        <div className="grid grid-cols-3 gap-4 max-w-lg animate-fade-up delay-3">
          {counters.map((c) => (
            <div
              key={c.value}
              className="text-center p-4 rounded-xl border border-border bg-surface"
            >
              <div className="text-2xl font-bold font-mono">{c.value}</div>
              <div className="text-xs text-muted mt-1">{c.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
