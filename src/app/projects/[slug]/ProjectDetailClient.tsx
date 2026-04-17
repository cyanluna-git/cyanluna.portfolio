"use client";

import { useState, useEffect } from "react";
import type { ProjectDetail } from "@/types/project-detail";
import Nav from "@/components/Nav";
import {
  Breadcrumb,
  ProjectHero,
  ProblemSection,
  IntroductionSection,
  ApproachSection,
  FeatureShowcase,
  ArchSection,
  ResultsSection,
  ProjectNav,
} from "@/components/project";

type Lang = "en" | "ko";

interface ProjectDetailClientProps {
  project: ProjectDetail;
  initialLang: Lang;
}

export default function ProjectDetailClient({
  project,
  initialLang,
}: ProjectDetailClientProps) {
  const [lang, setLang] = useState<Lang>(initialLang);

  // Update URL search param when lang changes (without full navigation)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (lang === "ko") {
      url.searchParams.set("lang", "ko");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  return (
    <div className="min-h-screen">
      <Nav lang={lang} onLangChange={setLang} showHomeLinks={false} />

      <Breadcrumb
        vertical={project.vertical}
        verticalColor={project.verticalColor}
        projectTitle={project.title}
        lang={lang}
      />

      <ProjectHero
        title={project.title}
        tagline={project.tagline}
        status={project.status}
        verticalColor={project.verticalColor}
        heroImage={project.heroImage}
        liveUrl={project.liveUrl}
        lang={lang}
      />

      <ProblemSection
        painPoints={project.painPoints}
        beforeAfter={project.beforeAfter}
        verticalColor={project.verticalColor}
        lang={lang}
      />

      {project.introduction ? (
        <IntroductionSection
          introduction={project.introduction}
          verticalColor={project.verticalColor}
          lang={lang}
        />
      ) : null}

      <ApproachSection
        approach={project.approach}
        verticalColor={project.verticalColor}
        lang={lang}
      />

      <FeatureShowcase
        features={project.features}
        verticalColor={project.verticalColor}
        lang={lang}
      />

      <ArchSection
        architecture={project.architecture}
        verticalColor={project.verticalColor}
        lang={lang}
      />

      <ResultsSection
        metrics={project.metrics}
        verticalColor={project.verticalColor}
        lang={lang}
      />

      <ProjectNav
        prevProject={project.prevProject}
        nextProject={project.nextProject}
        lang={lang}
      />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-zinc-600 font-mono">cyanluna.dev</p>
        </div>
      </footer>
    </div>
  );
}
