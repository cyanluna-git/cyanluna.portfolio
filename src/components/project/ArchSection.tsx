import type { ArchNode, ArchConnection } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Architecture", ko: "아키텍처" },
};

const nodeTypeStyles: Record<ArchNode["type"], string> = {
  client: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  server: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  database: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  external: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  service: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
};

interface ArchSectionProps {
  architecture: {
    nodes: ArchNode[];
    connections: ArchConnection[];
  };
  verticalColor: string;
  lang: Lang;
}

export default function ArchSection({
  architecture,
  verticalColor,
  lang,
}: ArchSectionProps) {
  const { nodes, connections } = architecture;

  // Compute SVG viewbox from node positions
  const maxX = Math.max(...nodes.map((n) => n.x)) + 150;
  const maxY = Math.max(...nodes.map((n) => n.y)) + 60;

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8 sm:mb-10">
          {sectionT.title[lang]}
        </h2>

        <div className="rounded-xl border border-border bg-surface p-4 sm:p-6 overflow-x-auto -mx-4 sm:mx-0">
          <div className="relative" style={{ minWidth: maxX, minHeight: maxY }}>
            {/* SVG arrows layer */}
            <svg
              className="absolute inset-0 pointer-events-none"
              viewBox={`0 0 ${maxX} ${maxY}`}
              width={maxX}
              height={maxY}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 8 3, 0 6"
                    fill={`${verticalColor}80`}
                  />
                </marker>
              </defs>
              {connections.map((conn, i) => {
                const from = nodeMap.get(conn.from);
                const to = nodeMap.get(conn.to);
                if (!from || !to) return null;

                const x1 = from.x + 60;
                const y1 = from.y + 20;
                const x2 = to.x + 60;
                const y2 = to.y + 20;
                const mx = (x1 + x2) / 2;
                const my = (y1 + y2) / 2;

                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={`${verticalColor}40`}
                      strokeWidth={1.5}
                      markerEnd="url(#arrowhead)"
                    />
                    {conn.label && (
                      <text
                        x={mx}
                        y={my - 6}
                        textAnchor="middle"
                        className="text-[10px] fill-muted font-mono"
                      >
                        {conn.label[lang]}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Node blocks */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute px-4 py-2 rounded-lg border text-xs font-mono whitespace-nowrap ${nodeTypeStyles[node.type]}`}
                style={{
                  left: node.x,
                  top: node.y,
                }}
              >
                {node.label[lang]}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          {(
            [
              ["client", "Client"],
              ["server", "Server"],
              ["database", "Database"],
              ["service", "Service"],
              ["external", "External"],
            ] as const
          ).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded border ${nodeTypeStyles[type]}`}
              />
              <span className="text-[11px] text-muted font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
