import type { ArchNode, ArchConnection } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Architecture", ko: "아키텍처" },
  subtitle: {
    en: "Readable system flow, not tiny node maps.",
    ko: "작은 노드맵이 아니라, 바로 읽히는 시스템 흐름.",
  },
};

const legendT = {
  client: { en: "Client", ko: "클라이언트" },
  server: { en: "Server", ko: "서버" },
  database: { en: "Database", ko: "데이터베이스" },
  service: { en: "Service", ko: "서비스" },
  external: { en: "External", ko: "외부 시스템" },
};

const nodeTypeMeta: Record<
  ArchNode["type"],
  {
    chip: string;
    surface: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeBorder: string;
  }
> = {
  client: {
    chip: "UI",
    surface: "linear-gradient(145deg, rgba(59,130,246,0.16), rgba(15,23,42,0.92))",
    border: "rgba(96,165,250,0.42)",
    text: "rgb(191,219,254)",
    badgeBg: "rgba(30,41,59,0.82)",
    badgeBorder: "rgba(96,165,250,0.28)",
  },
  server: {
    chip: "API",
    surface: "linear-gradient(145deg, rgba(16,185,129,0.16), rgba(15,23,42,0.92))",
    border: "rgba(52,211,153,0.4)",
    text: "rgb(167,243,208)",
    badgeBg: "rgba(17,24,39,0.82)",
    badgeBorder: "rgba(52,211,153,0.28)",
  },
  database: {
    chip: "DB",
    surface: "linear-gradient(145deg, rgba(245,158,11,0.14), rgba(15,23,42,0.92))",
    border: "rgba(251,191,36,0.38)",
    text: "rgb(253,230,138)",
    badgeBg: "rgba(24,24,27,0.82)",
    badgeBorder: "rgba(251,191,36,0.24)",
  },
  service: {
    chip: "SVC",
    surface: "linear-gradient(145deg, rgba(34,211,238,0.16), rgba(15,23,42,0.92))",
    border: "rgba(103,232,249,0.38)",
    text: "rgb(165,243,252)",
    badgeBg: "rgba(17,24,39,0.82)",
    badgeBorder: "rgba(103,232,249,0.24)",
  },
  external: {
    chip: "EXT",
    surface: "linear-gradient(145deg, rgba(168,85,247,0.16), rgba(15,23,42,0.92))",
    border: "rgba(196,181,253,0.38)",
    text: "rgb(221,214,254)",
    badgeBg: "rgba(24,24,27,0.82)",
    badgeBorder: "rgba(196,181,253,0.22)",
  },
};

interface ArchSectionProps {
  architecture: {
    nodes: ArchNode[];
    connections: ArchConnection[];
  };
  verticalColor: string;
  lang: Lang;
}

function getAlphaColor(hex: string, alpha: string) {
  return hex.startsWith("#") && hex.length === 7 ? `${hex}${alpha}` : hex;
}

function getArrowGlyph(dx: number, dy: number) {
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? "→" : "←";
  }
  return dy >= 0 ? "↓" : "↑";
}

