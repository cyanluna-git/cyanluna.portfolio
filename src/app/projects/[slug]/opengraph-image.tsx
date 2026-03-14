import { ImageResponse } from "next/og";
import { getProjectDetail, getAllProjectSlugs } from "@/data/project-details";

export const runtime = "edge";
export const alt = "Project — CyanLuna";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VERTICAL_COLORS: Record<string, string> = {
  industrial: "#3B82F6",
  health: "#10B981",
  consumer: "#F59E0B",
  devtools: "#8B5CF6",
};

const VERTICAL_LABELS: Record<string, string> = {
  industrial: "Industrial",
  health: "Health & Fitness",
  consumer: "Consumer",
  devtools: "Developer Tools",
};

export function generateStaticParams(): { slug: string }[] {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ImageResponse> {
  const { slug } = await params;
  const project = getProjectDetail(slug);

  const title = project?.title.en ?? "Project";
  const tagline = project?.tagline.en ?? "";
  const vertical = project?.vertical ?? "industrial";
  const verticalColor = VERTICAL_COLORS[vertical] ?? "#3B82F6";
  const verticalLabel = VERTICAL_LABELS[vertical] ?? "Project";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#09090b",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vertical accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: verticalColor,
          }}
        />

        {/* Subtle gradient background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: `radial-gradient(circle at bottom right, ${verticalColor}15, transparent 70%)`,
          }}
        />

        {/* Vertical badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid #27272a",
            backgroundColor: "#18181b",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: verticalColor,
            }}
          />
          <span style={{ fontSize: "16px", color: "#a1a1aa" }}>
            {verticalLabel}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {tagline}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#52525b",
            }}
          >
            CyanLuna
          </span>
          <span
            style={{
              fontSize: "16px",
              color: "#52525b",
              fontFamily: "monospace",
            }}
          >
            cyanlunaportfolio.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
