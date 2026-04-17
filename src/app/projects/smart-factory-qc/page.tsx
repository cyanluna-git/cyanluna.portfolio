import { getProjectDetail } from "@/data/project-details";
import ProjectDetailClient from "@/app/projects/[slug]/ProjectDetailClient";
import { notFound } from "next/navigation";

const SITE_URL = "https://cyanluna.com";
const SLUG = "smart-factory-qc";

export function generateMetadata() {
  const project = getProjectDetail(SLUG);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title.en} — CyanLuna`;
  const description = project.tagline.en;
  const url = `${SITE_URL}/projects/${SLUG}`;

  return {
    title: project.title.en,
    description,
    openGraph: { title, description, url, type: "article" as const },
    twitter: { card: "summary_large_image" as const, title, description },
    alternates: { canonical: url },
  };
}

export default async function SmartFactoryQcPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const project = getProjectDetail(SLUG);
  if (!project) notFound();

  const initialLang = lang === "ko" ? "ko" : "en";

  return <ProjectDetailClient project={project} initialLang={initialLang} />;
}
