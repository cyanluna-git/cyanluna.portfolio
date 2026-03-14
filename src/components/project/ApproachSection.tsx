import type { BiText } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Approach", ko: "접근 방식" },
};

interface ApproachSectionProps {
  approach: {
    title: BiText;
    description: BiText;
  };
  verticalColor: string;
  lang: Lang;
}

export default function ApproachSection({
  approach,
  verticalColor,
  lang,
}: ApproachSectionProps) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-10">
          {sectionT.title[lang]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div>
            <h3
              className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
              style={{ color: verticalColor }}
            >
              {approach.title[lang]}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {approach.description[lang]}
            </p>
          </div>

          {/* Visualization placeholder */}
          <div className="rounded-xl border border-border bg-surface p-5 sm:p-8 flex items-center justify-center min-h-[180px] sm:min-h-[200px]">
            <div className="flex flex-col items-center gap-4">
              {/* Simple flow visualization */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
                {["Define", "Execute", "Collect", "Report"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="px-2.5 sm:px-3 py-2 rounded-lg border text-xs font-mono"
                      style={{
                        borderColor: `${verticalColor}30`,
                        color: verticalColor,
                        backgroundColor: `${verticalColor}10`,
                      }}
                    >
                      {step}
                    </div>
                    {i < 3 && (
                      <svg
                        className="w-4 h-4 text-muted shrink-0 hidden sm:block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted font-mono mt-2">
                BDD Pipeline Flow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
