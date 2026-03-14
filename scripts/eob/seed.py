"""
EOB (Engineering Resource Board) Demo Data Seeder

Generates realistic manufacturing demo data for the Engineering Resource Board
portfolio project. Uses fictional "Acme Manufacturing" as the company.

Usage:
    python seed.py [--host HOST] [--port PORT] [--db DB] [--user USER] [--password PASSWORD]

Idempotent: re-running will drop and recreate all data.
"""

import argparse
import random
from datetime import date, timedelta
from pathlib import Path

import psycopg2
from psycopg2.extras import execute_values


SEED = 42
random.seed(SEED)

# ---------------------------------------------------------------------------
# Static data definitions
# ---------------------------------------------------------------------------

DEPARTMENTS = [
    ("Engineering", "ENG", "Core engineering and product development"),
    ("Manufacturing", "MFG", "Production and manufacturing operations"),
    ("Quality", "QA", "Quality assurance and compliance"),
]

TEAMS_BY_DEPT: dict[str, list[tuple[str, str, str]]] = {
    "ENG": [
        ("Mechanical Design", "ENG-MD", "Sarah Chen"),
        ("Electrical Systems", "ENG-ES", "James Park"),
        ("Software & Controls", "ENG-SC", "Maria Rodriguez"),
    ],
    "MFG": [
        ("Assembly Line Alpha", "MFG-AL", "Tom Bradley"),
        ("CNC & Machining", "MFG-CM", "Kenji Tanaka"),
        ("Process Engineering", "MFG-PE", "Lisa Nguyen"),
    ],
    "QA": [
        ("Incoming Inspection", "QA-II", "Robert Kim"),
        ("In-Process Quality", "QA-IP", "Diana Kowalski"),
        ("Reliability Testing", "QA-RT", "Ahmed Hassan"),
    ],
}

ENGINEERS: list[dict[str, str]] = [
    # ENG-MD (Mechanical Design)
    {"first": "Alex", "last": "Morgan", "title": "Senior Mechanical Engineer", "team": "ENG-MD"},
    {"first": "Priya", "last": "Sharma", "title": "Mechanical Engineer II", "team": "ENG-MD"},
    {"first": "David", "last": "Wilson", "title": "CAD Designer", "team": "ENG-MD"},
    {"first": "Yuki", "last": "Yamamoto", "title": "Structural Analyst", "team": "ENG-MD"},
    # ENG-ES (Electrical Systems)
    {"first": "Carlos", "last": "Rivera", "title": "Senior Electrical Engineer", "team": "ENG-ES"},
    {"first": "Emily", "last": "Thompson", "title": "Electrical Engineer II", "team": "ENG-ES"},
    {"first": "Wei", "last": "Zhang", "title": "PCB Layout Engineer", "team": "ENG-ES"},
    # ENG-SC (Software & Controls)
    {"first": "Jordan", "last": "Lee", "title": "Senior Controls Engineer", "team": "ENG-SC"},
    {"first": "Anna", "last": "Petrov", "title": "Embedded Software Engineer", "team": "ENG-SC"},
    {"first": "Tyler", "last": "Johnson", "title": "PLC Programmer", "team": "ENG-SC"},
    {"first": "Fatima", "last": "Al-Rashid", "title": "SCADA Engineer", "team": "ENG-SC"},
    # MFG-AL (Assembly Line Alpha)
    {"first": "Marcus", "last": "Brown", "title": "Assembly Engineer", "team": "MFG-AL"},
    {"first": "Sandra", "last": "Garcia", "title": "Production Engineer", "team": "MFG-AL"},
    {"first": "Brian", "last": "O'Connor", "title": "Manufacturing Technician III", "team": "MFG-AL"},
    # MFG-CM (CNC & Machining)
    {"first": "Hiroshi", "last": "Nakamura", "title": "Senior CNC Programmer", "team": "MFG-CM"},
    {"first": "Rachel", "last": "Foster", "title": "Machinist II", "team": "MFG-CM"},
    {"first": "Dmitri", "last": "Volkov", "title": "Tool & Die Maker", "team": "MFG-CM"},
    # MFG-PE (Process Engineering)
    {"first": "Michelle", "last": "Dupont", "title": "Senior Process Engineer", "team": "MFG-PE"},
    {"first": "Kevin", "last": "Wright", "title": "Lean Manufacturing Specialist", "team": "MFG-PE"},
    {"first": "Sanjay", "last": "Patel", "title": "Industrial Engineer", "team": "MFG-PE"},
    {"first": "Christine", "last": "Bauer", "title": "Process Technician", "team": "MFG-PE"},
    # QA-II (Incoming Inspection)
    {"first": "Nathan", "last": "Clarke", "title": "QC Inspector III", "team": "QA-II"},
    {"first": "Olga", "last": "Ivanova", "title": "Receiving Inspector", "team": "QA-II"},
    {"first": "Luis", "last": "Hernandez", "title": "Quality Technician", "team": "QA-II"},
    # QA-IP (In-Process Quality)
    {"first": "Stephanie", "last": "Kim", "title": "Quality Engineer II", "team": "QA-IP"},
    {"first": "Derek", "last": "Anderson", "title": "SPC Analyst", "team": "QA-IP"},
    {"first": "Aisha", "last": "Mohammed", "title": "Process Auditor", "team": "QA-IP"},
    # QA-RT (Reliability Testing)
    {"first": "Greg", "last": "Patterson", "title": "Senior Reliability Engineer", "team": "QA-RT"},
    {"first": "Hannah", "last": "Lim", "title": "Test Engineer II", "team": "QA-RT"},
    {"first": "Victor", "last": "Santos", "title": "Lab Technician III", "team": "QA-RT"},
]

