import type { ReactNode } from "react";

interface BrowserFrameProps {
  title?: string;
  accentColor?: string;
  imageSrc?: string;
  children?: ReactNode;
}

export default function BrowserFrame({
  title = "localhost:3000",
  accentColor = "#3B82F6",
  imageSrc,
  children,
}: BrowserFrameProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-surface">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] font-mono text-muted">{title}</span>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Content area */}
      <div className="relative aspect-video">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : children ? (
          children
        ) : (
          /* Gradient fallback */
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 50%, transparent 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: `${accentColor}40` }}
                >
                  <svg
                    className="w-6 h-6"
                    style={{ color: `${accentColor}60` }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
                <span className="text-xs">Screenshot</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
