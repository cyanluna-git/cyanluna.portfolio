import { notFound } from "next/navigation";
import { getProjectDetail } from "@/data/project-details";
import { getProjectHtmlUrl } from "@/lib/project-html-blob";
import ProjectDetailClient from "./ProjectDetailClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = "https://cyanluna.com";

async function safeGetBlobUrl(slug: string): Promise<string | null> {
  try {
    return await getProjectHtmlUrl(slug);
  } catch (err: unknown) {
    console.error("[slug/page] getProjectHtmlUrl threw for slug:", slug, err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  if (project) {
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

  const blobUrl = await safeGetBlobUrl(slug);
  if (blobUrl) {
    return { title: slug };
  }

  return { title: "Project Not Found" };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;

  const blobUrl = await safeGetBlobUrl(slug);
  if (blobUrl) {
    return (
      <iframe
        src={blobUrl}
        sandbox="allow-scripts"
        title={slug}
        style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
      />
    );
  }

  const { lang } = await searchParams;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const initialLang = lang === "ko" ? "ko" : "en";

  return <ProjectDetailClient project={project} initialLang={initialLang} />;
}