PROGRAMS = [
    ("Next-Gen Turbine Platform", "PGM-NTP", "Next generation industrial turbine product line", "active", "2025-07-01", "2026-12-31"),
    ("Smart Factory Initiative", "PGM-SFI", "Digital transformation of manufacturing floor", "active", "2025-09-01", "2026-06-30"),
    ("Sustainability 2030", "PGM-S30", "Carbon footprint reduction across product lifecycle", "active", "2025-10-01", "2030-12-31"),
    ("Customer Quality Program", "PGM-CQP", "Zero-defect outgoing quality initiative", "active", "2025-06-01", "2026-03-31"),
    ("Cost Optimization Drive", "PGM-COD", "Material and process cost reduction", "planning", "2026-01-01", "2026-12-31"),
]

PROJECTS = [
    # PGM-NTP projects
    ("Blade Redesign v3", "NTP-BRD3", "Aerodynamic blade profile optimization", "active", "high", "PGM-NTP", "2025-07-15", "2026-06-30"),
    ("Housing Assembly Revision", "NTP-HAR1", "Redesign of turbine housing for improved thermal management", "active", "high", "PGM-NTP", "2025-08-01", "2026-04-30"),
    ("Controls Firmware Update", "NTP-CFU2", "Firmware v2.4 with predictive maintenance features", "active", "medium", "PGM-NTP", "2025-09-01", "2026-03-31"),
    # PGM-SFI projects
    ("MES Integration Phase 1", "SFI-MES1", "Manufacturing execution system rollout - Line Alpha", "active", "high", "PGM-SFI", "2025-09-15", "2026-03-31"),
    ("IoT Sensor Network", "SFI-IOT1", "Deploy sensor mesh across machining center", "active", "medium", "PGM-SFI", "2025-10-01", "2026-05-31"),
    # PGM-S30 projects
    ("Material Substitution Study", "S30-MSS1", "Evaluate recyclable material alternatives for rotor", "active", "medium", "PGM-S30", "2025-10-15", "2026-08-31"),
    ("Energy Audit Automation", "S30-EAA1", "Automated energy consumption monitoring system", "planning", "low", "PGM-S30", "2026-01-01", "2026-09-30"),
    # PGM-CQP projects
    ("Supplier Scorecard System", "CQP-SSC1", "Automated supplier quality scoring platform", "active", "high", "PGM-CQP", "2025-06-15", "2026-01-31"),
    ("FMEA Database Migration", "CQP-FDB1", "Migrate FMEA records to new centralized database", "completed", "medium", "PGM-CQP", "2025-06-01", "2025-12-15"),
    ("Incoming Inspection Digitization", "CQP-IID1", "Paperless incoming inspection workflow", "active", "medium", "PGM-CQP", "2025-08-01", "2026-02-28"),
    # PGM-COD projects
    ("Fastener Standardization", "COD-FST1", "Reduce fastener SKUs by 40%", "planning", "medium", "PGM-COD", "2026-01-15", "2026-07-31"),
    ("Machining Cycle Optimization", "COD-MCO1", "CNC toolpath optimization for 15% cycle time reduction", "planning", "high", "PGM-COD", "2026-02-01", "2026-09-30"),
]

