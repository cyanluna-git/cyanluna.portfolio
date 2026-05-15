import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const ACCENT_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

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

const VALID_TYPES = new Set(["pitch", "report", "demo", "lab"]);

export function GET(request: NextRequest): Response {
  const { searchParams } = request.nextUrl;

  const rawTitle = searchParams.get("title") ?? "Untitled";
  // Truncate at 80 chars
  const title = rawTitle.length > 80 ? rawTitle.slice(0, 79) + "…" : rawTitle;

  const rawType = searchParams.get("type") ?? "lab";
  const type = VALID_TYPES.has(rawType) ? rawType : "lab";
  const typeColor = TYPE_COLORS[type] ?? TYPE_COLORS.lab;
  const typeLabel = TYPE_LABELS[type] ?? "Lab";

  const response = new ImageResponse(
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
        {/* Accent color bar at top */}
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
            <div
              key={color}
              style={{
                flex: 1,
                backgroundColor: color,
              }}
            />
          ))}
        </div>

        {/* Subtle gradient background */}
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

        {/* Bottom-right branding */}
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
    {
      width: 1200,
      height: 630,
    },
  );

  // Add cache headers
  response.headers.set("Cache-Control", "public, max-age=86400, immutable");
  return response;
}
