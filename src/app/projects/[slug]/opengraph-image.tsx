import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { getProjectDetail, getAllProjectSlugs } from "@/data/project-details";
import { getProjectMeta } from "@/lib/project-html-blob";

export const alt = "Project — CyanLuna";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const VERTICAL_COLORS: Record<string, string> = {
  industrial: "#3B82F6",
  cycling: "#10B981",
  cloudops: "#F59E0B",
  aiagents: "#8B5CF6",
};

const VERTICAL_LABELS: Record<string, string> = {
  industrial: "Industrial",
  cycling: "Cycling",
  cloudops: "Cloud Ops",
  aiagents: "AI Agents",
};

const TYPE_COLORS: Record<string, string> = {
  pitch: "#3B82F6",
  report: "#10B981",
  demo: "#F59E0B",
  lab: "#8B5CF6",
};

const TYPE_LABELS: Record<string, string> = {
  pitch: "Pitch",
  report: "Report",
  demo: "Demo",
  lab: "Lab",
};

const ACCENT_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

/** Read image from public dir and return a data URI satori can render.
 *  Converts webp→JPEG (satori doesn't support webp).
 *  Returns null if file is missing or unreadable. */
async function heroDataUri(heroImage: string): Promise<string | null> {
  const abs = path.join(process.cwd(), "public", heroImage);
  if (!fs.existsSync(abs)) return null;
  try {
    const sharp = (await import("sharp")).default;
    const jpeg = await sharp(abs).jpeg({ quality: 85 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

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

  // ── Static project with proper data ──────────────────────────────────────
  if (project) {
    const title = project.title.en;
    const tagline = project.tagline.en;
    const vertical = project.vertical;
    const verticalColor = VERTICAL_COLORS[vertical] ?? "#3B82F6";
    const verticalLabel = VERTICAL_LABELS[vertical] ?? vertical;
    const screenshotSrc = project.heroImage
      ? await heroDataUri(project.heroImage)
      : null;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundColor: "#09090b",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent bar */}
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

          {/* Left: text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "80px",
              width: screenshotSrc ? "58%" : "100%",
              position: "relative",
            }}
          >
            {/* Subtle gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "400px",
                height: "400px",
                background: `radial-gradient(circle at bottom left, ${verticalColor}18, transparent 70%)`,
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
                marginBottom: "28px",
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
                fontSize: screenshotSrc ? "44px" : "56px",
                fontWeight: 700,
                color: "#fafafa",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                maxWidth: screenshotSrc ? "580px" : "900px",
              }}
            >
              {title}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: screenshotSrc ? "18px" : "24px",
                color: "#a1a1aa",
                lineHeight: 1.5,
                maxWidth: screenshotSrc ? "560px" : "800px",
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
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: 600, color: "#52525b" }}>
                CyanLuna
              </span>
              <span style={{ fontSize: "14px", color: "#3f3f46", fontFamily: "monospace" }}>
                cyanluna.com
              </span>
            </div>
          </div>

          {/* Right: screenshot */}
          {screenshotSrc && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "42%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Fade-in from left */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "80px",
                  background: "linear-gradient(to right, #09090b, transparent)",
                  zIndex: 1,
                }}
              />
              <img
                src={screenshotSrc}
                alt=""
                width={504}
                height={630}
                style={{
                  objectFit: "cover",
                  objectPosition: "left top",
                  opacity: 0.85,
                }}
              />
              {/* Top fade */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background: "linear-gradient(to bottom, #09090b, transparent)",
                  zIndex: 1,
                }}
              />
              {/* Bottom fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background: "linear-gradient(to top, #09090b, transparent)",
                  zIndex: 1,
                }}
              />
            </div>
          )}
        </div>
      ),
      { ...size },
    );
  }

  // ── Blob project fallback — read meta sidecar ─────────────────────────────
  const blobMeta = await getProjectMeta(slug);
  const title = blobMeta?.title ?? slug;
  const type = blobMeta?.type ?? "lab";
  const typeColor = TYPE_COLORS[type] ?? "#8B5CF6";
  const typeLabel = TYPE_LABELS[type] ?? "Lab";

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
        {/* Multicolor accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            display: "flex",
          }}
        >
          {ACCENT_COLORS.map((color) => (
            <div key={color} style={{ flex: 1, backgroundColor: color }} />
          ))}
        </div>

        {/* Gradient glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle at bottom right, ${typeColor}14, transparent 70%)`,
          }}
        />

        {/* Type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: `1px solid ${typeColor}40`,
            backgroundColor: `${typeColor}1a`,
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: typeColor,
            }}
          />
          <span
            style={{
              fontSize: "18px",
              color: typeColor,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        {/* Branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "16px",
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          cyanluna.com
        </div>
      </div>
    ),
    { ...size },
  );
}