MILESTONES_TEMPLATE: dict[str, list[tuple[str, int, str, int]]] = {
    # (name, gate_number, status, days_offset_from_project_start)
    "NTP-BRD3": [
        ("Concept Review", 1, "completed", 30),
        ("Preliminary Design Review", 2, "completed", 90),
        ("Critical Design Review", 3, "active", 180),
        ("Prototype Validation", 4, "pending", 270),
        ("Production Release", 5, "pending", 340),
    ],
    "NTP-HAR1": [
        ("Requirements Freeze", 1, "completed", 21),
        ("Design Review", 2, "completed", 75),
        ("Thermal Test Gate", 3, "active", 150),
        ("Manufacturing Readiness", 4, "pending", 210),
    ],
    "NTP-CFU2": [
        ("Architecture Review", 1, "completed", 14),
        ("Alpha Release", 2, "completed", 60),
        ("Beta Validation", 3, "active", 120),
        ("Production Release", 4, "pending", 180),
    ],
    "SFI-MES1": [
        ("Vendor Selection", 1, "completed", 30),
        ("System Configuration", 2, "completed", 90),
        ("UAT Sign-off", 3, "active", 150),
        ("Go-Live", 4, "pending", 180),
    ],
    "SFI-IOT1": [
        ("Sensor Specification", 1, "completed", 21),
        ("Pilot Installation", 2, "active", 90),
        ("Full Deployment", 3, "pending", 180),
    ],
    "S30-MSS1": [
        ("Material Screening", 1, "completed", 45),
        ("Lab Testing", 2, "active", 120),
        ("Field Trial", 3, "pending", 240),
    ],
    "CQP-SSC1": [
        ("Requirements Complete", 1, "completed", 30),
        ("MVP Launch", 2, "completed", 120),
        ("Full Rollout", 3, "active", 200),
    ],
    "CQP-FDB1": [
        ("Schema Design", 1, "completed", 14),
        ("Data Migration", 2, "completed", 90),
        ("Validation & Close", 3, "completed", 150),
    ],
    "CQP-IID1": [
        ("Workflow Mapping", 1, "completed", 30),
        ("Tablet App Development", 2, "active", 120),
        ("Training & Rollout", 3, "pending", 180),
    ],
}

ACTIVITY_TYPES = [
    "design",
    "analysis",
    "prototyping",
    "testing",
    "documentation",
    "review",
    "rework",
    "commissioning",
    "programming",
    "inspection",
]

