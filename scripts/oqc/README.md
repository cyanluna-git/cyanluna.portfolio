# OQC Demo Data Seeder

Demo data environment for the Smart Factory OQC (Outgoing Quality Control) project.
Generates realistic BDD-driven quality control data for **Precision Dynamics Corp** — a fictional company.

## Prerequisites

- Docker & Docker Compose
- Python 3.10+

## Quick Start

```bash
# 1. Start PostgreSQL (port 5434)
docker compose up -d

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Seed demo data
python seed.py
```

## Data Overview

| Table              | Count  | Description                                    |
|--------------------|--------|------------------------------------------------|
| users              | 5      | QC Engineer, Line Supervisor, QA Manager, etc.  |
| equipment          | 5      | CNC, Robot, Conveyor, Packaging, Camera         |
| defect_categories  | 8      | 4 severity levels (critical/major/minor/cosmetic) |
| bdd_scenarios      | 50     | 10 Gherkin scenarios per equipment              |
| test_results       | ~1600  | 3 months (Q4 2025), ~85% pass rate             |

## Options

```bash
# Apply schema only (no data)
python seed.py --schema-only

# Custom connection
python seed.py --host localhost --port 5434 --db oqc_demo --user oqc --password oqc_demo_pass
```

## Cleanup

```bash
docker compose down -v
```
