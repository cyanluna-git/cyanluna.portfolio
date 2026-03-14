import type { ProjectDetail } from "@/types/project-detail";
import { smartFactoryQc } from "./smart-factory-qc";
import { resourceBoard } from "./resource-board";

export const projectDetails: Record<string, ProjectDetail> = {
  "smart-factory-qc": smartFactoryQc,
  "resource-board": resourceBoard,
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectDetails);
}
