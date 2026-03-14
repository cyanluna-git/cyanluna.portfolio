/**
 * Shield · EOB Scripts Tests
 * Task #880 — EOB 더미 데이터 시딩 스크립트
 *
 * Validates script file contents via filesystem reads:
 *   - schema.sql: table definitions, constraints, indexes
 *   - docker-compose.yml: service config, ports, healthcheck
 *   - seed.py: imports, data counts, function signatures
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const SCRIPTS_DIR = join(process.cwd(), "scripts", "eob");

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
describe("EOB script files exist", () => {
  it("schema.sql exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "schema.sql"))).toBe(true);
  });

  it("docker-compose.yml exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "docker-compose.yml"))).toBe(true);
  });

  it("seed.py exists", () => {
    expect(existsSync(join(SCRIPTS_DIR, "seed.py"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// schema.sql — table definitions
// ---------------------------------------------------------------------------
describe("schema.sql — DROP/CREATE idempotency", () => {
  const expectedTables = [
    "departments",
    "teams",
    "engineers",
    "programs",
    "projects",
    "milestones",
    "worklogs",
    "fte_allocations",
  ];

  it("drops all tables with CASCADE before recreating", () => {
    for (const table of expectedTables) {
      expect(schemaSql).toContain(`DROP TABLE IF EXISTS ${table} CASCADE`);
    }
  });

  it("creates all 8 expected tables", () => {
    for (const table of expectedTables) {
      expect(schemaSql).toContain(`CREATE TABLE ${table}`);
    }
  });
});

describe("schema.sql — table structure", () => {
  it("departments table has required columns", () => {
    expect(schemaSql).toContain("CREATE TABLE departments");
    expect(schemaSql).toContain("id SERIAL PRIMARY KEY");
    expect(schemaSql).toContain("name VARCHAR");
    expect(schemaSql).toContain("code VARCHAR");
    expect(schemaSql).toContain("created_at TIMESTAMPTZ");
  });

  it("teams table references departments with CASCADE", () => {
    expect(schemaSql).toContain("CREATE TABLE teams");
    expect(schemaSql).toContain("department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE");
    expect(schemaSql).toContain("lead_name VARCHAR");
  });

  it("engineers table references teams with CASCADE", () => {
    expect(schemaSql).toContain("CREATE TABLE engineers");
    expect(schemaSql).toContain("team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE");
    expect(schemaSql).toContain("employee_id VARCHAR");
    expect(schemaSql).toContain("email VARCHAR");
    expect(schemaSql).toContain("hire_date DATE NOT NULL");
    expect(schemaSql).toContain("is_active BOOLEAN NOT NULL DEFAULT TRUE");
  });

  it("programs table has status and date columns", () => {
    expect(schemaSql).toContain("CREATE TABLE programs");
    expect(schemaSql).toContain("status VARCHAR");
    expect(schemaSql).toContain("start_date DATE NOT NULL");
    expect(schemaSql).toContain("target_end_date DATE");
  });

  it("projects table references programs and has priority column", () => {
    expect(schemaSql).toContain("CREATE TABLE projects");
    expect(schemaSql).toContain("program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE");
    expect(schemaSql).toContain("priority VARCHAR");
    expect(schemaSql).toContain("start_date DATE NOT NULL");
  });

  it("milestones table references projects and has gate_number", () => {
    expect(schemaSql).toContain("CREATE TABLE milestones");
    expect(schemaSql).toContain("project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE");
    expect(schemaSql).toContain("gate_number INTEGER");
    expect(schemaSql).toContain("due_date DATE NOT NULL");
    expect(schemaSql).toContain("completed_date DATE");
  });

  it("worklogs table has hours CHECK constraint", () => {
    expect(schemaSql).toContain("CREATE TABLE worklogs");
    expect(schemaSql).toContain("engineer_id INTEGER NOT NULL REFERENCES engineers(id) ON DELETE CASCADE");
    expect(schemaSql).toContain("hours NUMERIC");
    expect(schemaSql).toContain("CHECK (hours > 0 AND hours <= 24)");
    expect(schemaSql).toContain("activity_type VARCHAR");
    expect(schemaSql).toContain("log_date DATE NOT NULL");
  });

  it("fte_allocations table has allocation CHECK and UNIQUE constraint", () => {
    expect(schemaSql).toContain("CREATE TABLE fte_allocations");
    expect(schemaSql).toContain("allocation NUMERIC");
    expect(schemaSql).toContain("CHECK (allocation >= 0.0 AND allocation <= 1.0)");
    expect(schemaSql).toContain("CHECK (month BETWEEN 1 AND 12)");
    expect(schemaSql).toContain("UNIQUE(engineer_id, project_id, year, month)");
  });
});

describe("schema.sql — indexes", () => {
  it("worklogs has indexes on engineer_id, project_id, and log_date", () => {
    expect(schemaSql).toContain("CREATE INDEX idx_worklogs_engineer ON worklogs(engineer_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_worklogs_project ON worklogs(project_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_worklogs_date ON worklogs(log_date)");
  });

  it("fte_allocations has indexes on engineer_id, project_id, and year/month period", () => {
    expect(schemaSql).toContain("CREATE INDEX idx_fte_engineer ON fte_allocations(engineer_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_fte_project ON fte_allocations(project_id)");
    expect(schemaSql).toContain("CREATE INDEX idx_fte_period ON fte_allocations(year, month)");
  });
});

// ---------------------------------------------------------------------------
// docker-compose.yml — service configuration
// ---------------------------------------------------------------------------
describe("docker-compose.yml — service definition", () => {
  it("uses postgres:16-alpine image", () => {
    expect(dockerCompose).toContain("image: postgres:16-alpine");
  });

  it("container name is eob-demo-db", () => {
    expect(dockerCompose).toContain("container_name: eob-demo-db");
  });

  it("database name is eob_demo", () => {
    expect(dockerCompose).toContain("POSTGRES_DB: eob_demo");
  });

  it("database user is eob", () => {
    expect(dockerCompose).toContain("POSTGRES_USER: eob");
  });

  it("database password is eob_demo_pass", () => {
    expect(dockerCompose).toContain("POSTGRES_PASSWORD: eob_demo_pass");
  });

  it("maps host port 5433 to container port 5432", () => {
    expect(dockerCompose).toContain("5433:5432");
  });

  it("mounts schema.sql as init script", () => {
    expect(dockerCompose).toContain("./schema.sql:/docker-entrypoint-initdb.d/01_schema.sql");
  });

  it("declares a named volume eob_demo_data", () => {
    expect(dockerCompose).toContain("eob_demo_data:");
  });
});

describe("docker-compose.yml — healthcheck", () => {
  it("healthcheck uses pg_isready", () => {
    expect(dockerCompose).toContain("pg_isready");
  });

  it("healthcheck targets the eob user and eob_demo database", () => {
    expect(dockerCompose).toContain("-U eob");
    expect(dockerCompose).toContain("-d eob_demo");
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
    expect(seedPy).toContain("from datetime import date, timedelta");
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

describe("seed.py — static data counts", () => {
  it("defines exactly 3 departments", () => {
    // DEPARTMENTS list has 3 tuples
    const departmentsMatch = seedPy.match(/DEPARTMENTS\s*=\s*\[[\s\S]*?\]/);
    expect(departmentsMatch).not.toBeNull();
    const block = departmentsMatch![0];
    // Count tuples by opening parentheses at beginning of entries
    const tupleCount = (block.match(/\(\s*"/g) || []).length;
    expect(tupleCount).toBe(3);
  });

  it("defines exactly 5 programs", () => {
    const programsMatch = seedPy.match(/^PROGRAMS\s*=\s*\[[\s\S]*?\]/m);
    expect(programsMatch).not.toBeNull();
    const block = programsMatch![0];
    const tupleCount = (block.match(/\(\s*"/g) || []).length;
    expect(tupleCount).toBe(5);
  });

  it("defines exactly 12 projects", () => {
    const projectsMatch = seedPy.match(/^PROJECTS\s*=\s*\[[\s\S]*?\]/m);
    expect(projectsMatch).not.toBeNull();
    const block = projectsMatch![0];
    const tupleCount = (block.match(/\(\s*"/g) || []).length;
    expect(tupleCount).toBe(12);
  });

  it("defines exactly 30 engineers", () => {
    const engineersMatch = seedPy.match(/^ENGINEERS\s*:\s*list\[[\s\S]*?\]\s*=\s*\[[\s\S]*?\]/m);
    expect(engineersMatch).not.toBeNull();
    const block = engineersMatch![0];
    // Each engineer is a dict with "first" key
    const engineerCount = (block.match(/"first"/g) || []).length;
    expect(engineerCount).toBe(30);
  });

  it("defines 9 teams across 3 departments", () => {
    const teamsMatch = seedPy.match(/^TEAMS_BY_DEPT[\s\S]*?^\}/m);
    expect(teamsMatch).not.toBeNull();
    const block = teamsMatch![0];
    // Each team is a tuple with a quoted name
    const teamCount = (block.match(/\(\s*"/g) || []).length;
    expect(teamCount).toBe(9);
  });

  it("defines exactly 10 activity types", () => {
    const activityMatch = seedPy.match(/^ACTIVITY_TYPES\s*=\s*\[[\s\S]*?\]/m);
    expect(activityMatch).not.toBeNull();
    const block = activityMatch![0];
    const activityCount = (block.match(/"\w+"/g) || []).length;
    expect(activityCount).toBe(10);
  });

  it("uses a fixed random seed of 42 for reproducibility", () => {
    expect(seedPy).toContain("SEED = 42");
    expect(seedPy).toContain("random.seed(SEED)");
  });
});

describe("seed.py — function signatures", () => {
  it("defines parse_args() function", () => {
    expect(seedPy).toContain("def parse_args()");
  });

  it("defines apply_schema() function", () => {
    expect(seedPy).toContain("def apply_schema(");
  });

  it("defines seed_departments() function", () => {
    expect(seedPy).toContain("def seed_departments(");
  });

  it("defines seed_teams() function", () => {
    expect(seedPy).toContain("def seed_teams(");
  });

  it("defines seed_engineers() function", () => {
    expect(seedPy).toContain("def seed_engineers(");
  });

  it("defines seed_programs() function", () => {
    expect(seedPy).toContain("def seed_programs(");
  });

  it("defines seed_projects() function", () => {
    expect(seedPy).toContain("def seed_projects(");
  });

  it("defines seed_milestones() function", () => {
    expect(seedPy).toContain("def seed_milestones(");
  });

  it("defines seed_worklogs() function", () => {
    expect(seedPy).toContain("def seed_worklogs(");
  });

  it("defines seed_fte_allocations() function", () => {
    expect(seedPy).toContain("def seed_fte_allocations(");
  });

  it("defines main() as the entry point", () => {
    expect(seedPy).toContain("def main()");
  });

  it("guards execution with __name__ == '__main__'", () => {
    expect(seedPy).toContain('if __name__ == "__main__"');
  });
});

describe("seed.py — CLI argument defaults", () => {
  it("default DB port is 5433 (matching docker-compose)", () => {
    expect(seedPy).toContain("default=5433");
  });

  it("default DB name is eob_demo", () => {
    expect(seedPy).toContain('default="eob_demo"');
  });

  it("default DB user is eob", () => {
    expect(seedPy).toContain('default="eob"');
  });

  it("supports --schema-only flag", () => {
    expect(seedPy).toContain("--schema-only");
  });
});

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

describe("seed.py — worklog date range", () => {
  it("worklogs span Oct 2025 through Mar 2026", () => {
    expect(seedPy).toContain("date(2025, 10, 1)");
    expect(seedPy).toContain("date(2026, 3, 31)");
  });

  it("skips weekends (weekday >= 5)", () => {
    expect(seedPy).toContain("weekday() >= 5");
  });
});

describe("seed.py — FTE allocation date range", () => {
  it("FTE allocations cover 12 months", () => {
    expect(seedPy).toContain("range(12)");
  });

  it("allocation values are between 0 and 1", () => {
    expect(seedPy).toContain("allocation_values = [0.1");
    expect(seedPy).toContain("1.0]");
  });
});
