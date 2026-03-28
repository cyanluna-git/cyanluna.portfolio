export type StrategyStatus = "implemented" | "linked" | "roadmap" | "validation";

export interface StrategyStatusMeta {
  label: string;
  tone: string;
}

export interface StrategyLink {
  label: string;
  href: string;
}

export interface StrategySummaryCard {
  label: string;
  value: string;
  note: string;
}

export interface StrategyNarrative {
  eyebrow: string;
  title: string;
  body: string;
}

export interface StrategyEvidenceItem {
  id: string;
  title: string;
  status: StrategyStatus;
  summary: string;
  proof: string;
  links: StrategyLink[];
}

export interface StrategyArchitectureLayer {
  id: string;
  name: string;
  status: StrategyStatus;
  description: string;
  notes: string[];
}

export interface StrategyRoadmapPhase {
  id: string;
  phase: string;
  window: string;
  objective: string;
  moves: string[];
}

export interface StrategyPathOption {
  id: string;
  name: string;
  status: StrategyStatus;
  thesis: string;
  pros: string[];
  risks: string[];
}

export interface EnterpriseStrategyWorkspaceData {
  updatedAt: string;
  title: string;
  subtitle: string;
  note: string;
  summaryCards: StrategySummaryCard[];
  narratives: StrategyNarrative[];
  evidenceItems: StrategyEvidenceItem[];
  architectureLayers: StrategyArchitectureLayer[];
  roadmap: StrategyRoadmapPhase[];
  pathOptions: StrategyPathOption[];
  validationChecklist: string[];
}
