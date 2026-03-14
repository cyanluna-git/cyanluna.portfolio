# Industrial Projects — Screenshot Capture Guide

Comprehensive guide for capturing portfolio-quality screenshots of the 3 Industrial vertical projects.
Each screenshot will be displayed via the `BrowserFrame` component (`imageSrc` prop) at 16:9 aspect ratio.

---

## General Capture Settings

| Setting            | Value                                              |
|--------------------|----------------------------------------------------|
| Browser            | Chrome (latest stable), DevTools **closed**        |
| Viewport           | 1440x900 (primary) or 1920x1080 (high-res option) |
| Device pixel ratio | 2x (Retina) — produces 2880x1800 or 3840x2160 px  |
| Theme              | Dark mode (match portfolio dark theme)             |
| Format             | PNG, no compression artifacts                      |
| Bookmarks bar      | Hidden (`Cmd+Shift+B`)                             |
| Extensions         | Disable all visible extension icons                |
| Personal data      | Use incognito or a clean Chrome profile            |
| Tab bar            | Single tab only (the target page)                  |

### File Organization

```
public/projects/
  smart-factory-qc/
    hero.png                   (already referenced in data)
    feature-gherkin.png        (already referenced in data)
    feature-comms.png          (already referenced in data)
    feature-evidence.png       (already referenced in data)
    feature-sso.png            (already referenced in data)
    oqc-dashboard.png
    oqc-bdd-editor.png
    oqc-test-execution.png
    oqc-test-report.png
    oqc-modbus-monitor.png
  resource-board/
    eob-resource-dashboard.png
    eob-project-timeline.png
    eob-workload-matrix.png
    eob-fte-analysis.png
    eob-program-overview.png
  resource-board-lite/
    rb-allocation-board.png
    rb-capacity-planning.png
    rb-department-overview.png
```

### BrowserFrame Usage

Screenshots are rendered inside the `BrowserFrame` component:

```tsx
<BrowserFrame
  title="localhost:3000/dashboard"
  accentColor="#3B82F6"
  imageSrc="/projects/smart-factory-qc/oqc-dashboard.png"
/>
```

The component renders a 16:9 `aspect-video` container, so images should match that ratio (1440x810 content area at 1440-wide viewport, or crop accordingly).

---

## 1. Smart Factory QC Platform (OQC)

**Source project:** `edwards/oqc` (or the actual OQC repo)
**Stack:** React SPA + FastAPI + PostgreSQL
**Default ports:** Frontend `localhost:3000`, Backend `localhost:8000`

### Demo Data Prerequisites

```bash
cd scripts/oqc

# 1. Start PostgreSQL (port 5434)
docker compose up -d

# 2. Install Python deps
pip install -r requirements.txt

# 3. Seed all demo data (~1600 test results, 50 BDD scenarios, 5 equipment)
python seed.py
```

Verify data: connect to `localhost:5434`, database `oqc_demo`, user `oqc`, password `oqc_demo_pass`.

### Screenshot 1: Main Dashboard

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `oqc-dashboard.png`                                   |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/` or `/dashboard`                                    |

**Navigation:**
1. Launch the OQC frontend (`npm run dev` or `pnpm dev`)
2. Log in as **Jisoo Park** (QC Engineer, PDC-2001)
3. Navigate to the main dashboard

**Key visual elements to capture:**
- Equipment list panel showing all 5 items (CNC Machine, Assembly Line Robot, Conveyor System, Packaging Unit, Vision Camera)
- Status indicators (operational/maintenance) with color coding
- Test status summary cards — overall pass rate (~85%), total tests run (~1600)
- Date range showing Q4 2025 data
- Sidebar navigation visible

**Composition tips:**
- Ensure the summary statistics row (pass rate, total tests, equipment count) is fully visible
- All 5 equipment entries should be visible without scrolling

---

### Screenshot 2: BDD Scenario Editor

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `oqc-bdd-editor.png`                                  |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/scenarios/{id}/edit` or `/equipment/{id}/scenarios`  |

**Navigation:**
1. From the dashboard, click on **CNC Machine** (EQ-CNC-001)
2. Navigate to the Scenarios tab
3. Open a scenario for editing (e.g., "Spindle Speed Calibration Verification")

**Key visual elements to capture:**
- Gherkin syntax with Given/When/Then clauses clearly visible
- Syntax highlighting (keywords in distinct colors)
- Scenario metadata: title, feature name, priority badge (critical/high/medium)
- Equipment context header showing "CNC Machine — EQ-CNC-001"
- Save/Run action buttons

**Composition tips:**
- Select a scenario with all three Gherkin clauses visible without scrolling
- The syntax highlighting contrast should be obvious in dark mode

---