WORKLOG_DESCRIPTIONS: dict[str, list[str]] = {
    "design": [
        "3D model updates for revised geometry",
        "Updated assembly drawings per ECN-4521",
        "Tolerance stack-up analysis for interface fit",
        "Created machining fixture concept layout",
        "GD&T review and annotation updates",
    ],
    "analysis": [
        "FEA simulation for thermal loading case",
        "CFD run for airflow optimization study",
        "Fatigue life prediction per ASME guidelines",
        "Root cause analysis for field return #FR-2291",
        "Statistical process capability study (Cpk)",
    ],
    "prototyping": [
        "3D printed prototype assembly and fit check",
        "CNC machining of prototype bracket",
        "Wiring harness prototype build",
        "Rapid prototype iteration based on test feedback",
    ],
    "testing": [
        "Vibration test per MIL-STD-810G",
        "Thermal cycling chamber test (48-hour run)",
        "Functional acceptance test execution",
        "Salt spray corrosion test setup",
        "EMC pre-compliance test run",
    ],
    "documentation": [
        "Updated BOM for engineering change order",
        "Test report compilation and peer review",
        "Procedure SOP-MFG-0145 revision",
        "Design history file update",
        "PPAP documentation package preparation",
    ],
    "review": [
        "Design review meeting participation",
        "Drawing checker review and redline feedback",
        "Peer code review for PLC logic changes",
        "FMEA review session with cross-functional team",
    ],
    "rework": [
        "Rework disposition for NCR-0834",
        "Component rework per engineering deviation",
        "Corrective action implementation for CAPA-1122",
    ],
    "commissioning": [
        "Equipment commissioning and I/O checkout",
        "Sensor calibration and range verification",
        "PLC program download and initial run",
    ],
    "programming": [
        "PLC ladder logic development for new sequence",
        "HMI screen development for operator interface",
        "CNC G-code programming for new part geometry",
        "SCADA alarm configuration and tuning",
        "Automated test script development",
    ],
    "inspection": [
        "CMM measurement of incoming castings",
        "First article inspection report",
        "Visual inspection per IPC-A-610 criteria",
        "Dimensional audit of machined components",
    ],
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="EOB demo data seeder")
    parser.add_argument("--host", default="localhost", help="DB host (default: localhost)")
    parser.add_argument("--port", type=int, default=5433, help="DB port (default: 5433)")
    parser.add_argument("--db", default="eob_demo", help="DB name (default: eob_demo)")
    parser.add_argument("--user", default="eob", help="DB user (default: eob)")
    parser.add_argument("--password", default="eob_demo_pass", help="DB password")
    parser.add_argument("--schema-only", action="store_true", help="Apply schema without seeding data")
    return parser.parse_args()


def apply_schema(cur: "psycopg2.extensions.cursor") -> None:
    schema_path = Path(__file__).parent / "schema.sql"
    cur.execute(schema_path.read_text())
    print("[OK] Schema applied")


def seed_departments(cur: "psycopg2.extensions.cursor") -> dict[str, int]:
    rows = [(name, code, desc) for name, code, desc in DEPARTMENTS]
    execute_values(
        cur,
        "INSERT INTO departments (name, code, description) VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} departments created")
    return mapping


def seed_teams(cur: "psycopg2.extensions.cursor", dept_map: dict[str, int]) -> dict[str, int]:
    rows = []
    for dept_code, teams in TEAMS_BY_DEPT.items():
        for name, code, lead in teams:
            rows.append((dept_map[dept_code], name, code, lead))

    execute_values(
        cur,
        "INSERT INTO teams (department_id, name, code, lead_name) VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} teams created")
    return mapping


def seed_engineers(cur: "psycopg2.extensions.cursor", team_map: dict[str, int]) -> dict[str, int]:
    rows = []
    for i, eng in enumerate(ENGINEERS, start=1):
        emp_id = f"ACM-{1000 + i}"
        email = f"{eng['first'].lower()}.{eng['last'].lower()}@acme-mfg.com"
        hire_offset = random.randint(180, 2500)
        hire_date = date(2025, 10, 1) - timedelta(days=hire_offset)
        rows.append((
            team_map[eng["team"]],
            emp_id,
            eng["first"],
            eng["last"],
            email,
            eng["title"],
            hire_date,
        ))

    execute_values(
        cur,
        "INSERT INTO engineers (team_id, employee_id, first_name, last_name, email, title, hire_date) "
        "VALUES %s RETURNING id, employee_id",
        rows,
    )
    result = cur.fetchall()
    mapping = {emp_id: id_ for id_, emp_id in result}
    print(f"[OK] {len(mapping)} engineers created")
    return mapping


