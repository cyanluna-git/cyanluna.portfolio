/**
 * Shield · Sample Data Integrity Tests (smart-factory-qc)
 * Task #878 — Dynamic routes + shared layout components
 *
 * Validates that the concrete sample data fulfils the ProjectDetail contract
 * in detail, beyond what the type-checker alone can verify at runtime.
 */

import { describe, it, expect } from "vitest";
import { smartFactoryQc } from "@/data/project-details/smart-factory-qc";

describe("smartFactoryQc sample data", () => {
  it("slug is 'smart-factory-qc'", () => {
    expect(smartFactoryQc.slug).toBe("smart-factory-qc");
  });

  it("vertical is 'industrial'", () => {
    expect(smartFactoryQc.vertical).toBe("industrial");
  });

  it("verticalColor is a non-empty string", () => {
    expect(typeof smartFactoryQc.verticalColor).toBe("string");
    expect(smartFactoryQc.verticalColor.trim().length).toBeGreaterThan(0);
  });

  it("status is 'active'", () => {
    expect(smartFactoryQc.status).toBe("active");
  });

  it("title has both en and ko", () => {
    expect(smartFactoryQc.title.en).toBe("Smart Factory QC Platform");
    expect(smartFactoryQc.title.ko).toBe("스마트 팩토리 QC 플랫폼");
  });

  it("tagline has both en and ko", () => {
    expect(smartFactoryQc.tagline.en.trim().length).toBeGreaterThan(0);
    expect(smartFactoryQc.tagline.ko.trim().length).toBeGreaterThan(0);
  });

  it("heroImage is a non-empty string path", () => {
    expect(typeof smartFactoryQc.heroImage).toBe("string");
    expect(smartFactoryQc.heroImage!.startsWith("/")).toBe(true);
  });

  // Pain points
  it("has exactly 3 pain points", () => {
    expect(smartFactoryQc.painPoints).toHaveLength(3);
  });

  it("all pain point icons are non-empty strings", () => {
    for (const pp of smartFactoryQc.painPoints) {
      expect(pp.icon.trim().length).toBeGreaterThan(0);
    }
  });

  // Before / After
  it("has exactly 2 before/after entries", () => {
    expect(smartFactoryQc.beforeAfter).toHaveLength(2);
  });

  // Approach
  it("approach has title and description BiText", () => {
    expect(smartFactoryQc.approach.title.en.trim().length).toBeGreaterThan(0);
    expect(smartFactoryQc.approach.title.ko.trim().length).toBeGreaterThan(0);
    expect(smartFactoryQc.approach.description.en.trim().length).toBeGreaterThan(0);
    expect(smartFactoryQc.approach.description.ko.trim().length).toBeGreaterThan(0);
  });

  // Features
  it("has exactly 4 features", () => {
    expect(smartFactoryQc.features).toHaveLength(4);
  });

  it("all features have image paths starting with '/'", () => {
    for (const f of smartFactoryQc.features) {
      expect(typeof f.image).toBe("string");
      expect(f.image!.startsWith("/")).toBe(true);
    }
  });

  // Architecture
  it("has 7 architecture nodes", () => {
    expect(smartFactoryQc.architecture.nodes).toHaveLength(7);
  });

  it("has 6 architecture connections", () => {
    expect(smartFactoryQc.architecture.connections).toHaveLength(6);
  });

  it("all connection from/to ids exist in nodes", () => {
    const nodeIds = new Set(smartFactoryQc.architecture.nodes.map((n) => n.id));
    for (const conn of smartFactoryQc.architecture.connections) {
      expect(nodeIds.has(conn.from)).toBe(true);
      expect(nodeIds.has(conn.to)).toBe(true);
    }
  });

  it("all connections have label BiText", () => {
    for (const conn of smartFactoryQc.architecture.connections) {
      expect(conn.label).toBeDefined();
      expect(conn.label!.en.trim().length).toBeGreaterThan(0);
      expect(conn.label!.ko.trim().length).toBeGreaterThan(0);
    }
  });

  // Metrics
  it("has exactly 4 metrics", () => {
    expect(smartFactoryQc.metrics).toHaveLength(4);
  });

  it("all metrics have description BiText", () => {
    for (const m of smartFactoryQc.metrics) {
      expect(m.description).toBeDefined();
      expect(m.description!.en.trim().length).toBeGreaterThan(0);
      expect(m.description!.ko.trim().length).toBeGreaterThan(0);
    }
  });

  // Navigation links
  it("prevProject is undefined (first project)", () => {
    expect(smartFactoryQc.prevProject).toBeUndefined();
  });

  it("nextProject slug is 'equipment-gateway'", () => {
    expect(smartFactoryQc.nextProject).toBeDefined();
    expect(smartFactoryQc.nextProject!.slug).toBe("equipment-gateway");
  });

  it("nextProject has title BiText", () => {
    expect(smartFactoryQc.nextProject!.title.en.trim().length).toBeGreaterThan(0);
    expect(smartFactoryQc.nextProject!.title.ko.trim().length).toBeGreaterThan(0);
  });
});
