import type { MetadataRoute } from "next";

const SITE_URL = "https://cyanluna.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/privacy",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
