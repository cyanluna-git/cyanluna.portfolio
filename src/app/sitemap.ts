import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/project-details";

const SITE_URL = "https://cyanluna.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
