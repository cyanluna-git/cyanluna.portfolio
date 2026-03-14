/**
 * Shield · OQC Scripts Tests
 * Task #881 — OQC 더미 데이터 시딩 스크립트
 *
 * Validates script file contents via filesystem reads:
 *   - schema.sql: table definitions, constraints, indexes
 *   - docker-compose.yml: service config, ports, healthcheck
 *   - seed.py: imports, data counts, function signatures
 *   - requirements.txt: python dependency declaration
 *   - README.md: file existence
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const SCRIPTS_DIR = join(process.cwd(), "scripts", "oqc");

let schemaSql: string;
let dockerCompose: string;
let seedPy: string;

beforeAll(() => {
  schemaSql = readFileSync(join(SCRIPTS_DIR, "schema.sql"), "utf-8");
  dockerCompose = readFileSync(join(SCRIPTS_DIR, "docker-compose.yml"), "utf-8");
  seedPy = readFileSync(join(SCRIPTS_DIR, "seed.py"), "utf-8");
});

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------
describe("OQC script files exist", () => {
  it("docker-compose.yml exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "docker-compose.yml"))).toBe(true);
  });

  it("schema.sql exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "schema.sql"))).toBe(true);
  });

  it("seed.py exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "seed.py"))).toBe(true);
  });

  it("requirements.txt exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "requirements.txt"))).toBe(true);
  });

  it("README.md exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "README.md"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// schema.sql — DROP/CREATE idempotency
// ---------------------------------------------------------------------------
describe("schema.sql — DROP/CREATE idempotency", () => {
  const expectedTables = [
    "users",
    "equipment",
    "defect_categories",
    "bdd_scenarios",
    "test_results",
  ];

  it("drops all tables with CASCADE before recreating", () => {
    for (const table of expectedTables) {
      expect(schemaSql).toContain(`DROP TABLE IF EXISTS ${table} CASCADE`);
    }
  });

  it("creates all 5 expected tables", () => {
    for (const table of expectedTables) {
      expect(schemaSql).toContain(`CREATE TABLE ${table}`);
    }
  });
});

// ---------------------------------------------------------------------------
// schema.sql — table structure
// ---------------------------------------------------------------------------
describe("schema.sql — table structure", () => {
  it("users table has required columns", () => {
    expect(schemaSql).toContain("CREATE TABLE users");
    expect(schemaSql).toContain("id SERIAL PRIMARY KEY");
    expect(schemaSql).toContain("employee_id VARCHAR");
    expect(schemaSql).toContain("email VARCHAR");
    expect(schemaSql).toContain("role VARCHAR");
    expect(schemaSql).toContain("department VARCHAR");
    expect(schemaSql).toContain("is_active BOOLEAN NOT NULL DEFAULT TRUE");
    expect(schemaSql).toContain("created_at TIMESTAMPTZ");
  });

  it("equipment table has required columns", () => {
    expect(schemaSql).toContain("CREATE TABLE equipment");
    expect(schemaSql).toContain("code VARCHAR");
    expect(schemaSql).toContain("equipment_type VARCHAR");
    expect(schemaSql).toContain("location VARCHAR");
    expect(schemaSql).toContain("status VARCHAR");
    expect(schemaSql).toContain("commissioned_date DATE NOT NULL");
  });

  it("defect_categories table has severity CHECK constraint", () => {
    expect(schemaSql).toContain("CREATE TABLE defect_categories");
    expect(schemaSql).toContain("severity VARCHAR");
    expect(schemaSql).toContain("CHECK (severity IN ('critical', 'major', 'minor', 'cosmetic'))");
    expect(schemaSql).toContain("description TEXT");
  });

  it("bdd_scenarios table references equipment with CASCADE", () => {
    expect(schemaSql).toContain("CREATE TABLE bdd_scenarios");
    expect(schemaSql).toContain(
      "equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE"
    );
    expect(schemaSql).toContain("given_clause TEXT NOT NULL");
    expect(schemaSql).toContain("when_clause TEXT NOT NULL");
    expect(schemaSql).toContain("then_clause TEXT NOT NULL");
    expect(schemaSql).toContain("priority VARCHAR");
    expect(schemaSql).toContain(
      "CHECK (priority IN ('critical', 'high', 'medium', 'low'))"
    );
  });

  it("test_results table references scenarios, equipment, users, and defect_categories", () => {
    expect(schemaSql).toContain("CREATE TABLE test_results");
    expect(schemaSql).toContain(
      "scenario_id INTEGER NOT NULL REFERENCES bdd_scenarios(id) ON DELETE CASCADE"
    );
    expect(schemaSql).toContain(
      "equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE"
    );
    expect(schemaSql).toContain(
      "executed_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE"
    );
    expect(schemaSql).toContain(
      "defect_category_id INTEGER REFERENCES defect_categories(id) ON DELETE SET NULL"
    );
  });

  it("test_results table has status and duration CHECK constraints", () => {
    expect(schemaSql).toContain(
      "CHECK (status IN ('pass', 'fail', 'blocked', 'skipped'))"
    );
    expect(schemaSql).toContain("duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0)");
  });
});

// ---------------------------------------------------------------------------
// schema.sql — indexes
// ---------------------------------------------------------------------------
describe("schema.sql — indexes", () => {
  it("bdd_scenarios has indexes on equipment_id and priority", () => {
    expect(schemaSql).toContain("CREATE INDEX idx_bdd_scenarios_equipment ON bdd_scenarios(equipment_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_bdd_scenarios_priority ON bdd_scenarios(priority)");
  });

  it("test_results has indexes on scenario_id, equipment_id, executed_by, status, execution_date, and defect_category_id", () => {
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_scenario ON test_results(scenario_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_equipment ON test_results(equipment_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_executed_by ON test_results(executed_by)");
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_status ON test_results(status)");
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_date ON test_results(execution_date)");
    expect(schemaSql).toContain("CREATE INDEX idx_test_results_defect ON test_results(defect_category_id)");
  });
});

// ---------------------------------------------------------------------------
// docker-compose.yml — service configuration
// ---------------------------------------------------------------------------
describe("docker-compose.yml — service definition", () => {
  it("uses postgres:16-alpine image", () => {
    expect(dockerCompose).toContain("image: postgres:16-alpine");
  });

  it("container name is oqc-demo-db", () => {
    expect(dockerCompose).toContain("container_name: oqc-demo-db");
  });

  it("database name is oqc_demo", () => {
    expect(dockerCompose).toContain("POSTGRES_DB: oqc_demo");
  });

  it("database user is oqc", () => {
    expect(dockerCompose).toContain("POSTGRES_USER: oqc");
  });

  it("database password is oqc_demo_pass", () => {
    expect(dockerCompose).toContain("POSTGRES_PASSWORD: oqc_demo_pass");
  });

  it("maps host port 5434 to container port 5432", () => {
    expect(dockerCompose).toContain("5434:5432");
  });

  it("mounts schema.sql as init script", () => {
    expect(dockerCompose).toContain("./schema.sql:/docker-entrypoint-initdb.d/01_schema.sql");
  });

  it("declares a named volume oqc_demo_data", () => {
    expect(dockerCompose).toContain("oqc_demo_data:");
  });
});

describe("docker-compose.yml — healthcheck", () => {
  it("healthcheck uses pg_isready", () => {
    expect(dockerCompose).toContain("pg_isready");
  });

  it("healthcheck targets the oqc user and oqc_demo database", () => {
    expect(dockerCompose).toContain("-U oqc");
    expect(dockerCompose).toContain("-d oqc_demo");
  });

  it("healthcheck has interval, timeout, and retries", () => {
    expect(dockerCompose).toContain("interval:");
    expect(dockerCompose).toContain("timeout:");
    expect(dockerCompose).toContain("retries:");
  });
});

// ---------------------------------------------------------------------------
// seed.py — imports and module structure
// ---------------------------------------------------------------------------
describe("seed.py — required imports", () => {
  it("imports argparse", () => {
    expect(seedPy).toContain("import argparse");
  });

  it("imports random", () => {
    expect(seedPy).toContain("import random");
  });

  it("imports date and timedelta from datetime", () => {
    expect(seedPy).toContain("from datetime import date");
    expect(seedPy).toContain("timedelta");
  });

  it("imports Path from pathlib", () => {
    expect(seedPy).toContain("from pathlib import Path");
  });

  it("imports psycopg2", () => {
    expect(seedPy).toContain("import psycopg2");
  });

  it("imports execute_values from psycopg2.extras", () => {
    expect(seedPy).toContain("from psycopg2.extras import execute_values");
  });
});

// ---------------------------------------------------------------------------
// seed.py — static data counts
// ---------------------------------------------------------------------------
describe("seed.py — static data counts", () => {
  it("defines exactly 5 users", () => {
    const usersMatch = seedPy.match(/^USERS\s*:\s*list[\s\S]*?=\s*\[[\s\S]*?\]/m);
    expect(usersMatch).not.toBeNull();
    const block = usersMatch![0];
    // Each user dict has an "employee_id" key
    const userCount = (block.match(/"employee_id"/g) || []).length;
    expect(userCount).toBe(5);
  });

  it("defines exactly 5 equipment entries", () => {
    const equipmentMatch = seedPy.match(/^EQUIPMENT\s*:\s*list[\s\S]*?=\s*\[[\s\S]*?\]/m);
    expect(equipmentMatch).not.toBeNull();
    const block = equipmentMatch![0];
    // Each equipment dict has a "code" key
    const equipmentCount = (block.match(/"code"/g) || []).length;
    expect(equipmentCount).toBe(5);
  });

  it("defines exactly 8 defect categories", () => {
    const defectMatch = seedPy.match(/^DEFECT_CATEGORIES\s*:\s*list[\s\S]*?=\s*\[[\s\S]*?\]/m);
    expect(defectMatch).not.toBeNull();
    const block = defectMatch![0];
    // Each defect dict has a "severity" key
    const defectCount = (block.match(/"severity"/g) || []).length;
    expect(defectCount).toBe(8);
  });

  it("defines exactly 50 BDD scenarios (10 per equipment, 5 equipment)", () => {
    const scenariosMatch = seedPy.match(/^BDD_SCENARIOS\s*:[\s\S]*?^\}/m);
    expect(scenariosMatch).not.toBeNull();
    const block = scenariosMatch![0];
    // Each scenario dict has a "title" key
    const scenarioCount = (block.match(/"title"/g) || []).length;
    expect(scenarioCount).toBe(50);
  });

  it("BDD_SCENARIOS covers all 5 equipment codes", () => {
    expect(seedPy).toContain('"EQ-CNC-001"');
    expect(seedPy).toContain('"EQ-ALR-001"');
    expect(seedPy).toContain('"EQ-CVB-001"');
    expect(seedPy).toContain('"EQ-PKG-001"');
    expect(seedPy).toContain('"EQ-CAM-001"');
  });

  it("uses a fixed random seed of 42 for reproducibility", () => {
    expect(seedPy).toContain("SEED = 42");
    expect(seedPy).toContain("random.seed(SEED)");
  });
});

// ---------------------------------------------------------------------------
// seed.py — function signatures
// ---------------------------------------------------------------------------
describe("seed.py — function signatures", () => {
  it("defines parse_args() function", () => {
    expect(seedPy).toContain("def parse_args()");
  });

  it("defines apply_schema() function", () => {
    expect(seedPy).toContain("def apply_schema(");
  });

  it("defines seed_users() function", () => {
    expect(seedPy).toContain("def seed_users(");
  });

  it("defines seed_equipment() function", () => {
    expect(seedPy).toContain("def seed_equipment(");
  });

  it("defines seed_defect_categories() function", () => {
    expect(seedPy).toContain("def seed_defect_categories(");
  });

  it("defines seed_bdd_scenarios() function", () => {
    expect(seedPy).toContain("def seed_bdd_scenarios(");
  });

  it("defines seed_test_results() function", () => {
    expect(seedPy).toContain("def seed_test_results(");
  });

  it("defines main() as the entry point", () => {
    expect(seedPy).toContain("def main()");
  });

  it("guards execution with __name__ == '__main__'", () => {
    expect(seedPy).toContain('if __name__ == "__main__"');
  });
});

// ---------------------------------------------------------------------------
// seed.py — CLI argument defaults
// ---------------------------------------------------------------------------
describe("seed.py — CLI argument defaults", () => {
  it("default DB port is 5434 (matching docker-compose)", () => {
    expect(seedPy).toContain("default=5434");
  });

  it("default DB name is oqc_demo", () => {
    expect(seedPy).toContain('default="oqc_demo"');
  });

  it("default DB user is oqc", () => {
    expect(seedPy).toContain('default="oqc"');
  });

  it("supports --schema-only flag", () => {
    expect(seedPy).toContain("--schema-only");
  });
});

// ---------------------------------------------------------------------------
// seed.py — transaction safety
// ---------------------------------------------------------------------------
describe("seed.py — transaction safety", () => {
  it("sets autocommit to False for transactional safety", () => {
    expect(seedPy).toContain("conn.autocommit = False");
  });

  it("calls conn.commit() on success", () => {
    expect(seedPy).toContain("conn.commit()");
  });

  it("calls conn.rollback() on error", () => {
    expect(seedPy).toContain("conn.rollback()");
  });

  it("closes connection in finally block", () => {
    expect(seedPy).toContain("conn.close()");
  });
});

// ---------------------------------------------------------------------------
// seed.py — test result date range and pass rate
// ---------------------------------------------------------------------------
describe("seed.py — test result generation", () => {
  it("test results span Q4 2025 (Oct through Dec)", () => {
    expect(seedPy).toContain("date(2025, 10, 1)");
    expect(seedPy).toContain("date(2025, 12, 31)");
  });

  it("skips weekends (weekday >= 5)", () => {
    expect(seedPy).toContain("weekday() >= 5");
  });

  it("targets approximately 85% pass rate", () => {
    expect(seedPy).toContain("0.85");
  });

  it("generates batch numbers per day", () => {
    expect(seedPy).toContain("BATCH-");
  });
});
