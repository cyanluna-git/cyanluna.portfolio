import type { Metadata } from "next";
import { getAllProjectSlugs } from "@/data/project-details";
import { HARDCODED_SLUGS } from "@/lib/project-html-blob";
import UploadForm from "./UploadForm";

export const metadata: Metadata = {
  title: "Admin · Upload",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminUploadPage() {
  const staticSlugs = getAllProjectSlugs();

  return (
    <UploadForm
      staticSlugs={staticSlugs}
      hardcodedSlugs={[...HARDCODED_SLUGS]}
    />
  );
}
