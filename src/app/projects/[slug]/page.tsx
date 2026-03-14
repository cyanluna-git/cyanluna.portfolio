import { notFound } from "next/navigation";
import { getProjectDetail, getAllProjectSlugs } from "@/data/project-details";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title.en} — CyanLuna`,
    description: project.tagline.en,
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;

  const project = getProjectDetail(slug);
  if (!project) notFound();

  const initialLang = lang === "ko" ? "ko" : "en";

  return <ProjectDetailClient project={project} initialLang={initialLang} />;
}
