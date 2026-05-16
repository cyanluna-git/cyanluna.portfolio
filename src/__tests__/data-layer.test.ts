/**
 * Shield · Data Layer Tests
 * Task #878 — Dynamic routes + shared layout components
 *
 * Covers:
 *   - getProjectDetail(): known slug, unknown slug, case-sensitive slug
 *   - getAllProjectSlugs(): shape, contents, mutability
 *   - projectDetails registry: structure invariants
 */

import { describe, it, expect } from "vitest";
import {
  getProjectDetail,
  getAllProjectSlugs,
  projectDetails,
} from "@/data/project-details";

// ---------------------------------------------------------------------------
// getProjectDetail
// ---------------------------------------------------------------------------
describe("getProjectDetail()", () => {
  it("returns the correct project for a known slug", () => {
    const p = getProjectDetail("smart-factory-qc");
    expect(p).toBeDefined();
    expect(p!.slug).toBe("smart-factory-qc");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectDetail("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for an empty string slug", () => {
    expect(getProjectDetail("")).toBeUndefined();
  });

  it("is case-sensitive — uppercase slug is not found", () => {
    // slug keys are lowercase-kebab; uppercase should miss
    expect(getProjectDetail("Smart-Factory-QC")).toBeUndefined();
  });

  it("returns undefined for a slug that is a substring of a real slug", () => {
    expect(getProjectDetail("smart-factory")).toBeUndefined();
  });

  it("returns undefined for a slug with trailing slash", () => {
    expect(getProjectDetail("smart-factory-qc/")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getAllProjectSlugs
// ---------------------------------------------------------------------------
describe("getAllProjectSlugs()", () => {
  it("returns an array", () => {
    expect(Array.isArray(getAllProjectSlugs())).toBe(true);
  });

  it("includes 'smart-factory-qc'", () => {
    expect(getAllProjectSlugs()).toContain("smart-factory-qc");
  });

  it("returns at least one slug", () => {
    expect(getAllProjectSlugs().length).toBeGreaterThan(0);
  });

  it("each slug corresponds to an entry in projectDetails", () => {
    const slugs = getAllProjectSlugs();
    for (const slug of slugs) {
      expect(projectDetails[slug]).toBeDefined();
    }
  });

  it("returns a fresh array each call (mutations do not affect registry)", () => {
    const a = getAllProjectSlugs();
    const b = getAllProjectSlugs();
    // Same content
    expect(a).toEqual(b);
    // Mutating result of first call should not affect second call
    a.push("injected-slug");
    expect(getAllProjectSlugs()).not.toContain("injected-slug");
  });
});

// ---------------------------------------------------------------------------
// projectDetails registry — structural invariants
// ---------------------------------------------------------------------------
describe("projectDetails registry", () => {
  it("every record key matches the slug field of its value", () => {
    for (const [key, project] of Object.entries(projectDetails)) {
      expect(project.slug).toBe(key);
    }
  });

  it("every project has non-empty title.en and title.ko", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.title.en.trim().length).toBeGreaterThan(0);
      expect(project.title.ko.trim().length).toBeGreaterThan(0);
    }
  });

  it("every project has a valid vertical value", () => {
    const validVerticals = ["industrial", "health", "consumer", "devtools", "cycling", "cloudops", "aiagents"];
    for (const project of Object.values(projectDetails)) {
      expect(validVerticals).toContain(project.vertical);
    }
  });

  it("every project has a valid status value", () => {
    const validStatuses = ["live", "active", "beta"];
    for (const project of Object.values(projectDetails)) {
      expect(validStatuses).toContain(project.status);
    }
  });

  it("every project has at least one pain point", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.painPoints.length).toBeGreaterThan(0);
    }
  });

  it("every pain point has icon, title, and description BiText fields", () => {
    for (const project of Object.values(projectDetails)) {
      for (const pp of project.painPoints) {
        expect(typeof pp.icon).toBe("string");
        expect(pp.title.en.trim().length).toBeGreaterThan(0);
        expect(pp.title.ko.trim().length).toBeGreaterThan(0);
        expect(pp.description.en.trim().length).toBeGreaterThan(0);
        expect(pp.description.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("every project has at least one before/after entry", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.beforeAfter.length).toBeGreaterThan(0);
    }
  });

  it("every before/after entry has non-empty before and after BiText", () => {
    for (const project of Object.values(projectDetails)) {
      for (const ba of project.beforeAfter) {
        expect(ba.before.en.trim().length).toBeGreaterThan(0);
        expect(ba.before.ko.trim().length).toBeGreaterThan(0);
        expect(ba.after.en.trim().length).toBeGreaterThan(0);
        expect(ba.after.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("every project has at least one feature", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.features.length).toBeGreaterThan(0);
    }
  });

  it("every feature has title and description BiText", () => {
    for (const project of Object.values(projectDetails)) {
      for (const f of project.features) {
        expect(f.title.en.trim().length).toBeGreaterThan(0);
        expect(f.title.ko.trim().length).toBeGreaterThan(0);
        expect(f.description.en.trim().length).toBeGreaterThan(0);
        expect(f.description.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("every project has at least one architecture node", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.architecture.nodes.length).toBeGreaterThan(0);
    }
  });

  it("every architecture node has required fields and valid type", () => {
    const validNodeTypes = ["client", "server", "database", "external", "service"];
    for (const project of Object.values(projectDetails)) {
      for (const node of project.architecture.nodes) {
        expect(typeof node.id).toBe("string");
        expect(node.id.trim().length).toBeGreaterThan(0);
        expect(validNodeTypes).toContain(node.type);
        expect(typeof node.x).toBe("number");
        expect(typeof node.y).toBe("number");
        expect(node.label.en.trim().length).toBeGreaterThan(0);
        expect(node.label.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("every architecture connection references valid node ids", () => {
    for (const project of Object.values(projectDetails)) {
      const nodeIds = new Set(project.architecture.nodes.map((n) => n.id));
      for (const conn of project.architecture.connections) {
        expect(nodeIds.has(conn.from)).toBe(true);
        expect(nodeIds.has(conn.to)).toBe(true);
      }
    }
  });

  it("architecture node ids are unique within a project", () => {
    for (const project of Object.values(projectDetails)) {
      const ids = project.architecture.nodes.map((n) => n.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    }
  });

  it("every project has at least one metric", () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.metrics.length).toBeGreaterThan(0);
    }
  });

  it("every metric has a value string and label BiText", () => {
    for (const project of Object.values(projectDetails)) {
      for (const m of project.metrics) {
        expect(typeof m.value).toBe("string");
        expect(m.value.trim().length).toBeGreaterThan(0);
        expect(m.label.en.trim().length).toBeGreaterThan(0);
        expect(m.label.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("optional prevProject/nextProject, if present, have slug and title BiText", () => {
    for (const project of Object.values(projectDetails)) {
      if (project.prevProject) {
        expect(typeof project.prevProject.slug).toBe("string");
        expect(project.prevProject.title.en.trim().length).toBeGreaterThan(0);
        expect(project.prevProject.title.ko.trim().length).toBeGreaterThan(0);
      }
      if (project.nextProject) {
        expect(typeof project.nextProject.slug).toBe("string");
        expect(project.nextProject.title.en.trim().length).toBeGreaterThan(0);
        expect(project.nextProject.title.ko.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
