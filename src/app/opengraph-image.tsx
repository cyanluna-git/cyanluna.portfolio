import { ImageResponse } from "next/og";

export const alt = "CyanLuna — Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VERTICAL_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export default function OgImage(): ImageResponse {
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
          {VERTICAL_COLORS.map((color) => (
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
            background:
              "radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.08), transparent 70%)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          CyanLuna
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Full-stack engineer building manufacturing automation, health tech, and
          AI-native developer tools.
        </div>

        {/* Domain pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "48px",
          }}
        >
          {[
            { label: "Industrial", color: "#3B82F6" },
            { label: "Health & Fitness", color: "#10B981" },
            { label: "Consumer", color: "#F59E0B" },
            { label: "Developer Tools", color: "#8B5CF6" },
          ].map((domain) => (
            <div
              key={domain.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #27272a",
                backgroundColor: "#18181b",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: domain.color,
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  color: "#a1a1aa",
                }}
              >
                {domain.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom-right URL */}
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
