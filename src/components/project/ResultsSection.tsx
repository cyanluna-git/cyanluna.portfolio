import type { Metric } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Results", ko: "성과" },
};

interface ResultsSectionProps {
  metrics: Metric[];
  verticalColor: string;
  lang: Lang;
}

export default function ResultsSection({
  metrics,
  verticalColor,
  lang,
}: ResultsSectionProps) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-10">
          {sectionT.title[lang]}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-border bg-surface p-4 sm:p-6 text-center hover:bg-surface-hover transition-colors"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${verticalColor}40, transparent)`,
                }}
              />
              <div
                className="text-2xl sm:text-3xl font-bold font-mono mb-1 sm:mb-2"
                style={{ color: verticalColor }}
              >
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium mb-1">
                {metric.label[lang]}
              </div>
              {metric.description && (
                <p className="text-[11px] sm:text-xs text-muted">
                  {metric.description[lang]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
