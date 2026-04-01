import type { ArchNode, ArchConnection } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Architecture", ko: "아키텍처" },
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
    border: string;
    background: string;
    text: string;
  }
> = {
  client: {
    chip: "UI",
    border: "rgba(96,165,250,0.24)",
    background:
      "linear-gradient(180deg, rgba(59,130,246,0.08), rgba(255,255,255,0.02)), rgba(255,255,255,0.03)",
    text: "rgb(191,219,254)",
  },
  server: {
    chip: "API",
    border: "rgba(52,211,153,0.22)",
    background:
      "linear-gradient(180deg, rgba(16,185,129,0.08), rgba(255,255,255,0.02)), rgba(255,255,255,0.03)",
    text: "rgb(187,247,208)",
  },
  database: {
    chip: "DB",
    border: "rgba(250,204,21,0.22)",
    background:
      "linear-gradient(180deg, rgba(245,158,11,0.08), rgba(255,255,255,0.02)), rgba(255,255,255,0.03)",
    text: "rgb(253,224,71)",
  },
  service: {
    chip: "SVC",
    border: "rgba(103,232,249,0.22)",
    background:
      "linear-gradient(180deg, rgba(34,211,238,0.08), rgba(255,255,255,0.02)), rgba(255,255,255,0.03)",
    text: "rgb(165,243,252)",
  },
  external: {
    chip: "EXT",
    border: "rgba(196,181,253,0.22)",
    background:
      "linear-gradient(180deg, rgba(168,85,247,0.08), rgba(255,255,255,0.02)), rgba(255,255,255,0.03)",
    text: "rgb(221,214,254)",
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

function getArrowGlyph(dx: number, dy: number) {
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? "→" : "←";
  }
  return dy >= 0 ? "↓" : "↑";
}

function getGridTrack(count: number, nodeSize: string, arrowSize: string) {
  return Array.from({ length: count * 2 - 1 }, (_, index) =>
    index % 2 === 0 ? nodeSize : arrowSize,
  ).join(" ");
}

export default function ArchSection({
  architecture,
  verticalColor,
  lang,
}: ArchSectionProps) {
  const { nodes, connections } = architecture;

  const sortedX = [...new Set(nodes.map((node) => node.x))].sort((a, b) => a - b);
  const sortedY = [...new Set(nodes.map((node) => node.y))].sort((a, b) => a - b);

  const nodeIndex = new Map(
    nodes.map((node) => [
      node.id,
      {
        col: sortedX.indexOf(node.x),
        row: sortedY.indexOf(node.y),
      },
    ]),
  );

  return (
    <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-xl font-bold tracking-tight sm:mb-10 sm:text-2xl">
          {sectionT.title[lang]}
        </h2>

        <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(17,24,39,0.98))] p-4 shadow-[0_30px_90px_rgba(2,6,23,0.45)] sm:p-6">
          <div
            className="rounded-[1.7rem] border border-white/8 p-8"
            style={{
              minWidth: `${sortedX.length * 240 + Math.max(0, sortedX.length - 1) * 72}px`,
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              backgroundPosition: "-1px -1px",
              backgroundColor: "rgba(15,23,42,0.52)",
              boxShadow: `inset 0 1px 0 ${verticalColor}30`,
            }}
          >
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: getGridTrack(sortedX.length, "minmax(230px, 230px)", "72px"),
                gridTemplateRows: getGridTrack(sortedY.length, "132px", "72px"),
              }}
            >
              {connections.map((connection, index) => {
                const from = nodeIndex.get(connection.from);
                const to = nodeIndex.get(connection.to);
                if (!from || !to) return null;

                const dx = to.col - from.col;
                const dy = to.row - from.row;
                const isHorizontal = from.row === to.row;
                const label = connection.label?.[lang];

                const gridColumn = isHorizontal
                  ? `${Math.min(from.col, to.col) * 2 + 2} / ${Math.max(from.col, to.col) * 2 + 1}`
                  : `${from.col * 2 + 1}`;
                const gridRow = isHorizontal
                  ? `${from.row * 2 + 1}`
                  : `${Math.min(from.row, to.row) * 2 + 2} / ${Math.max(from.row, to.row) * 2 + 1}`;

                return (
                  <div
                    key={`${connection.from}-${connection.to}-${index}`}
                    className="relative z-0 flex items-center justify-center"
                    style={{
                      gridColumn,
                      gridRow,
                      minWidth: isHorizontal ? "72px" : "100%",
                      minHeight: isHorizontal ? "100%" : "72px",
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: isHorizontal ? "calc(100% - 18px)" : "3px",
                        height: isHorizontal ? "3px" : "calc(100% - 18px)",
                        background: `${verticalColor}55`,
                      }}
                    />
                    {label ? (
                      <div
                        className="absolute rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/70"
                        style={{
                          top: isHorizontal ? "-0.3rem" : "0.2rem",
                          left: isHorizontal ? "50%" : "calc(50% + 1.9rem)",
                          transform: isHorizontal ? "translateX(-50%)" : "translateX(0)",
                          background: "rgba(17,24,39,0.92)",
                          borderColor: "rgba(255,255,255,0.1)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </div>
                    ) : null}
                    <div
                      className="relative z-10 inline-grid h-14 w-14 place-items-center rounded-full border text-[1.55rem] font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(209,138,88,0.14), rgba(94,142,160,0.1)), rgba(255,255,255,0.03)",
                        borderColor: "rgba(209,138,88,0.22)",
                        color: "rgba(226,191,157,0.96)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                        fontFamily: '\"JetBrains Mono\", \"IBM Plex Sans KR\", monospace',
                      }}
                    >
                      {getArrowGlyph(dx, dy)}
                    </div>
                  </div>
                );
              })}

              {nodes.map((node) => {
                const position = nodeIndex.get(node.id);
                const meta = nodeTypeMeta[node.type];
                if (!position) return null;

                return (
                  <article
                    key={node.id}
                    className="relative z-10 grid gap-2 rounded-[1.55rem] border px-6 py-5"
                    style={{
                      gridColumn: `${position.col * 2 + 1}`,
                      gridRow: `${position.row * 2 + 1}`,
                      borderColor: meta.border,
                      background: meta.background,
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 36px rgba(0,0,0,0.14)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[0.78rem] font-mono uppercase tracking-[0.22em] text-white/42">
                        {legendT[node.type][lang]}
                      </span>
                      <span
                        className="inline-grid min-w-14 place-items-center rounded-full border px-3 py-1 text-[0.72rem] font-bold tracking-[0.08em] text-white/82"
                        style={{
                          borderColor: "rgba(255,255,255,0.08)",
                          background: "rgba(8,12,17,0.36)",
                          fontFamily: '\"JetBrains Mono\", \"IBM Plex Sans KR\", monospace',
                        }}
                      >
                        {meta.chip}
                      </span>
                    </div>
                    <strong
                      className="font-mono text-[1.15rem] leading-tight sm:text-[1.25rem]"
                      style={{ color: meta.text }}
                    >
                      {node.label[lang]}
                    </strong>
                  </article>
                );
              })}
            </div>
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
