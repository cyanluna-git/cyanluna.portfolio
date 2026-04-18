"use client";

import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

type Lang = "en" | "ko";

const t = {
  sectionTitle: { en: "About", ko: "About" },
  bio: {
    en: "I work where operational ambiguity, data friction, and execution pressure meet. My strongest position is not generic SaaS. It is turning manufacturing workflows, data systems, and internal operations into software that teams can actually use.",
    ko: "저는 운영의 불확실성, 데이터의 마찰, 실행 압박이 만나는 지점에서 일합니다. 제 강점은 범용 SaaS가 아니라, 제조 워크플로우와 데이터 시스템, 내부 운영을 실제로 쓰이는 소프트웨어로 바꾸는 데 있습니다.",
  },
  bioSupport: {
    en: "I am most effective when the problem is still blurry. I dig until the real bottleneck becomes visible, then build the analysis, visualization, and management layer that lets the team move faster.",
    ko: "문제가 아직 흐릿할 때 가장 강합니다. 진짜 병목이 드러날 때까지 파고든 뒤, 팀이 더 빨리 움직일 수 있도록 분석·시각화·관리 레이어를 직접 만듭니다.",
  },
  leadershipLabel: {
    en: "Operating signal",
    ko: "작동 방식",
  },
  leadershipTitle: {
    en: "Solo builds become enterprise leverage — every time",
    ko: "혼자 만든 시스템이 엔터프라이즈 결정의 기준이 됩니다",
  },
  leadershipBody: {
    en: "As a team lead, I use solo end-to-end deployment work as a proving ground for enterprise decisions. Managed services taught me how to move fast, translate modern stacks into enterprise constraints, and propose the next operating layer instead of waiting for it to appear.",
    ko: "팀장으로 일하면서, 혼자 끝까지 배포해 본 경험을 엔터프라이즈 의사결정을 위한 실전 검증장으로 사용하고 있습니다. 매니지드 서비스 경험은 빠르게 실행하고, 모던 스택을 기업 제약으로 번역하며, 필요한 운영 레이어를 기다리지 않고 먼저 제안하게 만들었습니다.",
  },
  leadershipPoints: {
    en: [
      "Find the real constraint first, not just the visible symptom.",
      "When the tool is missing, build the data analysis, visualization, or management layer immediately.",
      "Translate working systems into enterprise-ready direction, including OQC-EOB and planned Microsoft 365 / SAP links.",
    ],
    ko: [
      "눈에 보이는 증상보다 실제 제약을 먼저 찾습니다.",
      "필요한 도구가 없으면 분석·시각화·관리 레이어를 바로 만듭니다.",
      "작동하는 시스템을 OQC-EOB와 향후 Microsoft 365 / SAP 연계 방향까지 번역합니다.",
    ],
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

const domains = [
  {
    label: "Industrial",
    color: "#3B82F6",
    keywords: ["Manufacturing Automation", "PLC / Modbus", "Edge-to-Cloud"],
  },
  {
    label: "Cycling",
    color: "#10B981",
    keywords: ["Cycling Performance", "Sport Science", "Bike Service"],
  },
  {
    label: "Cloud / Ops",
    color: "#F59E0B",
    keywords: ["SaaS Products", "API Integration", "Cloud Services"],
  },
  {
    label: "AI Agents",
    color: "#8B5CF6",
    keywords: ["Multi-Agent Pipeline", "LLM Orchestration", "Code Review Automation"],
  },
];

const counters = [
  { value: "14", num: 14, suffix: "", label: { en: "Projects Shipped", ko: "\uD504\uB85C\uC81D\uD2B8" } },
  { value: "4", num: 4, suffix: "", label: { en: "Domain Verticals", ko: "\uB3C4\uBA54\uC778" } },
  { value: "15+", num: 15, suffix: "+", label: { en: "Tech Stacks", ko: "\uAE30\uC220 \uC2A4\uD0DD" } },
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

function CounterCard({
  end,
  suffix,
  label,
  enabled,
}: {
  end: number;
  suffix: string;
  label: string;
  enabled: boolean;
}) {
  const display = useCounter({ end, duration: 400, enabled, suffix });

  return (
    <div className="text-center p-3 sm:p-4 rounded-xl border border-border bg-surface">
      <div className="text-xl sm:text-2xl font-bold font-mono">{display}</div>
      <div className="text-[11px] sm:text-xs text-muted mt-1">{label}</div>
    </div>
  );
}

export default function AboutSection({ lang }: { lang: Lang }) {
  const [ref, inView] = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 scroll-fade ${inView ? "in-view" : ""}`}>
          {t.sectionTitle[lang]}
        </h2>

        {/* Bio + Social */}
        <div className={`mb-8 sm:mb-12 scroll-fade stagger-2 ${inView ? "in-view" : ""}`}>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
            {t.bio[lang]}
          </p>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl">
            {t.bioSupport[lang]}
          </p>
          <div className="flex items-center gap-3 mt-5 sm:mt-6">
            <a
              href="https://github.com/cyanluna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/cyanluna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-surface text-muted hover:text-foreground hover:border-white/20 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className={`mb-8 sm:mb-12 scroll-fade stagger-3 ${inView ? "in-view" : ""}`}>
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted mb-3">
                {t.leadershipLabel[lang]}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-3">
                {t.leadershipTitle[lang]}
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {t.leadershipBody[lang]}
              </p>
            </div>

            <div className="grid gap-3 mt-5 sm:grid-cols-3">
              {t.leadershipPoints[lang].map((item, index) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-surface-hover px-4 py-4"
                >
                  <p className="text-[11px] font-mono text-muted mb-2">
                    0{index + 1}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/88">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Domain Expertise */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {domains.map((domain, i) => (
            <div
              key={domain.label}
              className={`relative rounded-2xl border border-border bg-surface p-4 sm:p-5 scroll-fade stagger-${Math.min(i + 3, 6)} ${inView ? "in-view" : ""}`}
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
        <div className={`grid grid-cols-3 gap-3 sm:gap-4 max-w-lg scroll-fade stagger-5 ${inView ? "in-view" : ""}`}>
          {counters.map((c) => (
            <CounterCard
              key={c.value}
              end={c.num}
              suffix={c.suffix}
              label={c.label[lang]}
              enabled={inView}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 border-t border-border pt-8 sm:pt-12">
          <div id="stack" />
          <h3 className={`text-xl font-bold tracking-tight mb-6 sm:mb-8 scroll-fade ${inView ? "in-view" : ""}`}>
            {t.stackTitle[lang]}
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group, index) => (
              <div key={group.label} className={`scroll-fade stagger-${Math.min(index + 1, 6)} space-y-3 ${inView ? "in-view" : ""}`}>
                <h4 className="text-xs font-mono uppercase tracking-widest text-muted">{group.label}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
