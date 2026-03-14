import type { PainPoint, BeforeAfter, BiText } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "The Problem", ko: "문제" },
  beforeLabel: { en: "Before", ko: "이전" },
  afterLabel: { en: "After", ko: "이후" },
};

interface ProblemSectionProps {
  painPoints: PainPoint[];
  beforeAfter: BeforeAfter[];
  verticalColor: string;
  lang: Lang;
}

export default function ProblemSection({
  painPoints,
  beforeAfter,
  verticalColor,
  lang,
}: ProblemSectionProps) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-10">
          {sectionT.title[lang]}
        </h2>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-16">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-border bg-surface p-5 sm:p-6 hover:bg-surface-hover transition-colors"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${verticalColor}40, transparent)`,
                }}
              />
              <div className="text-2xl mb-3">{point.icon}</div>
              <h3 className="text-sm font-semibold mb-2">{point.title[lang]}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {point.description[lang]}
              </p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        {beforeAfter.length > 0 && (
          <div className="space-y-4">
            {beforeAfter.map((ba, i) => (
              <div
                key={i}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 mb-2 block">
                    {sectionT.beforeLabel[lang]}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {ba.before[lang]}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
                    {sectionT.afterLabel[lang]}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {ba.after[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
