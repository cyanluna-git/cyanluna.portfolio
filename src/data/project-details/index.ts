import type { ProjectDetail } from "@/types/project-detail";
import { smartFactoryQc } from "./smart-factory-qc";
import { equipmentGateway } from "./equipment-gateway";
import { resourceBoard } from "./resource-board";
import { aiCyclingCoach } from "./ai-cycling-coach";
import { cpetPlatform } from "./cpet-platform";
import { rideAnalytics } from "./ride-analytics";
import { todayBike } from "./today-bike";
import { personalFinance } from "./personal-finance";

export const projectDetails: Record<string, ProjectDetail> = {
  "smart-factory-qc": smartFactoryQc,
  "equipment-gateway": equipmentGateway,
  "resource-board": resourceBoard,
  "ai-cycling-coach": aiCyclingCoach,
  "cpet-platform": cpetPlatform,
  "ride-analytics": rideAnalytics,
  "today-bike": todayBike,
  "personal-finance": personalFinance,
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectDetails);
}