def seed_programs(cur: "psycopg2.extensions.cursor") -> dict[str, int]:
    rows = [
        (name, code, desc, status, start, end)
        for name, code, desc, status, start, end in PROGRAMS
    ]
    execute_values(
        cur,
        "INSERT INTO programs (name, code, description, status, start_date, target_end_date) "
        "VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} programs created")
    return mapping


def seed_projects(cur: "psycopg2.extensions.cursor", program_map: dict[str, int]) -> dict[str, int]:
    rows = []
    for name, code, desc, status, priority, pgm_code, start, end in PROJECTS:
        rows.append((program_map[pgm_code], name, code, desc, status, priority, start, end))

    execute_values(
        cur,
        "INSERT INTO projects (program_id, name, code, description, status, priority, start_date, target_end_date) "
        "VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} projects created")
    return mapping


def seed_milestones(cur: "psycopg2.extensions.cursor", project_map: dict[str, int]) -> None:
    project_starts: dict[str, date] = {}
    for _, code, _, _, _, _, start_str, _ in PROJECTS:
        project_starts[code] = date.fromisoformat(start_str)

    rows = []
    for proj_code, milestones in MILESTONES_TEMPLATE.items():
        proj_id = project_map[proj_code]
        proj_start = project_starts[proj_code]
        for name, gate, status, offset in milestones:
            due = proj_start + timedelta(days=offset)
            completed = due - timedelta(days=random.randint(1, 7)) if status == "completed" else None
            rows.append((proj_id, name, gate, None, status, due, completed))

    execute_values(
        cur,
        "INSERT INTO milestones (project_id, name, gate_number, description, status, due_date, completed_date) "
        "VALUES %s",
        rows,
    )
    print(f"[OK] {len(rows)} milestones created")


def _team_for_engineer(emp_id: str) -> str:
    """Return team code for an engineer by index."""
    idx = int(emp_id.split("-")[1]) - 1001
    return ENGINEERS[idx]["team"]


def _relevant_projects_for_team(team_code: str) -> list[str]:
    """Map teams to project codes they would logically contribute to."""
    mapping: dict[str, list[str]] = {
        "ENG-MD": ["NTP-BRD3", "NTP-HAR1", "S30-MSS1", "COD-FST1"],
        "ENG-ES": ["NTP-BRD3", "NTP-HAR1", "SFI-IOT1", "S30-EAA1"],
        "ENG-SC": ["NTP-CFU2", "SFI-MES1", "SFI-IOT1", "S30-EAA1"],
        "MFG-AL": ["NTP-HAR1", "SFI-MES1", "COD-FST1", "COD-MCO1"],
        "MFG-CM": ["NTP-BRD3", "COD-MCO1", "NTP-HAR1"],
        "MFG-PE": ["SFI-MES1", "SFI-IOT1", "COD-MCO1", "COD-FST1"],
        "QA-II": ["CQP-SSC1", "CQP-IID1", "S30-MSS1"],
        "QA-IP": ["CQP-SSC1", "CQP-FDB1", "NTP-BRD3"],
        "QA-RT": ["NTP-BRD3", "NTP-HAR1", "NTP-CFU2", "S30-MSS1"],
    }
    return mapping.get(team_code, ["NTP-BRD3"])


