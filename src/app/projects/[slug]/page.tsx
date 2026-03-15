import { notFound } from "next/navigation";
import { getProjectDetail, getAllProjectSlugs } from "@/data/project-details";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

const SITE_URL = "https://cyanluna.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title.en} — CyanLuna`;
  const description = project.tagline.en;
  const url = `${SITE_URL}/projects/${slug}`;

  return {
    title: project.title.en,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
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
