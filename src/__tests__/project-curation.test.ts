import { describe, expect, it } from "vitest";
import { curationTracks, featuredProjects, projects } from "@/data/projects";

describe("project curation model", () => {
  it("gives every project a curation object with bilingual text", () => {
    for (const project of projects) {
      expect(project.curation.track).toBeTruthy();
      expect(project.curation.audience.length).toBeGreaterThan(0);
      expect(project.curation.quickPitch.en.trim().length).toBeGreaterThan(0);
      expect(project.curation.quickPitch.ko.trim().length).toBeGreaterThan(0);
      expect(project.curation.whyStartHere.en.trim().length).toBeGreaterThan(0);
      expect(project.curation.whyStartHere.ko.trim().length).toBeGreaterThan(0);
    }
  });

  it("defines all strategic tracks with labels and descriptions", () => {
    for (const track of Object.values(curationTracks)) {
      expect(track.label.en.trim().length).toBeGreaterThan(0);
      expect(track.label.ko.trim().length).toBeGreaterThan(0);
      expect(track.description.en.trim().length).toBeGreaterThan(0);
      expect(track.description.ko.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps featured projects sorted by featuredRank", () => {
    expect(featuredProjects.length).toBeGreaterThanOrEqual(3);

    for (let i = 1; i < featuredProjects.length; i += 1) {
      const previous = featuredProjects[i - 1].curation.featuredRank ?? Number.MAX_SAFE_INTEGER;
      const current = featuredProjects[i].curation.featuredRank ?? Number.MAX_SAFE_INTEGER;
      expect(previous).toBeLessThanOrEqual(current);
    }
  });

  it("uses unique featured ranks", () => {
    const ranks = featuredProjects.map((project) => project.curation.featuredRank);
    expect(new Set(ranks).size).toBe(ranks.length);
  });
});