def seed_worklogs(
    cur: "psycopg2.extensions.cursor",
    engineer_map: dict[str, int],
    project_map: dict[str, int],
) -> None:
    """Generate ~100 worklog entries per month for 6 months (Oct 2025 - Mar 2026)."""
    start_date = date(2025, 10, 1)
    end_date = date(2026, 3, 31)

    project_starts: dict[str, date] = {}
    for _, code, _, _, _, _, start_str, _ in PROJECTS:
        project_starts[code] = date.fromisoformat(start_str)

    rows = []
    current = start_date
    while current <= end_date:
        if current.weekday() >= 5:
            current += timedelta(days=1)
            continue

        # Pick a subset of engineers to log time on this day
        active_engineers = random.sample(
            list(engineer_map.keys()),
            k=random.randint(4, 8),
        )

        for emp_id in active_engineers:
            eng_id = engineer_map[emp_id]
            team = _team_for_engineer(emp_id)
            relevant_projects = _relevant_projects_for_team(team)

            # Filter to projects that have started by this date
            available = [
                p for p in relevant_projects
                if p in project_map and project_starts.get(p, date.max) <= current
            ]
            if not available:
                continue

            proj_code = random.choice(available)
            proj_id = project_map[proj_code]

            hours = random.choice([2.0, 3.0, 4.0, 4.0, 6.0, 6.0, 8.0])
            activity = random.choice(ACTIVITY_TYPES)
            desc_options = WORKLOG_DESCRIPTIONS.get(activity, ["General work"])
            desc = random.choice(desc_options)

            rows.append((eng_id, proj_id, current, hours, activity, desc))

        current += timedelta(days=1)

    execute_values(
        cur,
        "INSERT INTO worklogs (engineer_id, project_id, log_date, hours, activity_type, description) "
        "VALUES %s",
        rows,
    )
    print(f"[OK] {len(rows)} worklogs created ({len(rows) / 6:.0f} avg/month)")


def seed_fte_allocations(
    cur: "psycopg2.extensions.cursor",
    engineer_map: dict[str, int],
    project_map: dict[str, int],
) -> None:
    """Generate FTE allocations for 30 engineers x 12 months (Jul 2025 - Jun 2026)."""
    project_starts: dict[str, date] = {}
    for _, code, _, _, _, _, start_str, _ in PROJECTS:
        project_starts[code] = date.fromisoformat(start_str)

    allocation_values = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0]
    rows = []

    for emp_id, eng_id in engineer_map.items():
        team = _team_for_engineer(emp_id)
        relevant_projects = _relevant_projects_for_team(team)
        available_projects = [p for p in relevant_projects if p in project_map]

        if not available_projects:
            continue

        # Assign 1-3 projects per engineer
        assigned = random.sample(available_projects, k=min(random.randint(1, 3), len(available_projects)))

        for year_month_offset in range(12):
            month = ((6 + year_month_offset) % 12) + 1  # Jul(7) through Jun(6)
            year = 2025 if month >= 7 else 2026

            period_date = date(year, month, 1)
            remaining = 1.0

            for proj_code in assigned:
                if project_starts.get(proj_code, date.max) > period_date:
                    continue

                proj_id = project_map[proj_code]
                alloc = random.choice([v for v in allocation_values if v <= remaining])
                if alloc <= 0:
                    continue

                rows.append((eng_id, proj_id, year, month, alloc))
                remaining -= alloc
                if remaining <= 0.05:
                    break

    execute_values(
        cur,
        "INSERT INTO fte_allocations (engineer_id, project_id, year, month, allocation) "
        "VALUES %s",
        rows,
    )
    print(f"[OK] {len(rows)} FTE allocations created")


def main() -> None:
    args = parse_args()

    print("=" * 60)
    print("  EOB Demo Data Seeder - Acme Manufacturing")
    print("=" * 60)
    print(f"  Target: {args.host}:{args.port}/{args.db}")
    print()

    conn = psycopg2.connect(
        host=args.host,
        port=args.port,
        dbname=args.db,
        user=args.user,
        password=args.password,
    )
    conn.autocommit = False

    try:
        with conn.cursor() as cur:
            apply_schema(cur)

            if args.schema_only:
                conn.commit()
                print("\n[DONE] Schema applied (no data seeded)")
                return

            dept_map = seed_departments(cur)
            team_map = seed_teams(cur, dept_map)
            engineer_map = seed_engineers(cur, team_map)
            program_map = seed_programs(cur)
            project_map = seed_projects(cur, program_map)
            seed_milestones(cur, project_map)
            seed_worklogs(cur, engineer_map, project_map)
            seed_fte_allocations(cur, engineer_map, project_map)

        conn.commit()
        print("\n[DONE] All demo data seeded successfully")

    except Exception:
        conn.rollback()
        print("\n[ERROR] Rolled back transaction")
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
