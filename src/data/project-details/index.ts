import type { ProjectDetail } from "@/types/project-detail";
import { moru } from "./moru";
import { smartFactoryQc } from "./smart-factory-qc";
import { equipmentGateway } from "./equipment-gateway";
import { resourceBoard } from "./resource-board";
import { aiCyclingCoach } from "./ai-cycling-coach";
import { cpetPlatform } from "./cpet-platform";
import { rideAnalytics } from "./ride-analytics";
import { todayBike } from "./today-bike";
import { personalFinance } from "./personal-finance";
import { kanbanPipeline } from "./kanban-pipeline";
import { codeReviewSuite } from "./code-review-suite";
import { assistHub } from "./assist-hub";
import { assist11th } from "./assist-11th";
import { javis } from "./javis";

export const projectDetails: Record<string, ProjectDetail> = {
  "moru": moru,
  "smart-factory-qc": smartFactoryQc,
  "equipment-gateway": equipmentGateway,
  "resource-board": resourceBoard,
  "ai-cycling-coach": aiCyclingCoach,
  "cpet-platform": cpetPlatform,
  "ride-analytics": rideAnalytics,
  "today-bike": todayBike,
  "personal-finance": personalFinance,
  "kanban-pipeline": kanbanPipeline,
  "code-review-suite": codeReviewSuite,
  "assist-hub": assistHub,
  "assist-11th": assist11th,
  "javis": javis,
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectDetails);
}
