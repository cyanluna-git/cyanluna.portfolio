export type BiText = { en: string; ko: string };

export interface PainPoint {
  icon: string;
  title: BiText;
  description: BiText;
}

export interface BeforeAfter {
  before: BiText;
  after: BiText;
}

export interface Feature {
  title: BiText;
  description: BiText;
  image?: string;
}

export interface ArchNode {
  id: string;
  label: BiText;
  type: "client" | "server" | "database" | "external" | "service";
  x: number;
  y: number;
}

export interface ArchConnection {
  from: string;
  to: string;
  label?: BiText;
}

export interface Metric {
  value: string;
  label: BiText;
  description?: BiText;
}

export interface IntroPillar {
  label: BiText;
  title: BiText;
  description: BiText;
  stat?: BiText;
}

export interface IntroLayerItem {
  title: BiText;
  description: BiText;
  meta?: BiText;
}

export interface IntroLayer {
  label: BiText;
  description?: BiText;
  items: IntroLayerItem[];
}

export interface IntroRoadmapPhase {
  label: BiText;
  title: BiText;
  description: BiText;
  status: "active" | "planned" | "future";
}

export interface ProjectIntroduction {
  badge?: BiText;
  title: BiText;
  subtitle: BiText;
  pillars: IntroPillar[];
  layers: IntroLayer[];
  capabilities: Feature[];
  screenshots?: Feature[];
  roadmap: IntroRoadmapPhase[];
}

export interface ProjectDetail {
  slug: string;
  vertical: "industrial" | "cycling" | "cloudops" | "aiagents";
  verticalColor: string;
  status: "live" | "active" | "beta";
  title: BiText;
  tagline: BiText;
  heroImage?: string;
  liveUrl?: string;

  painPoints: PainPoint[];
  beforeAfter: BeforeAfter[];

  approach: {
    title: BiText;
    description: BiText;
  };

  introduction?: ProjectIntroduction;
  features: Feature[];

  architecture: {
    nodes: ArchNode[];
    connections: ArchConnection[];
  };

  metrics: Metric[];

  prevProject?: { slug: string; title: BiText };
  nextProject?: { slug: string; title: BiText };
}
