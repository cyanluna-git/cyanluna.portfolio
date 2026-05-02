import type { Metadata } from "next";
import { list } from "@vercel/blob";
import { projects } from "@/data/projects";
import { BLOB_PREFIX, HARDCODED_SLUGS } from "@/lib/project-html-blob";
import UploadForm from "./UploadForm";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin · Upload",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminUploadPage() {
  const projectList = projects.map((p) => ({
    slug: p.id,
    title: p.title.en,
  }));

  let uploadedSlugs: string[] = [];
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    uploadedSlugs = blobs.map((b) =>
      b.pathname.slice(BLOB_PREFIX.length).replace(/\.html$/, ""),
    );
  } catch {
    // BLOB_READ_WRITE_TOKEN not set or network error — degrade gracefully
  }

  return (
    <UploadForm
      projectList={projectList}
      uploadedSlugs={uploadedSlugs}
      hardcodedSlugs={[...HARDCODED_SLUGS]}
    />
  );
}
