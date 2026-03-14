"use client";

import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

type Lang = "en" | "ko";

const t = {
  sectionTitle: {
    en: "Three Worlds, One Engineer",
    ko: "\uc138 \uac1c\uc758 \uc138\uacc4, \ud55c \uba85\uc758 \uc5d4\uc9c0\ub2c8\uc5b4",
  },
  categories: {
    manufacturing: { en: "Manufacturing DX", ko: "\uc81c\uc870 DX" },
    fullstack: { en: "Full-Stack Product", ko: "\ud480\uc2a4\ud0dd \ud504\ub85c\ub355\ud2b8" },
    ainative: { en: "AI-Native Tooling", ko: "AI \ub124\uc774\ud2f0\ube0c \ub3c4\uad6c" },
  },
  quote: {
    en: "Most engineers live in one world. I ship products that span from PLC registers to Vercel deployments.",
    ko: "\ub300\ubd80\ubd84\uc758 \uc5d4\uc9c0\ub2c8\uc5b4\ub294 \ud558\ub098\uc758 \uc138\uacc4\uc5d0 \uc0b4\uc544\uc694. \uc800\ub294 PLC \ub808\uc9c0\uc2a4\ud130\ubd80\ud130 Vercel \ubc30\ud3ec\uae4c\uc9c0 \ud558\ub098\uc758 \uc81c\ud488\uc73c\ub85c \uad00\ud1b5\ud569\ub2c8\ub2e4.",
  },
};

const COLORS = {
  manufacturing: "#3B82F6",
  fullstack: "#94A3B8",
  ainative: "#8B5CF6",
};

interface CategoryData {
  key: "manufacturing" | "fullstack" | "ainative";
  color: string;
  keywords: { en: string; ko: string }[];
}

const categories: CategoryData[] = [
  {
    key: "manufacturing",
    color: COLORS.manufacturing,
    keywords: [
      { en: "PLC Protocols (Modbus, OPC-UA, MQTT)", ko: "PLC \ud504\ub85c\ud1a0\ucf5c (Modbus, OPC-UA, MQTT)" },
      { en: "Equipment APIs", ko: "\uc7a5\ube44 API" },
      { en: "Factory Dashboards", ko: "\uacf5\uc7a5 \ub300\uc2dc\ubcf4\ub4dc" },
      { en: "BDD Quality Control", ko: "BDD \ud488\uc9c8 \uad00\ub9ac" },
    ],
  },
  {
    key: "fullstack",
    color: COLORS.fullstack,
    keywords: [
      { en: "SaaS / Portal / Mobile", ko: "SaaS / \ud3ec\ud138 / \ubaa8\ubc14\uc77c" },
      { en: "React + FastAPI + PostgreSQL", ko: "React + FastAPI + PostgreSQL" },
      { en: "Vercel / Docker / CI-CD", ko: "Vercel / Docker / CI-CD" },
      { en: "Next.js + Flutter", ko: "Next.js + Flutter" },
    ],
  },
  {
    key: "ainative",
    color: COLORS.ainative,
    keywords: [
      { en: "6-Agent Pipeline", ko: "6-\uc5d0\uc774\uc804\ud2b8 \ud30c\uc774\ud504\ub77c\uc778" },
      { en: "Auto Code Review", ko: "\uc790\ub3d9 \ucf54\ub4dc \ub9ac\ubdf0" },
      { en: "30+ Custom Skills", ko: "30+ \ucee4\uc2a4\ud140 \uc2a4\ud0ac" },
      { en: "Sprint Automation", ko: "\uc2a4\ud504\ub9b0\ud2b8 \uc790\ub3d9\ud654" },
    ],
  },
];