### Screenshot 3: Test Execution — Real-Time Progress

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `oqc-test-execution.png`                               |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/execution/{batch_id}` or `/equipment/{id}/run`       |

**Navigation:**
1. From the equipment detail page, click **Run Tests** or **Execute Batch**
2. Wait for the execution view to load with progress indicators
3. Capture while tests are mid-execution (some pass, some pending)

**Key visual elements to capture:**
- Progress bar showing partial completion (e.g., 6/10 scenarios done)
- Per-scenario status: green checkmarks (pass), red X (fail), grey spinner (pending)
- Real-time elapsed time counter
- Current batch number (e.g., BATCH-2025-Q4-xxx)
- Equipment name and test operator in the header

**Composition tips:**
- Ideal state: ~60% complete, showing a mix of pass/fail/pending states
- If execution is too fast, use browser DevTools Network throttling to slow it down before capture

---

### Screenshot 4: Test Result Report

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `oqc-test-report.png`                                  |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/reports` or `/equipment/{id}/results`                |

**Navigation:**
1. Navigate to **Reports** from the sidebar
2. Select date range: October 1 — December 31, 2025 (full Q4)
3. View the per-equipment pass rate chart

**Key visual elements to capture:**
- Bar or donut chart showing pass rates per equipment (5 equipment items)
- Pass rate percentages near each bar (target ~85% overall, varying per equipment)
- Summary statistics: total tests, overall pass rate, failure breakdown by defect category
- Date range selector showing Q4 2025
- Defect severity distribution (critical/major/minor/cosmetic)

**Composition tips:**
- The chart should be the dominant visual element
- Ensure legend/labels are readable at the expected display size

---

### Screenshot 5 (Optional): Equipment Communication Monitor

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `oqc-modbus-monitor.png`                               |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/equipment/{id}/communication` or `/monitor`          |

**Navigation:**
1. Navigate to an equipment detail page (e.g., CNC Machine)
2. Open the **Communication** or **Monitor** tab
3. Capture the live register view

**Key visual elements to capture:**
- Modbus register table: address, value, data type, description
- Connection status indicator (Connected / Disconnected)
- Protocol label (Modbus TCP)
- Register values updating in real time (or showing last-read timestamps)
- Equipment connection parameters (IP, port, unit ID)

**Composition tips:**
- Show at least 8-10 register rows to convey data density
- The "Connected" status badge should be green/active

---

## 2. Engineering Resource Board (EOB)

**Source project:** `edwards/operation-board`
**Stack:** React 19 + FastAPI + PostgreSQL
**Default ports:** Frontend `localhost:3004`, Backend `localhost:8004`, DB `localhost:5434`

### Demo Data Prerequisites

```bash
cd scripts/eob

# 1. Start PostgreSQL (port 5433)
docker compose up -d

# 2. Install Python deps
pip install -r requirements.txt

# 3. Seed all demo data (30 engineers, 12 projects, 5 programs, ~600 worklogs, ~360 FTE allocations)
python seed.py
```

Verify data: connect to `localhost:5433`, database `eob_demo`, user `eob`, password `eob_demo_pass`.

### Screenshot 1: Resource Dashboard — FTE Allocation Heatmap

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `eob-resource-dashboard.png`                           |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/` or `/dashboard`                                    |

**Navigation:**
1. Launch the EOB frontend
2. Log in (any user with dashboard access)
3. Navigate to the main resource dashboard

**Key visual elements to capture:**
- FTE allocation heatmap grid: engineers (rows) x months (columns)
- Color intensity representing allocation level (0.0 = empty, 1.0 = full)
- Department/team grouping in the left column
- Month headers spanning at least 6 months (Jul 2025 — Dec 2025)
- Over-allocation warnings (cells > 1.0 FTE highlighted in red)
- Summary stats: total headcount (30), average utilization

**Composition tips:**
- Zoom out enough to show at least 15-20 engineer rows for visual impact
- The heatmap color gradient should be clearly distinguishable (e.g., white/light through blue/dark)

---

### Screenshot 2: Project Timeline — Gantt Chart

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `eob-project-timeline.png`                             |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/projects` or `/timeline`                             |

**Navigation:**
1. Navigate to the **Projects** or **Timeline** view from the sidebar
2. Expand all 5 programs to show their child projects
3. Set timeline range to show full project durations

**Key visual elements to capture:**
- Gantt bars for 12 projects grouped under 5 programs
- Gate review milestones (G3, G5, G6) as diamond markers on the timeline
- Color-coded project status (active/completed/on-hold)
- Today line (vertical marker)
- Program hierarchy: program name > project name indentation

**Composition tips:**
- Scroll to a position where milestone markers are visible on at least 2-3 projects
- The today line should intersect some active project bars

---

### Screenshot 3: Team Workload Matrix

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `eob-workload-matrix.png`                              |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/workload` or `/teams/matrix`                         |

**Navigation:**
1. Navigate to the **Workload** or **Teams** view
2. Select a view showing all 9 teams across 3 departments
3. Set the period to current month or quarter

**Key visual elements to capture:**
- Matrix grid: teams (rows) x projects (columns)
- Cell values showing allocated hours or FTE count
- Department section headers (Engineering, Manufacturing, Quality)
- Team leads listed next to team names
- Total row/column showing aggregated allocations
- Visual indicator for over-capacity teams

**Composition tips:**
- The 3-department grouping should create clear visual sections
- Ensure column headers (project names) are readable

---

