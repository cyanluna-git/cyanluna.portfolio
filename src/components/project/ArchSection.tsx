import type { ArchNode, ArchConnection } from "@/types/project-detail";

type Lang = "en" | "ko";

const sectionT = {
  title: { en: "Architecture", ko: "아키텍처" },
  subtitle: {
    en: "Show relationships clearly, row by row.",
    ko: "관계를 한 줄씩, 바로 읽히게 보여줍니다.",
  },
  relationships: { en: "System Relationships", ko: "시스템 관계" },
  source: { en: "Source", ko: "출발점" },
  targets: { en: "Targets", ko: "연결 대상" },
  isolated: { en: "Standalone Nodes", ko: "독립 노드" },
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

function NodeCard({
  node,
  lang,
  compact = false,
}: {
  node: ArchNode;
  lang: Lang;
  compact?: boolean;
}) {
  const meta = nodeTypeMeta[node.type];

  return (
    <article
      className={`relative grid rounded-[1.45rem] border ${
        compact ? "gap-2 px-5 py-4" : "gap-3 px-6 py-5"
      }`}
      style={{
        borderColor: meta.border,
        background: meta.background,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 36px rgba(0,0,0,0.14)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[0.76rem] font-mono uppercase tracking-[0.22em] text-white/42">
          {legendT[node.type][lang]}
        </span>
        <span
          className="inline-grid min-w-16 place-items-center rounded-full border px-3 py-1 text-[0.74rem] font-bold tracking-[0.08em] text-white/82"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(8,12,17,0.36)",
            fontFamily: '"JetBrains Mono", "IBM Plex Sans KR", monospace',
          }}
        >
          {meta.chip}
        </span>
      </div>
      <strong
        className={`font-mono leading-tight ${
          compact ? "text-[1.18rem] sm:text-[1.28rem]" : "text-[1.36rem] sm:text-[1.55rem]"
        }`}
        style={{ color: meta.text }}
      >
        {node.label[lang]}
      </strong>
    </article>
  );
}

export default function ArchSection({
  architecture,
  verticalColor,
  lang,
}: ArchSectionProps) {
  const { nodes, connections } = architecture;
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const outgoing = new Map<string, ArchConnection[]>();
  const incomingCount = new Map<string, number>();

  for (const node of nodes) {
    outgoing.set(node.id, []);
    incomingCount.set(node.id, 0);
  }

  for (const connection of connections) {
    outgoing.get(connection.from)?.push(connection);
    incomingCount.set(
      connection.to,
      (incomingCount.get(connection.to) ?? 0) + 1,
    );
  }

  const relationshipRows = nodes
    .filter((node) => (outgoing.get(node.id)?.length ?? 0) > 0)
    .sort((a, b) => {
      const aPos = outgoing.get(a.id)?.length ?? 0;
      const bPos = outgoing.get(b.id)?.length ?? 0;
      return bPos - aPos;
    });

  const isolatedNodes = nodes.filter(
    (node) =>
      (incomingCount.get(node.id) ?? 0) === 0 &&
      (outgoing.get(node.id)?.length ?? 0) === 0,
  );

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

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(17,24,39,0.98))] p-4 shadow-[0_30px_90px_rgba(2,6,23,0.45)] sm:p-6">
          <div
            className="rounded-[1.7rem] border border-white/8 p-5 sm:p-7"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              backgroundPosition: "-1px -1px",
              backgroundColor: "rgba(15,23,42,0.52)",
              boxShadow: `inset 0 1px 0 ${verticalColor}30`,
            }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.76rem] font-mono uppercase tracking-[0.26em] text-white/48">
                  {sectionT.relationships[lang]}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {relationshipRows.map((sourceNode) => {
                const rowConnections = outgoing.get(sourceNode.id) ?? [];

                return (
                  <div
                    key={sourceNode.id}
                    className="grid gap-4 rounded-[1.55rem] border border-white/8 bg-white/[0.02] p-4 sm:grid-cols-[minmax(260px,300px)_1fr]"
                  >
                    <div>
                      <p className="mb-3 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-white/42">
                        {sectionT.source[lang]}
                      </p>
                      <NodeCard node={sourceNode} lang={lang} />
                    </div>

                    <div>
                      <p className="mb-3 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-white/42">
                        {sectionT.targets[lang]}
                      </p>
                      <div className="space-y-3">
                        {rowConnections.map((connection, index) => {
                          const targetNode = nodeMap.get(connection.to);
                          if (!targetNode) return null;

                          return (
                            <div
                              key={`${connection.from}-${connection.to}-${index}`}
                              className="grid gap-3 md:grid-cols-[84px_1fr]"
                            >
                              <div className="flex items-center justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="inline-grid h-14 w-14 place-items-center rounded-full border text-[1.55rem] font-semibold"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, rgba(209,138,88,0.14), rgba(94,142,160,0.1)), rgba(255,255,255,0.03)",
                                      borderColor: "rgba(209,138,88,0.22)",
                                      color: "rgba(226,191,157,0.96)",
                                      boxShadow:
                                        "inset 0 1px 0 rgba(255,255,255,0.04)",
                                      fontFamily:
                                        '"JetBrains Mono", "IBM Plex Sans KR", monospace',
                                    }}
                                  >
                                    →
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {connection.label ? (
                                  <div
                                    className="inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-mono uppercase tracking-[0.16em] text-white/72"
                                    style={{
                                      borderColor: "rgba(255,255,255,0.1)",
                                      background: "rgba(17,24,39,0.92)",
                                    }}
                                  >
                                    {connection.label[lang]}
                                  </div>
                                ) : null}
                                <NodeCard node={targetNode} lang={lang} compact />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {isolatedNodes.length > 0 ? (
              <div className="mt-6 rounded-[1.55rem] border border-white/8 bg-white/[0.02] p-4">
                <p className="mb-4 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-white/42">
                  {sectionT.isolated[lang]}
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {isolatedNodes.map((node) => (
                    <NodeCard key={node.id} node={node} lang={lang} compact />
                  ))}
                </div>
              </div>
            ) : null}
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