export default function ArchSection({
  architecture,
  verticalColor,
  lang,
}: ArchSectionProps) {
  const { nodes, connections } = architecture;

  const sortedX = [...new Set(nodes.map((node) => node.x))].sort((a, b) => a - b);
  const sortedY = [...new Set(nodes.map((node) => node.y))].sort((a, b) => a - b);

  const cardWidth = 230;
  const cardHeight = 118;
  const padX = 44;
  const padY = 40;
  const colGap = 292;
  const rowGap = 194;

  const positions = new Map(
    nodes.map((node) => {
      const col = sortedX.indexOf(node.x);
      const row = sortedY.indexOf(node.y);
      const left = padX + col * colGap;
      const top = padY + row * rowGap;

      return [
        node.id,
        {
          left,
          top,
          centerX: left + cardWidth / 2,
          centerY: top + cardHeight / 2,
        },
      ];
    }),
  );

  const canvasWidth =
    padX * 2 + Math.max(0, sortedX.length - 1) * colGap + cardWidth;
  const canvasHeight =
    padY * 2 + Math.max(0, sortedY.length - 1) * rowGap + cardHeight;

  return (
    <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {sectionT.title[lang]}
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            {sectionT.subtitle[lang]}
          </p>
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(17,24,39,0.98))] p-4 shadow-[0_30px_90px_rgba(2,6,23,0.45)] sm:p-6">
          <div
            className="relative rounded-[1.75rem] border border-white/8"
            style={{
              minWidth: canvasWidth,
              minHeight: canvasHeight,
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              backgroundPosition: "-1px -1px",
              backgroundColor: "rgba(15,23,42,0.58)",
              boxShadow: `inset 0 1px 0 ${getAlphaColor(verticalColor, "30")}`,
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
              width={canvasWidth}
              height={canvasHeight}
            >
              <defs>
                <marker
                  id="arch-arrowhead"
                  markerWidth="14"
                  markerHeight="10"
                  refX="11"
                  refY="5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 14 5, 0 10"
                    fill={getAlphaColor(verticalColor, "cc")}
                  />
                </marker>
              </defs>

              {connections.map((connection, index) => {
                const fromNode = nodes.find((node) => node.id === connection.from);
                const toNode = nodes.find((node) => node.id === connection.to);
                const from = positions.get(connection.from);
                const to = positions.get(connection.to);

                if (!from || !to || !fromNode || !toNode) return null;

                const dx = to.centerX - from.centerX;
                const dy = to.centerY - from.centerY;

                let startX = from.centerX;
                let startY = from.centerY;
                let endX = to.centerX;
                let endY = to.centerY;

                if (Math.abs(dx) >= Math.abs(dy)) {
                  startX = dx >= 0 ? from.left + cardWidth : from.left;
                  endX = dx >= 0 ? to.left : to.left + cardWidth;
                  startY = from.centerY;
                  endY = to.centerY;
                } else {
                  startY = dy >= 0 ? from.top + cardHeight : from.top;
                  endY = dy >= 0 ? to.top : to.top + cardHeight;
                  startX = from.centerX;
                  endX = to.centerX;
                }

                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;
                const dominantHorizontal = Math.abs(dx) >= Math.abs(dy);
                const path = dominantHorizontal
                  ? `M ${startX} ${startY} C ${startX + dx * 0.35} ${startY}, ${endX - dx * 0.35} ${endY}, ${endX} ${endY}`
                  : `M ${startX} ${startY} C ${startX} ${startY + dy * 0.35}, ${endX} ${endY - dy * 0.35}, ${endX} ${endY}`;

                const label = connection.label?.[lang];
                const labelWidth = label
                  ? Math.max(72, label.length * 7.4 + 22)
                  : 0;
                const arrowGlyph = getArrowGlyph(dx, dy);

                return (
                  <g key={`${connection.from}-${connection.to}-${index}`}>
                    <path
                      d={path}
                      fill="none"
                      stroke={getAlphaColor(verticalColor, "80")}
                      strokeWidth="3"
                      strokeLinecap="round"
                      markerEnd="url(#arch-arrowhead)"
                    />
                    {label ? (
                      <>
                        <rect
                          x={midX - labelWidth / 2}
                          y={midY - 54}
                          width={labelWidth}
                          height="26"
                          rx="13"
                          fill="rgba(17,24,39,0.96)"
                          stroke="rgba(255,255,255,0.12)"
                        />
                        <text
                          x={midX}
                          y={midY - 36}
                          textAnchor="middle"
                          style={{
                            fill: "rgba(226,232,240,0.82)",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                            textTransform: "uppercase",
                          }}
                        >
                          {label}
                        </text>
                      </>
                    ) : null}
                    <circle
                      cx={midX}
                      cy={midY}
                      r="24"
                      fill="rgba(39,45,56,0.94)"
                      stroke={getAlphaColor(verticalColor, "4d")}
                      strokeWidth="2"
                    />
                    <text
                      x={midX}
                      y={midY + 7}
                      textAnchor="middle"
                      style={{
                        fill: getAlphaColor(verticalColor, "e6"),
                        fontSize: "26px",
                        fontWeight: 700,
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      }}
                    >
                      {arrowGlyph}
                    </text>
                  </g>
                );
              })}
            </svg>

            {nodes.map((node, index) => {
              const position = positions.get(node.id);
              const meta = nodeTypeMeta[node.type];

              if (!position) return null;

              return (
                <article
                  key={node.id}
                  className="absolute flex flex-col justify-between rounded-[1.75rem] border px-6 py-5 shadow-[0_20px_60px_rgba(2,6,23,0.28)] transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    left: position.left,
                    top: position.top,
                    width: cardWidth,
                    minHeight: cardHeight,
                    borderColor: meta.border,
                    background: meta.surface,
                    color: meta.text,
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/58">
                      {legendT[node.type][lang]}
                    </span>
                    <span
                      className="inline-flex min-w-[58px] justify-center rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/80"
                      style={{
                        backgroundColor: meta.badgeBg,
                        borderColor: meta.badgeBorder,
                      }}
                    >
                      {meta.chip}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-mono text-[1.45rem] font-semibold leading-tight tracking-tight sm:text-[1.6rem]">
                      {node.label[lang]}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {(Object.keys(nodeTypeMeta) as ArchNode["type"][]).map((type) => (
            <div
              key={type}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5"
            >
              <span
                className="inline-flex h-3 w-3 rounded-full"
                style={{ backgroundColor: nodeTypeMeta[type].text }}
              />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                {legendT[type][lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
