export type PlanningHorizon = "now" | "next" | "later";

export type FounderStage =
  | "idea"
  | "pre-incorporation"
  | "incorporation"
  | "post-incorporation"
  | "investment-ready";

export type EmploymentCompatibility =
  | "friendly"
  | "conditional"
  | "transition-required";

export interface FounderProgramSource {
  label: string;
  url: string;
  checkedAt: string;
}

export interface FounderProgramDocument {
  id: string;
  title: string;
  description: string;
  recommendedWhen: PlanningHorizon;
}

export interface FounderProgramAction {
  id: string;
  title: string;
  description: string;
  horizon: PlanningHorizon;
}

export interface FounderProgram {
  slug: string;
  name: string;
  operator: string;
  order: number;
  stage: FounderStage;
  typicalWindow: string;
  employmentCompatibility: EmploymentCompatibility;
  employmentNote: string;
  summary: string;
  positioning: string;
  strategy: string[];
  documents: FounderProgramDocument[];
  actions: FounderProgramAction[];
  cautionSignals: string[];
  sources: FounderProgramSource[];
}

export interface FounderTimelineMilestone {
  id: string;
  label: string;
  period: string;
  focus: string;
}

export interface FounderDocumentTemplate {
  id: string;
  title: string;
  purpose: string;
  bullets: string[];
}

export interface FounderWorkspaceData {
  updatedAt: string;
  note: string;
  strategyRules: string[];
  timeline: FounderTimelineMilestone[];
  documentTemplates: FounderDocumentTemplate[];
  programs: FounderProgram[];
}
