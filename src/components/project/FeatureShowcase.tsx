import type { Feature } from "@/types/project-detail";
import BrowserFrame from "./BrowserFrame";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Key Features", ko: "주요 기능" },
};

interface FeatureShowcaseProps {
  features: Feature[];
  verticalColor: string;
  lang: Lang;
}

export default function FeatureShowcase({
  features,
  verticalColor,
  lang,
}: FeatureShowcaseProps) {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-12">
          {sectionT.title[lang]}
        </h2>

        <div className="space-y-20">
          {features.map((feature, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  isEven ? "md:direction-rtl" : ""
                }`}
              >
                {/* Image side */}
                <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
                  <BrowserFrame
                    accentColor={verticalColor}
                    imageSrc={feature.image}
                    title={feature.title.en.toLowerCase().replace(/\s+/g, "-")}
                  />
                </div>

                {/* Text side */}
                <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                  <div
                    className="w-8 h-1 rounded-full mb-4"
                    style={{ backgroundColor: verticalColor }}
                  />
                  <h3 className="text-lg font-semibold mb-3">
                    {feature.title[lang]}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
