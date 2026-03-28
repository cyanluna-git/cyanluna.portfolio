import type {
  EnterpriseStrategyWorkspaceData,
  StrategyStatusMeta,
} from "@/types/enterprise-strategy";

export const STRATEGY_STATUS_META: Record<string, StrategyStatusMeta> = {
  implemented: {
    label: "Implemented proof",
    tone: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
  },
  linked: {
    label: "Evidence-linked",
    tone: "border-sky-500/25 bg-sky-500/10 text-sky-200",
  },
  roadmap: {
    label: "Roadmap",
    tone: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  },
  validation: {
    label: "Validation target",
    tone: "border-rose-500/25 bg-rose-500/10 text-rose-200",
  },
};

export const enterpriseStrategyWorkspaceData: EnterpriseStrategyWorkspaceData = {
  updatedAt: "2026-03-28",
  title: "Enterprise Strategy Workspace",
  subtitle:
    "Manufacturing orchestration narrative built from existing portfolio proof, with explicit separation between shipped evidence and forward strategy.",
  note:
    "이 페이지는 공개 케이스 스터디가 아니라 private 전략 정리용 워크스페이스다. 현재 레포에서 증명 가능한 자산과, 다음 단계 가설을 명시적으로 분리해서 본다.",
  summaryCards: [
    {
      label: "Proof assets",
      value: "3",
      note: "QC, equipment data, resource planning",
    },
    {
      label: "Implemented layers",
      value: "Execution",
      note: "Each pillar exists as a standalone portfolio proof",
    },
    {
      label: "Route",
      value: "Private",
      note: "Internal-only strategy dashboard behind privacy gate",
    },
    {
      label: "Main risk",
      value: "Narrative gap",
      note: "Enterprise integration claims exceed current repo evidence",
    },
  ],
  narratives: [
    {
      eyebrow: "Why this exists",
      title: "The portfolio already has the seed, but not yet the full enterprise story.",
      body:
        "The core ingredients in `docs/myplan.md` are not imaginary. Quality execution, equipment telemetry, and engineering resource visibility already exist as separate industrial proofs in this repository. The missing piece is a clear strategy layer that frames them as one manufacturing orchestration direction instead of three adjacent projects.",
    },
    {
      eyebrow: "What must stay honest",
      title: "This is a strategy dashboard, not proof that the integrated platform is already shipped.",
      body:
        "SAP OData ingestion, Saga/Outbox reliability, award-driven internal expansion, and spin-off readiness are all plausible next moves, but they are not currently implemented in this repo. The dashboard should preserve that distinction so the story stays credible.",
    },
  ],
  evidenceItems: [
    {
      id: "qc",
      title: "Digital quality execution foundation",
      status: "implemented",
      summary:
        "Smart Factory QC already frames the quality execution pillar as a real shipped proof: BDD-driven test automation, live equipment communication, and result dashboards.",
      proof:
        "This is the strongest operational seed for the enterprise strategy because it captures execution data at the moment of inspection rather than only after the fact.",
      links: [
        { label: "Smart Factory QC", href: "/projects/smart-factory-qc" },
      ],
    },
    {
      id: "gateway",
      title: "Equipment telemetry and monitoring layer",
      status: "implemented",
      summary:
        "Equipment Gateway already shows how equipment definitions, protocol abstraction, and live monitoring can act as the data collection layer for a broader manufacturing platform.",
      proof:
        "This is usable as evidence for the 'insight dashboard' side of the strategy, but not yet proof of enterprise orchestration on its own.",
      links: [
        { label: "Equipment Gateway", href: "/projects/equipment-gateway" },
      ],
    },
    {
      id: "resource",
      title: "Engineering resource and planning visibility",
      status: "implemented",
      summary:
        "Engineering Resource Board already covers the resource-planning pillar with FTE forecasting, worklog classification, milestone tracking, and management views.",
      proof:
        "It supports the plan's staffing and bottleneck story, but remains a separate product proof rather than a runtime-integrated module.",
      links: [
        { label: "Engineering Resource Board", href: "/projects/resource-board" },
      ],
    },
    {
      id: "orchestration",
      title: "Manufacturing orchestration layer",
      status: "roadmap",
      summary:
        "The central orchestration layer described in `docs/myplan.md` is directionally coherent, but it is not implemented as a shared runtime inside this repository.",
      proof:
        "Treat this as the target operating model that stitches the three existing proofs together, not as current proof that the integration already exists.",
      links: [
        { label: "Source plan", href: "/privacy/enterprise_strategy#architecture" },
      ],
    },
    {
      id: "enterprise-integrations",
      title: "SAP + distributed reliability claims",
      status: "validation",
      summary:
        "SAP OData, Saga orchestration, Outbox delivery guarantees, and enterprise rollout mechanics are currently thesis-level items that need future validation work.",
      proof:
        "They should stay visible because they clarify the ambition, but they must remain marked as validation targets until code or concrete operational assets exist.",
      links: [],
    },
  ],
  architectureLayers: [
    {
      id: "proof",
      name: "Current proof layer",
      status: "implemented",
      description:
        "Three separate industrial products prove domain knowledge across inspection, telemetry, and resource visibility.",
      notes: [
        "Quality execution already exists as Smart Factory QC.",
        "Equipment monitoring already exists as Equipment Gateway.",
        "Resource planning already exists as Engineering Resource Board.",
      ],
    },
    {
      id: "control",
      name: "Target orchestration layer",
      status: "roadmap",
      description:
        "A future control plane would connect quality events, equipment state, and staffing decisions into one operating loop.",
      notes: [
        "Position as target architecture, not current runtime.",
        "Use clear language for event flow, ownership, and state transitions.",
        "Avoid implying that module-to-module automation is already shipped.",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise integration layer",
      status: "validation",
      description:
        "SAP ingestion, reliability patterns, and internal expansion mechanics remain future validation items.",
      notes: [
        "SAP OData is not implemented in this repo.",
        "Saga / Outbox / event-bus reliability is not implemented in this repo.",
        "Global rollout and award leverage are strategic motions, not code proof.",
      ],
    },
  ],
  roadmap: [
    {
      id: "seed",
      phase: "Phase 1",
      window: "Now",
      objective: "Tighten the narrative boundary between what is built and what is proposed.",
      moves: [
        "Show the three existing proofs as one strategic stack.",
        "Label unsupported enterprise claims as roadmap or validation targets.",
        "Turn the long plan into a browsable internal dashboard.",
      ],
    },
    {
      id: "bridge",
      phase: "Phase 2",
      window: "Next proof cycle",
      objective: "Add one integration proof that makes the orchestration story more concrete.",
      moves: [
        "Define a shared event contract across the industrial projects.",
        "Prototype one cross-surface workflow, for example quality issue to staffing action.",
        "Document the operational data flow with explicit ownership and failure states.",
      ],
    },
    {
      id: "validate",
      phase: "Phase 3",
      window: "Later",
      objective: "Validate the enterprise claims before presenting them as execution proof.",
      moves: [
        "Test SAP-facing ingestion assumptions with a bounded interface or mock contract.",
        "Prove one reliability pattern such as retry-safe event persistence.",
        "Collect evidence that supports the land-and-expand story beyond architecture prose.",
      ],
    },
  ],
  pathOptions: [
    {
      id: "internal",
      name: "Internal enterprise DX operator",
      status: "linked",
      thesis:
        "Best fit if the goal is to turn these proofs into an internal operating platform and gain leverage through manufacturing execution credibility.",
      pros: [
        "Most directly supported by the current portfolio assets.",
        "Lets the strategy evolve from private proof to organization-scale execution.",
        "Reduces the risk of overclaiming a SaaS story before enterprise validation exists.",
      ],
      risks: [
        "Requires political sponsorship and non-code validation.",
        "The story can stall if no integration proof is added beyond separate product showcases.",
      ],
    },
    {
      id: "spinout",
      name: "Future SaaS spin-out thesis",
      status: "roadmap",
      thesis:
        "Viable as a long-range option only after the orchestration layer and enterprise integration assumptions are proven beyond narrative form.",
      pros: [
        "Creates an explicit commercialization branch without hiding current uncertainty.",
        "Keeps the strategic upside visible.",
      ],
      risks: [
        "Current repo does not yet justify a true multi-tenant enterprise platform claim.",
        "Go-to-market and anchor-customer proof remain absent here.",
      ],
    },
  ],
  validationChecklist: [
    "The dashboard does not imply SAP, Saga, or Outbox are already implemented.",
    "Every 'implemented proof' block links to a real project page in this portfolio.",
    "The orchestration story reads as one connected strategy rather than three disconnected cards.",
    "The page is useful in-browser without requiring PDF export or public publishing.",
  ],
};
