import type {
  Feature,
  ProjectIntroduction,
} from "@/types/project-detail";
import BrowserFrame from "@/components/project/BrowserFrame";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Introduction", ko: "프로젝트 소개" },
  why: { en: "Why It Exists", ko: "왜 만들었는가" },
  what: { en: "System Overview", ko: "시스템 개요" },
  how: { en: "Core Capabilities", ko: "핵심 기능" },
  screens: { en: "Live Screens", ko: "실제 화면" },
  next: { en: "Rollout Direction", ko: "확장 방향" },
  problemFrames: { en: "Problem frames", ko: "문제 프레임" },
  systemLayers: { en: "System layers", ko: "시스템 레이어" },
  capability: { en: "Capability", ko: "기능" },
  actualScreen: { en: "Actual screen", ko: "실제 화면" },
  layer: { en: "Layer", ko: "레이어" },
};

const statusStyles: Record<
  "active" | "planned" | "future",
  string
> = {
  active: "bg-blue-500/12 text-blue-500 border-blue-500/25",
  planned: "bg-amber-500/12 text-amber-500 border-amber-500/25",
  future: "bg-zinc-500/12 text-zinc-500 border-zinc-500/25",
};

interface IntroductionSectionProps {
  introduction: ProjectIntroduction;
  verticalColor: string;
  lang: Lang;
}

function CapabilityCard({
  feature,
  verticalColor,
  lang,
}: {
  feature: Feature;
  verticalColor: string;
  lang: Lang;
}) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div
        className="mb-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em]"
        style={{
          borderColor: `${verticalColor}25`,
          color: verticalColor,
          backgroundColor: `${verticalColor}12`,
        }}
      >
        {sectionT.capability[lang]}
      </div>
      <h4 className="text-lg font-semibold tracking-tight">{feature.title[lang]}</h4>
      <p className="mt-3 text-sm leading-7 text-muted">{feature.description[lang]}</p>
    </article>
  );
}

export default function IntroductionSection({
  introduction,
  verticalColor,
  lang,
}: IntroductionSectionProps) {
  return (
    <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,255,255,0.58))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em]"
                  style={{
                    borderColor: `${verticalColor}28`,
                    color: verticalColor,
                    backgroundColor: `${verticalColor}10`,
                  }}
                >
                  {sectionT.title[lang]}
                </span>
                {introduction.badge ? (
                  <span className="text-xs font-medium text-muted">
                    {introduction.badge[lang]}
                  </span>
                ) : null}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {introduction.title[lang]}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                {introduction.subtitle[lang]}
              </p>
            </div>
            <div
              className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-border bg-surface/80 p-4"
              style={{
                boxShadow: `inset 0 1px 0 ${verticalColor}18`,
              }}
            >
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                  why
                </p>
                <p className="mt-2 text-2xl font-semibold">{introduction.pillars.length}</p>
                <p className="mt-1 text-xs text-muted">{sectionT.problemFrames[lang]}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                  what
                </p>
                <p className="mt-2 text-2xl font-semibold">{introduction.layers.length}</p>
                <p className="mt-1 text-xs text-muted">{sectionT.systemLayers[lang]}</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${verticalColor}40, transparent)` }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                {sectionT.why[lang]}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {introduction.pillars.map((pillar) => (
                <article
                  key={pillar.title.en}
                  className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                >
                  <div
                    className="inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                    style={{
                      borderColor: `${verticalColor}24`,
                      color: verticalColor,
                      backgroundColor: `${verticalColor}10`,
                    }}
                  >
                    {pillar.label[lang]}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {pillar.title[lang]}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {pillar.description[lang]}
                  </p>
                  {pillar.stat ? (
                    <p className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-muted">
                      {pillar.stat[lang]}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${verticalColor}40, transparent)` }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                {sectionT.what[lang]}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {introduction.layers.map((layer) => (
                <article
                  key={layer.label.en}
                  className="rounded-[1.75rem] border border-border bg-surface p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-tight">{layer.label[lang]}</h3>
                    <span
                      className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                      style={{
                        borderColor: `${verticalColor}24`,
                        color: verticalColor,
                      }}
                    >
                      {sectionT.layer[lang]}
                    </span>
                  </div>
                  {layer.description ? (
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {layer.description[lang]}
                    </p>
                  ) : null}
                  <div className="mt-5 space-y-3">
                    {layer.items.map((item) => (
                      <div
                        key={item.title.en}
                        className="rounded-2xl border border-border bg-background/65 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-semibold">{item.title[lang]}</h4>
                            <p className="mt-2 text-sm leading-6 text-muted">
                              {item.description[lang]}
                            </p>
                          </div>
                          {item.meta ? (
                            <span className="shrink-0 text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
                              {item.meta[lang]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {introduction.screenshots?.length ? (
            <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(90deg, ${verticalColor}40, transparent)` }}
                />
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                  {sectionT.screens[lang]}
                </span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {introduction.screenshots.map((screen) => (
                  <article
                    key={screen.title.en}
                    className="rounded-[1.75rem] border border-border bg-surface p-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                  >
                    <BrowserFrame
                      title={screen.title[lang]}
                      accentColor={verticalColor}
                      imageSrc={screen.image}
                    />
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <h4 className="text-base font-semibold tracking-tight">
                        {screen.title[lang]}
                      </h4>
                      <span
                        className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                        style={{
                          borderColor: `${verticalColor}24`,
                          color: verticalColor,
                          backgroundColor: `${verticalColor}10`,
                        }}
                      >
                        {sectionT.actualScreen[lang]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {screen.description[lang]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${verticalColor}40, transparent)` }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                {sectionT.how[lang]}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {introduction.capabilities.map((capability) => (
                <CapabilityCard
                  key={capability.title.en}
                  feature={capability}
                  verticalColor={verticalColor}
                  lang={lang}
                />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${verticalColor}40, transparent)` }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted">
                {sectionT.next[lang]}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {introduction.roadmap.map((phase) => (
                <article
                  key={phase.label.en}
                  className="rounded-[1.5rem] border border-border bg-surface p-5"
                >
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${statusStyles[phase.status]}`}
                  >
                    {phase.label[lang]}
                  </span>
                  <h4 className="mt-4 text-base font-semibold tracking-tight">
                    {phase.title[lang]}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {phase.description[lang]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
