# EOB Demo Data Seeder

Demo data environment for the Engineering Resource Board (EOB) project.
Generates realistic manufacturing data for **Acme Manufacturing** — a fictional company.

## Prerequisites

- Docker & Docker Compose
- Python 3.10+

## Quick Start

```bash
# 1. Start PostgreSQL (port 5433)
docker compose up -d

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Seed demo data
python seed.py
```

## Data Overview

| Table              | Count  | Description                          |
|--------------------|--------|--------------------------------------|
| departments        | 3      | Engineering, Manufacturing, Quality  |
| teams              | 9      | 3 per department                     |
| engineers          | 30     | Across all teams                     |
| programs           | 5      | Top-level initiatives                |
| projects           | 12     | Under programs                       |
| milestones         | ~30    | Gate reviews per project             |
| worklogs           | ~600   | 6 months of time entries             |
| fte_allocations    | ~360   | 30 people x 12 months               |

## Options

```bash
# Apply schema only (no data)
python seed.py --schema-only

# Custom connection
python seed.py --host localhost --port 5433 --db eob_demo --user eob --password eob_demo_pass
```

## Cleanup

```bash
docker compose down -v
```
