"use client";

import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

type Lang = "en" | "ko";

const t = {
  sectionTitle: {
    en: "From Three Worlds to One Strategy",
    ko: "\uc138 \uac1c\uc758 \uc138\uacc4\ub97c \ud558\ub098\uc758 \uc804\ub7b5\uc73c\ub85c",
  },
  strategyLabel: {
    en: "Strategic thesis",
    ko: "\uc804\ub7b5 \ud14c\uc81c",
  },
  strategyTitle: {
    en: "The value is not just the apps. It is the operating system behind them.",
    ko: "\uac00\uce58\ub294 \uc571 \uc790\uccb4\ubcf4\ub2e4, \uadf8 \ub4a4\uc758 \uc6b4\uc601 \uc2dc\uc2a4\ud15c\uc5d0 \uc788\uc2b5\ub2c8\ub2e4.",
  },
  strategyBody: {
    en: "My strongest position sits at the intersection of manufacturing DX, full-stack product delivery, and AI-native tooling. I go deep on the real operational problem, make the data legible, and build the missing software layer fast enough for the team to use it immediately.",
    ko: "\uc81c \uac00\uc7a5 \uac15\ud55c \ud3ec\uc9c0\uc158\uc740 \uc81c\uc870 DX, \ud480\uc2a4\ud0dd \uc81c\ud488 \uad6c\ud604, AI Native \ub3c4\uad6c\uc758 \uad50\ucc28\uc810\uc5d0 \uc788\uc2b5\ub2c8\ub2e4. \uc2e4\uc81c \uc6b4\uc601 \ubb38\uc81c\ub97c \uae4a\uc774 \ud30c\uace0\ub4e4\uc5b4 \ub370\uc774\ud130\ub97c \ubcf4\uc774\uac8c \ub9cc\ub4e4\uace0, \ud300\uc774 \ubc14\ub85c \uc4f8 \uc218 \uc788\ub294 \uc18c\ud504\ud2b8\uc6e8\uc5b4 \ub808\uc774\uc5b4\ub97c \ube60\ub974\uac8c \uad6c\ucd95\ud569\ub2c8\ub2e4.",
  },
  strategyNote: {
    en: "Solo build-and-deploy experience became enterprise leverage because it gave me a working map for OQC, EOB, and the next integration surface.",
    ko: "\ud63c\uc790 \ub9cc\ub4e4\uace0 \ubc30\ud3ec\ud574 \ubcf8 \uacbd\ud5d8\uc740 OQC, EOB, \uadf8\ub9ac\uace0 \ub2e4\uc74c \ud1b5\ud569 \ud45c\uba74\uc744 \uadf8\ub824\ub0bc \uc218 \uc788\ub294 \uc791\ub3d9 \uc9c0\ub3c4\uac00 \ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
  },
  roadmapTitle: {
    en: "Enterprise direction",
    ko: "\uc5d4\ud130\ud504\ub77c\uc774\uc988 \ubc29\ud5a5",
  },
  roadmapNote: {
    en: "Microsoft 365 and SAP are planned integration targets, not yet shipped public features.",
    ko: "Microsoft 365\uc640 SAP\ub294 \uad6c\ucd95 \uc608\uc815 \ud1b5\ud569 \ub300\uc0c1\uc774\uba70, \uc544\uc9c1 \uacf5\uac1c \uc6b4\uc601 \uae30\ub2a5\uc740 \uc544\ub2d9\ub2c8\ub2e4.",
  },
  categories: {
    manufacturing: { en: "Manufacturing DX", ko: "\uc81c\uc870 DX" },
    fullstack: { en: "Full-Stack Product", ko: "\ud480\uc2a4\ud0dd \ud504\ub85c\ub355\ud2b8" },
    ainative: { en: "AI-Native Tooling", ko: "AI \ub124\uc774\ud2f0\ube0c \ub3c4\uad6c" },
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

const roadmapItems = {
  now: {
    label: { en: "Now", ko: "\ud604\uc7ac" },
    body: {
      en: "OQC and EOB are being shaped as connected operating surfaces for quality and execution.",
      ko: "OQC\uc640 EOB\ub294 \ud488\uc9c8\uacfc \uc2e4\ud589\uc744 \uc5f0\uacb0\ud558\ub294 \uc6b4\uc601 \ud45c\uba74\uc73c\ub85c \uad6c\uc131\ub418\uace0 \uc788\uc2b5\ub2c8\ub2e4.",
    },
  },
  m365: {
    label: { en: "Planned", ko: "\uad6c\ucd95 \uc608\uc815" },
    body: {
      en: "Microsoft 365 workflow links for coordination, approvals, reporting, and operational follow-through.",
      ko: "\uc870\uc728, \uc2b9\uc778, \ubcf4\uace0, \uc6b4\uc601 \ud6c4\uc18d \ud750\ub984\uc744 \uc704\ud55c Microsoft 365 \uc6cc\ud06c\ud50c\ub85c\uc6b0 \uc5f0\uacc4.",
    },
  },
  sap: {
    label: { en: "Planned", ko: "\uad6c\ucd95 \uc608\uc815" },
    body: {
      en: "SAP connectivity for enterprise records, handoffs, and operational continuity.",
      ko: "\uc5d4\ud130\ud504\ub77c\uc774\uc988 \uae30\ub85d, \ud578\ub4dc\uc624\ud504, \uc6b4\uc601 \uc5f0\uc18d\uc131\uc744 \uc704\ud55c SAP \uc5f0\uacc4.",
    },
  },
};

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
          fontFamily="var(--font-ui), system-ui, sans-serif"
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
          fontFamily="var(--font-ui), system-ui, sans-serif"
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
          fontFamily="var(--font-ui), system-ui, sans-serif"
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

        <div className="grid gap-4 mb-8 sm:mb-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            className={`rounded-2xl border border-border bg-surface p-5 sm:p-6 scroll-fade stagger-2 ${inView ? "in-view" : ""}`}
          >
            <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted">
              {t.strategyLabel[lang]}
            </p>
            <h3 className="max-w-2xl text-lg font-semibold tracking-tight sm:text-2xl">
              {t.strategyTitle[lang]}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {t.strategyBody[lang]}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {t.strategyNote[lang]}
            </p>
          </div>

          <div
            className={`rounded-2xl border border-border bg-surface p-5 sm:p-6 scroll-fade stagger-3 ${inView ? "in-view" : ""}`}
          >
            <h3 className="text-sm font-semibold tracking-tight sm:text-base">
              {t.roadmapTitle[lang]}
            </h3>
            <div className="mt-4 space-y-3">
              {(["now", "m365", "sap"] as const).map((key) => (
                <div key={key} className="rounded-xl border border-border bg-surface-hover px-4 py-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
                    {roadmapItems[key].label[lang]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/88">
                    {roadmapItems[key].body[lang]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              {t.roadmapNote[lang]}
            </p>
          </div>
        </div>

        {/* Venn Diagram */}
        <div className={`scroll-fade stagger-4 ${inView ? "in-view" : ""}`}>
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