const impactNumbers = [
  { end: 11, suffix: "", label: { en: "Products Shipped", ko: "\ucd9c\uc2dc \ud504\ub85c\ub355\ud2b8" } },
  { end: 4, suffix: "", label: { en: "Domain Verticals", ko: "\ub3c4\uba54\uc778 \ubc84\ud2f0\uceec" } },
  { end: 3, suffix: "", label: { en: "Industrial Protocols", ko: "\uc0b0\uc5c5 \ud504\ub85c\ud1a0\ucf5c" } },
  { end: 6, suffix: "", label: { en: "AI Agents", ko: "AI \uc5d0\uc774\uc804\ud2b8" } },
  { end: 30, suffix: "+", label: { en: "Dev Skills Built", ko: "\uac1c\ubc1c \uc2a4\ud0ac \uad6c\ucd95" } },
];

function ImpactCounter({
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

function VennDiagramSVG() {
  return (
    <div className="flex justify-center mb-8 sm:mb-12">
      <svg
        viewBox="0 0 400 350"
        className="w-[280px] h-[240px] sm:w-[400px] sm:h-[350px]"
        role="img"
        aria-label="Venn diagram showing intersection of Manufacturing, Full-Stack, and AI-Native"
      >
        {/* Manufacturing circle - top left */}
        <circle
          cx="160"
          cy="140"
          r="100"
          fill={COLORS.manufacturing}
          fillOpacity="0.12"
          stroke={COLORS.manufacturing}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* AI-Native circle - top right */}
        <circle
          cx="240"
          cy="140"
          r="100"
          fill={COLORS.ainative}
          fillOpacity="0.12"
          stroke={COLORS.ainative}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* Full-Stack circle - bottom center */}
        <circle
          cx="200"
          cy="220"
          r="100"
          fill={COLORS.fullstack}
          fillOpacity="0.12"
          stroke={COLORS.fullstack}
          strokeOpacity="0.4"
          strokeWidth="1"
        />

        {/* Labels */}
        <text
          x="120"
          y="100"
          textAnchor="middle"
          fill={COLORS.manufacturing}
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          Manufacturing
        </text>
        <text
          x="280"
          y="100"
          textAnchor="middle"
          fill={COLORS.ainative}
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          AI-Native
        </text>
        <text
          x="200"
          y="280"
          textAnchor="middle"
          fill={COLORS.fullstack}
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          Full-Stack
        </text>
      </svg>
    </div>
  );
}

export default function IntersectionSection({ lang }: { lang: Lang }) {
  const [ref, inView] = useInView();

  return (
    <section
      id="intersection"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          className={`text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-12 text-center scroll-fade ${inView ? "in-view" : ""}`}
        >
          {t.sectionTitle[lang]}
        </h2>

        {/* Venn Diagram */}
        <div className={`scroll-fade stagger-2 ${inView ? "in-view" : ""}`}>
          <VennDiagramSVG />
        </div>

        {/* Category columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((cat, i) => (
            <div
              key={cat.key}
              className={`relative rounded-2xl border border-border bg-surface p-4 sm:p-5 scroll-fade stagger-${Math.min(i + 3, 6)} ${inView ? "in-view" : ""}`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cat.color}40, transparent)`,
                }}
              />
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="text-sm font-semibold tracking-tight">
                  {t.categories[cat.key][lang]}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.keywords.map((kw) => (
                  <span
                    key={kw.en}
                    className="px-2 py-0.5 text-[11px] font-mono rounded-md border"
                    style={{
                      backgroundColor: `${cat.color}10`,
                      borderColor: `${cat.color}20`,
                      color: cat.color,
                    }}
                  >
                    {kw[lang]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className={`text-center mb-8 sm:mb-12 scroll-fade stagger-5 ${inView ? "in-view" : ""}`}
        >
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg italic text-muted leading-relaxed">
              &ldquo;{t.quote[lang]}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Impact numbers */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 max-w-3xl mx-auto scroll-fade stagger-6 ${inView ? "in-view" : ""}`}
        >
          {impactNumbers.map((item) => (
            <ImpactCounter
              key={item.label.en}
              end={item.end}
              suffix={item.suffix}
              label={item.label[lang]}
              enabled={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