### Screenshot 4: FTE Analysis — Utilization Trends

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `eob-fte-analysis.png`                                 |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/analytics` or `/fte-analysis`                        |

**Navigation:**
1. Navigate to the **Analytics** or **FTE Analysis** section
2. Select trend view over 6 months (Jul — Dec 2025)
3. Group by department

**Key visual elements to capture:**
- Line or stacked area chart showing FTE utilization over time
- Separate trend lines/areas per department (Engineering, Manufacturing, Quality)
- Target utilization line (e.g., 85% reference line)
- Monthly data points with labels
- Legend identifying each department color
- Summary callouts: peak utilization month, lowest utilization

**Composition tips:**
- The chart should occupy at least 60% of the viewport
- Ensure the legend does not overlap with data lines

---

### Screenshot 5 (Optional): Program Overview

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `eob-program-overview.png`                             |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/programs` or `/programs/{id}`                        |

**Navigation:**
1. Navigate to **Programs** from the sidebar
2. Select a program (e.g., the one with the most child projects)
3. View the program detail/overview page

**Key visual elements to capture:**
- Program header with name, code, status, and date range
- Child projects list with individual status badges
- Progress indicator (e.g., 3/5 milestones completed)
- Resource summary: assigned engineers count, total FTE
- Key dates: start, target end, next milestone

**Composition tips:**
- Choose a program with mixed project statuses (active + completed) for visual variety

---

## 3. Resource Board (Lightweight Version)

**Source project:** resource-board standalone or a simplified view within EOB
**Stack:** React + (varies)
**Note:** This may share the EOB demo data or have its own dataset. Use the EOB seed data if no separate seed exists.

### Demo Data Prerequisites

Use the same EOB seed data (see Section 2 above), or run any project-specific seed if available.

### Screenshot 1: Resource Allocation Board — Drag-and-Drop

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `rb-allocation-board.png`                              |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/board` or `/allocation`                              |

**Navigation:**
1. Launch the Resource Board frontend
2. Navigate to the allocation board view
3. Ensure multiple engineers are assigned to projects (populated from seed data)

**Key visual elements to capture:**
- Kanban-style or grid board with engineer cards
- Drag handles or drag-affordance indicators on cards
- Project columns or swim lanes
- Engineer cards showing: name, title, current allocation percentage
- Visual drop zones highlighted (if possible, capture mid-drag state)

**Composition tips:**
- If capturing a drag state is difficult, ensure the drag handles/cursors are visible
- Show at least 3 columns/projects with 2-4 engineers each

---

### Screenshot 2: Capacity Planning View

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `rb-capacity-planning.png`                             |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/capacity` or `/planning`                             |

**Navigation:**
1. Navigate to the **Capacity** or **Planning** view
2. Set the time range to show at least 3-6 months ahead
3. Ensure both allocated and available capacity bars are visible

**Key visual elements to capture:**
- Horizontal stacked bar chart: allocated vs. available capacity per team/month
- Color distinction between allocated (filled) and available (empty/lighter)
- Month labels along the x-axis
- Team or department labels along the y-axis
- Over-capacity indicators (bars exceeding 100%)

**Composition tips:**
- The contrast between allocated and available capacity should be immediately obvious
- Include at least one over-capacity scenario for visual impact

---

### Screenshot 3: Department Overview

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| **Filename**       | `rb-department-overview.png`                           |
| **Viewport**       | 1440x900                                               |
| **Route**          | `/departments` or `/overview`                          |

**Navigation:**
1. Navigate to the **Department** or **Overview** section
2. Ensure all 3 departments are visible (Engineering, Manufacturing, Quality)

**Key visual elements to capture:**
- Department cards or panels for all 3 departments
- Per-department metrics: headcount, active projects, average utilization
- Team breakdown within each department (3 teams each)
- Visual hierarchy: Department > Team > Engineer count
- Quick-action links (view team, manage allocation)

**Composition tips:**
- All 3 department cards should be visible without scrolling
- Each card should show enough detail to be informative at a glance

---

## Capture Workflow Checklist

Use this checklist for each screenshot session:

- [ ] Docker containers running (OQC: port 5434, EOB: port 5433)
- [ ] Demo data seeded and verified
- [ ] Frontend and backend dev servers running
- [ ] Chrome clean profile or incognito mode
- [ ] Bookmarks bar hidden
- [ ] Extensions disabled/hidden
- [ ] Dark mode enabled (OS-level and app-level)
- [ ] Viewport set to target size (1440x900)
- [ ] DevTools closed
- [ ] Screenshot taken at 2x DPI (Retina)
- [ ] File saved to correct `public/projects/` subdirectory
- [ ] Image visually verified in BrowserFrame component at portfolio viewport

## Post-Capture Checklist

- [ ] All PNGs optimized (run through `pngquant` or similar, target < 500KB each)
- [ ] No personal data visible (emails, real names, bookmarks)
- [ ] Filenames match this guide exactly
- [ ] Images render correctly in `BrowserFrame` at 16:9 aspect ratio
- [ ] Dark mode contrast is readable at portfolio display sizes
- [ ] All referenced `imageSrc` paths updated in project data files if needed
