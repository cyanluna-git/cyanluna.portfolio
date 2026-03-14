"""
OQC (Outgoing Quality Control) Demo Data Seeder

Generates realistic smart factory QC demo data for the OQC portfolio project.
Uses fictional "Precision Dynamics Corp" as the company.

Usage:
    python seed.py [--host HOST] [--port PORT] [--db DB] [--user USER] [--password PASSWORD]

Idempotent: re-running will drop and recreate all data.
"""

import argparse
import random
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import psycopg2
from psycopg2.extras import execute_values


SEED = 42
random.seed(SEED)

# ---------------------------------------------------------------------------
# Static data definitions
# ---------------------------------------------------------------------------

USERS: list[dict[str, str]] = [
    {
        "employee_id": "PDC-2001",
        "name": "Jisoo Park",
        "email": "jisoo.park@precision-dynamics.com",
        "role": "QC Engineer",
        "department": "Quality Control",
    },
    {
        "employee_id": "PDC-2002",
        "name": "Michael Torres",
        "email": "michael.torres@precision-dynamics.com",
        "role": "Line Supervisor",
        "department": "Production",
    },
    {
        "employee_id": "PDC-2003",
        "name": "Ayumi Nakamura",
        "email": "ayumi.nakamura@precision-dynamics.com",
        "role": "QA Manager",
        "department": "Quality Assurance",
    },
    {
        "employee_id": "PDC-2004",
        "name": "Daniel Schmidt",
        "email": "daniel.schmidt@precision-dynamics.com",
        "role": "Maintenance Engineer",
        "department": "Maintenance",
    },
    {
        "employee_id": "PDC-2005",
        "name": "Seonghwa Lee",
        "email": "seonghwa.lee@precision-dynamics.com",
        "role": "Process Engineer",
        "department": "Production Engineering",
    },
]

EQUIPMENT: list[dict[str, str]] = [
    {
        "name": "CNC Machine",
        "code": "EQ-CNC-001",
        "equipment_type": "machining",
        "location": "Building A - Bay 3",
        "status": "operational",
        "commissioned_date": "2023-03-15",
    },
    {
        "name": "Assembly Line Robot",
        "code": "EQ-ALR-001",
        "equipment_type": "assembly",
        "location": "Building B - Line 1",
        "status": "operational",
        "commissioned_date": "2023-06-01",
    },
    {
        "name": "Conveyor Belt",
        "code": "EQ-CVB-001",
        "equipment_type": "transport",
        "location": "Building A - Main Line",
        "status": "operational",
        "commissioned_date": "2022-11-20",
    },
    {
        "name": "Packaging Unit",
        "code": "EQ-PKG-001",
        "equipment_type": "packaging",
        "location": "Building C - Packaging Zone",
        "status": "operational",
        "commissioned_date": "2024-01-10",
    },
    {
        "name": "Inspection Camera",
        "code": "EQ-CAM-001",
        "equipment_type": "inspection",
        "location": "Building A - QC Station",
        "status": "operational",
        "commissioned_date": "2024-04-22",
    },
]

DEFECT_CATEGORIES: list[dict[str, str]] = [
    {
        "name": "Dimensional Out-of-Tolerance",
        "code": "DEF-DIM",
        "severity": "critical",
        "description": "Part dimensions exceed specified tolerance limits",
    },
    {
        "name": "Surface Finish Defect",
        "code": "DEF-SRF",
        "severity": "major",
        "description": "Surface roughness or finish does not meet specification",
    },
    {
        "name": "Assembly Misalignment",
        "code": "DEF-ALN",
        "severity": "critical",
        "description": "Components are misaligned beyond acceptable range",
    },
    {
        "name": "Missing Component",
        "code": "DEF-MIS",
        "severity": "critical",
        "description": "Required component is absent from the assembly",
    },
    {
        "name": "Cosmetic Scratch",
        "code": "DEF-SCR",
        "severity": "cosmetic",
        "description": "Visible scratch on product surface not affecting function",
    },
    {
        "name": "Weld Porosity",
        "code": "DEF-WLD",
        "severity": "major",
        "description": "Gas pockets detected in weld joint",
    },
    {
        "name": "Label Error",
        "code": "DEF-LBL",
        "severity": "minor",
        "description": "Incorrect or misplaced product label",
    },
    {
        "name": "Packaging Damage",
        "code": "DEF-PKG",
        "severity": "minor",
        "description": "Product packaging is damaged or inadequate",
    },
]

# BDD Scenarios: 10 per equipment (50 total)
# Organized by equipment code
BDD_SCENARIOS: dict[str, list[dict[str, str]]] = {
    "EQ-CNC-001": [
        {
            "title": "Verify spindle speed within tolerance",
            "feature": "CNC Spindle Control",
            "given": "the CNC machine is powered on and spindle is calibrated",
            "when": "a machining cycle is initiated at 12000 RPM",
            "then": "the actual spindle speed should be within +/- 50 RPM of the target",
            "priority": "critical",
        },
        {
            "title": "Validate tool wear compensation",
            "feature": "CNC Tool Management",
            "given": "tool offset values are loaded for tool T01",
            "when": "the tool has exceeded 80% of its expected lifespan",
            "then": "the system should apply wear compensation within 0.01mm accuracy",
            "priority": "high",
        },
        {
            "title": "Check part dimensional accuracy",
            "feature": "CNC Machining Quality",
            "given": "a standard test block is loaded in the fixture",
            "when": "the machining program PRG-TEST-001 completes",
            "then": "all critical dimensions should be within ISO 2768-m tolerance",
            "priority": "critical",
        },
        {
            "title": "Verify coolant flow rate",
            "feature": "CNC Coolant System",
            "given": "the coolant system is primed and reservoir is at operating level",
            "when": "coolant is activated during a cutting operation",
            "then": "the flow rate should be between 15 and 25 liters per minute",
            "priority": "medium",
        },
        {
            "title": "Test emergency stop response",
            "feature": "CNC Safety Systems",
            "given": "the CNC machine is running a machining cycle",
            "when": "the emergency stop button is pressed",
            "then": "all axes should stop within 0.5 seconds and spindle should decelerate to zero",
            "priority": "critical",
        },
        {
            "title": "Validate axis positioning repeatability",
            "feature": "CNC Axis Control",
            "given": "the machine has completed its warm-up cycle",
            "when": "the X-axis is commanded to position 100.000mm ten consecutive times",
            "then": "the positioning repeatability should be within +/- 0.005mm",
            "priority": "high",
        },
        {
            "title": "Check chip evacuation efficiency",
            "feature": "CNC Chip Management",
            "given": "a heavy roughing operation is in progress on aluminum stock",
            "when": "the chip conveyor system is running at normal speed",
            "then": "the chip tray should not accumulate beyond 70% capacity during a 4-hour shift",
            "priority": "low",
        },
        {
            "title": "Verify program transfer integrity",
            "feature": "CNC Data Management",
            "given": "a G-code program is uploaded via the DNC network",
            "when": "the program is loaded into the controller memory",
            "then": "the checksum should match the source file with zero discrepancies",
            "priority": "high",
        },
        {
            "title": "Test automatic door interlock",
            "feature": "CNC Safety Systems",
            "given": "the CNC machine door is in the closed position",
            "when": "an operator attempts to open the door during spindle rotation",
            "then": "the door should remain locked until spindle speed reaches zero RPM",
            "priority": "critical",
        },
        {
            "title": "Validate surface roughness output",
            "feature": "CNC Machining Quality",
            "given": "a finishing pass is programmed with feed rate 0.1mm/rev",
            "when": "the finish cut is completed on the test specimen",
            "then": "the measured surface roughness Ra should be less than 1.6 micrometers",
            "priority": "high",
        },
    ],
    "EQ-ALR-001": [
        {
            "title": "Verify pick-and-place accuracy",
            "feature": "Robot Positioning",
            "given": "the robot arm is at home position and calibrated",
            "when": "a pick-and-place cycle is executed for component type A",
            "then": "the placement accuracy should be within +/- 0.1mm of the target position",
            "priority": "critical",
        },
        {
            "title": "Test gripper force control",
            "feature": "Robot Gripper System",
            "given": "the pneumatic gripper is set to handle delicate components",
            "when": "the gripper closes on a glass substrate component",
            "then": "the grip force should be between 5N and 15N without causing deformation",
            "priority": "high",
        },
        {
            "title": "Validate cycle time consistency",
            "feature": "Robot Performance",
            "given": "the assembly line is running in standard production mode",
            "when": "50 consecutive assembly cycles are completed",
            "then": "the average cycle time should be 12 +/- 1 seconds with no outliers exceeding 15 seconds",
            "priority": "high",
        },
        {
            "title": "Check collision avoidance response",
            "feature": "Robot Safety",
            "given": "the robot is executing a standard motion path",
            "when": "an unexpected obstacle is detected within the safety zone",
            "then": "the robot should stop within 100ms and trigger a safety alert",
            "priority": "critical",
        },
        {
            "title": "Verify torque on fastener insertion",
            "feature": "Robot Assembly Quality",
            "given": "a screw-driving end effector is attached and torque calibrated",
            "when": "an M4 fastener is driven into the assembly fixture",
            "then": "the applied torque should be 2.5 +/- 0.3 Nm as recorded by the torque sensor",
            "priority": "critical",
        },
        {
            "title": "Test vision-guided alignment",
            "feature": "Robot Vision System",
            "given": "the vision camera is focused on the alignment fiducials",
            "when": "a component with 2-degree rotational offset is presented",
            "then": "the robot should correct alignment to within 0.05 degrees before placement",
            "priority": "high",
        },
        {
            "title": "Validate multi-product changeover",
            "feature": "Robot Flexibility",
            "given": "the robot is configured for product variant Alpha",
            "when": "a changeover command to product variant Beta is issued",
            "then": "the robot should complete the changeover within 30 seconds and pass self-test",
            "priority": "medium",
        },
        {
            "title": "Check end-effector wear detection",
            "feature": "Robot Maintenance",
            "given": "the vacuum suction cup has been in service for 50000 cycles",
            "when": "the suction pressure is measured during a pick operation",
            "then": "the system should flag a maintenance alert if suction drops below 80% of nominal",
            "priority": "medium",
        },
        {
            "title": "Verify teach pendant override safety",
            "feature": "Robot Safety",
            "given": "an operator is using the teach pendant in manual mode",
            "when": "the robot speed exceeds 250mm/s in teach mode",
            "then": "the controller should limit speed to 250mm/s and display a warning",
            "priority": "critical",
        },
        {
            "title": "Test component presence verification",
            "feature": "Robot Assembly Quality",
            "given": "a completed sub-assembly is in the inspection fixture",
            "when": "the robot vision system scans all 8 component locations",
            "then": "each component location should return a presence confirmation within 2 seconds",
            "priority": "high",
        },
    ],
    "EQ-CVB-001": [
        {
            "title": "Verify belt speed consistency",
            "feature": "Conveyor Speed Control",
            "given": "the conveyor belt is set to transport speed of 0.5 m/s",
            "when": "the belt operates under full load for 30 minutes",
            "then": "the speed variation should not exceed +/- 2% of the set speed",
            "priority": "high",
        },
        {
            "title": "Test load capacity handling",
            "feature": "Conveyor Load Management",
            "given": "the conveyor is rated for 50kg per meter of belt",
            "when": "products weighing 45kg/m are placed on the belt",
            "then": "the belt should transport without slippage or motor overcurrent alarm",
            "priority": "critical",
        },
        {
            "title": "Validate belt tracking alignment",
            "feature": "Conveyor Belt Alignment",
            "given": "the conveyor belt has been running for 8 hours continuously",
            "when": "belt edge position is measured at the tracking sensor",
            "then": "the belt lateral drift should be within +/- 5mm of center",
            "priority": "medium",
        },
        {
            "title": "Check product spacing accuracy",
            "feature": "Conveyor Product Flow",
            "given": "the conveyor is feeding products to the packaging station",
            "when": "products are released at 3-second intervals by the upstream station",
            "then": "the inter-product gap at the downstream sensor should be 300 +/- 20mm",
            "priority": "high",
        },
        {
            "title": "Verify emergency stop propagation",
            "feature": "Conveyor Safety",
            "given": "the conveyor system spans three safety zones",
            "when": "an emergency stop is activated in zone 2",
            "then": "all three zones should stop within 1 second and status displays should turn red",
            "priority": "critical",
        },
        {
            "title": "Test accumulation mode behavior",
            "feature": "Conveyor Accumulation",
            "given": "the downstream station signals a buffer-full condition",
            "when": "products continue arriving from upstream",
            "then": "the conveyor should enter accumulation mode with zero-pressure queuing for up to 20 products",
            "priority": "medium",
        },
        {
            "title": "Validate diverter gate accuracy",
            "feature": "Conveyor Routing",
            "given": "three product variants are marked with barcode labels",
            "when": "the barcode scanner reads each product passing the diverter point",
            "then": "products should be routed to the correct lane with 100% accuracy",
            "priority": "critical",
        },
        {
            "title": "Check motor temperature monitoring",
            "feature": "Conveyor Monitoring",
            "given": "the drive motor has been running at 80% rated load",
            "when": "motor winding temperature reaches 85 degrees Celsius",
            "then": "the monitoring system should generate a warning alert and log the event",
            "priority": "medium",
        },
        {
            "title": "Verify restart sequence after jam",
            "feature": "Conveyor Recovery",
            "given": "a product jam has been detected and the conveyor has stopped",
            "when": "the operator clears the jam and presses the reset button",
            "then": "the conveyor should execute a slow-speed restart and verify belt is clear before resuming normal speed",
            "priority": "high",
        },
        {
            "title": "Test energy-saving idle mode",
            "feature": "Conveyor Efficiency",
            "given": "no products have been detected on the belt for 5 minutes",
            "when": "the idle timeout period expires",
            "then": "the conveyor should reduce speed to 10% and enter standby mode",
            "priority": "low",
        },
    ],
    "EQ-PKG-001": [
        {
            "title": "Verify box forming dimensions",
            "feature": "Packaging Box Formation",
            "given": "the packaging unit is loaded with flat carton blanks",
            "when": "a box forming cycle completes for size category Medium",
            "then": "the formed box dimensions should be 400x300x200mm +/- 2mm",
            "priority": "high",
        },
        {
            "title": "Test seal integrity",
            "feature": "Packaging Seal Quality",
            "given": "a product is placed inside the formed box",
            "when": "the heat sealing process completes at 180 degrees Celsius",
            "then": "the seal strength should exceed 15 N/25mm in a peel test",
            "priority": "critical",
        },
        {
            "title": "Validate label placement accuracy",
            "feature": "Packaging Labeling",
            "given": "the label applicator is calibrated for the current product variant",
            "when": "a shipping label is applied to the sealed package",
            "then": "the label position should be within +/- 3mm of the target location on all axes",
            "priority": "medium",
        },
        {
            "title": "Check weight verification accuracy",
            "feature": "Packaging Weight Check",
            "given": "the checkweigher is zeroed and a reference weight has been verified",
            "when": "a packaged product passes over the inline scale",
            "then": "the measured weight should match expected weight within +/- 10 grams",
            "priority": "critical",
        },
        {
            "title": "Verify barcode print quality",
            "feature": "Packaging Barcode Quality",
            "given": "the thermal transfer printer is loaded with fresh ribbon",
            "when": "a barcode is printed on the package label",
            "then": "the barcode should achieve ANSI grade B or higher when verified by inline scanner",
            "priority": "high",
        },
        {
            "title": "Test cushioning material dispensing",
            "feature": "Packaging Protection",
            "given": "the foam-in-place system is primed and at operating temperature",
            "when": "protective cushioning is dispensed for a fragile product",
            "then": "the foam volume should fill 90-95% of void space with uniform density",
            "priority": "medium",
        },
        {
            "title": "Validate case packing count",
            "feature": "Packaging Case Packing",
            "given": "the case packer is configured for 12 units per case",
            "when": "a shipping case is filled and sealed",
            "then": "the vision system should confirm exactly 12 units present before case closure",
            "priority": "critical",
        },
        {
            "title": "Check palletizing pattern accuracy",
            "feature": "Packaging Palletization",
            "given": "the palletizer is set for 5-layer stacking pattern P3",
            "when": "a full pallet of 60 cases is assembled",
            "then": "each layer should conform to the pattern template with no overhangs exceeding 10mm",
            "priority": "high",
        },
        {
            "title": "Verify date code printing",
            "feature": "Packaging Traceability",
            "given": "the inkjet printer is set to print production date and batch code",
            "when": "the date code is printed on each package",
            "then": "the printed date should match the current production date and be OCR-readable",
            "priority": "high",
        },
        {
            "title": "Test rejected package diversion",
            "feature": "Packaging Reject Handling",
            "given": "a package has failed the weight check or seal inspection",
            "when": "the reject signal is sent to the diverter",
            "then": "the package should be diverted to the reject bin within 2 seconds and logged in the system",
            "priority": "critical",
        },
    ],
    "EQ-CAM-001": [
        {
            "title": "Verify image capture resolution",
            "feature": "Camera Image Quality",
            "given": "the inspection camera is focused on the USAF 1951 resolution target",
            "when": "an image is captured at full resolution",
            "then": "the camera should resolve Group 4 Element 2 lines (17.95 lp/mm) without aliasing",
            "priority": "high",
        },
        {
            "title": "Test defect detection sensitivity",
            "feature": "Camera Defect Detection",
            "given": "a test specimen with a known 0.3mm surface scratch is positioned under the camera",
            "when": "the automated defect detection algorithm processes the captured image",
            "then": "the scratch should be detected and classified with confidence level above 95%",
            "priority": "critical",
        },
        {
            "title": "Validate color consistency measurement",
            "feature": "Camera Color Analysis",
            "given": "the camera is calibrated against the X-Rite ColorChecker reference card",
            "when": "a production part with specified color RAL 7035 is inspected",
            "then": "the measured Delta-E should be less than 2.0 compared to the reference",
            "priority": "medium",
        },
        {
            "title": "Check inspection throughput rate",
            "feature": "Camera Performance",
            "given": "the camera system is configured for single-side inspection",
            "when": "products are presented at the maximum line speed of 120 units per minute",
            "then": "every unit should be captured and analyzed with no missed inspections",
            "priority": "critical",
        },
        {
            "title": "Verify dimensional measurement accuracy",
            "feature": "Camera Dimensional Measurement",
            "given": "the telecentric lens is calibrated with a certified gauge block",
            "when": "a part with a 25.000mm reference feature is measured",
            "then": "the camera measurement should be 25.000 +/- 0.020mm",
            "priority": "critical",
        },
        {
            "title": "Test lighting uniformity",
            "feature": "Camera Lighting System",
            "given": "the ring light and backlight are set to standard inspection intensity",
            "when": "a uniformity reference plate is captured under full illumination",
            "then": "the illumination uniformity across the field of view should exceed 90%",
            "priority": "medium",
        },
        {
            "title": "Validate OCR character recognition",
            "feature": "Camera OCR Capability",
            "given": "the camera is positioned above a product with laser-engraved serial number",
            "when": "the OCR algorithm processes the captured image",
            "then": "the serial number should be read correctly with 99.5% character accuracy rate",
            "priority": "high",
        },
        {
            "title": "Check false positive rate",
            "feature": "Camera Defect Detection",
            "given": "100 known-good products are presented to the inspection system",
            "when": "all products are inspected using the standard detection profile",
            "then": "the false rejection rate should be less than 1%",
            "priority": "high",
        },
        {
            "title": "Verify multi-angle inspection coverage",
            "feature": "Camera Multi-View Inspection",
            "given": "a cylindrical product is placed on the rotation stage",
            "when": "the rotation stage completes a 360-degree sweep with 8 capture positions",
            "then": "the combined inspection coverage should cover at least 98% of the product surface",
            "priority": "high",
        },
        {
            "title": "Test camera self-diagnostic routine",
            "feature": "Camera System Health",
            "given": "the daily start-of-shift routine is triggered",
            "when": "the camera runs the self-diagnostic check sequence",
            "then": "sensor health, lens cleanliness, and lighting intensity should all return PASS status",
            "priority": "medium",
        },
    ],
}

# Notes for test results (varied by status)
PASS_NOTES: list[str] = [
    "All parameters within specification",
    "Passed on first attempt",
    "Consistent with previous run results",
    "Marginal but within tolerance",
    "Stable readings across all measurement points",
    "No deviations observed",
    "Results well within control limits",
]

FAIL_NOTES: list[str] = [
    "Value exceeded upper specification limit",
    "Intermittent failure observed on third measurement",
    "Drift detected over 30-minute observation period",
    "Component wear suspected as root cause",
    "Calibration offset detected, recalibration required",
    "Environmental conditions may have contributed to failure",
    "Material batch variation suspected",
    "Requires engineering investigation",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="OQC demo data seeder")
    parser.add_argument("--host", default="localhost", help="DB host (default: localhost)")
    parser.add_argument("--port", type=int, default=5434, help="DB port (default: 5434)")
    parser.add_argument("--db", default="oqc_demo", help="DB name (default: oqc_demo)")
    parser.add_argument("--user", default="oqc", help="DB user (default: oqc)")
    parser.add_argument("--password", default="oqc_demo_pass", help="DB password")
    parser.add_argument("--schema-only", action="store_true", help="Apply schema without seeding data")
    return parser.parse_args()


def apply_schema(cur: "psycopg2.extensions.cursor") -> None:
    schema_path = Path(__file__).parent / "schema.sql"
    cur.execute(schema_path.read_text())
    print("[OK] Schema applied")


def seed_users(cur: "psycopg2.extensions.cursor") -> dict[str, int]:
    rows = [
        (u["employee_id"], u["name"], u["email"], u["role"], u["department"])
        for u in USERS
    ]
    execute_values(
        cur,
        "INSERT INTO users (employee_id, name, email, role, department) "
        "VALUES %s RETURNING id, employee_id",
        rows,
    )
    result = cur.fetchall()
    mapping = {emp_id: id_ for id_, emp_id in result}
    print(f"[OK] {len(mapping)} users created")
    return mapping


def seed_equipment(cur: "psycopg2.extensions.cursor") -> dict[str, int]:
    rows = [
        (
            e["name"],
            e["code"],
            e["equipment_type"],
            e["location"],
            e["status"],
            e["commissioned_date"],
        )
        for e in EQUIPMENT
    ]
    execute_values(
        cur,
        "INSERT INTO equipment (name, code, equipment_type, location, status, commissioned_date) "
        "VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} equipment created")
    return mapping


def seed_defect_categories(cur: "psycopg2.extensions.cursor") -> dict[str, int]:
    rows = [
        (d["name"], d["code"], d["severity"], d["description"])
        for d in DEFECT_CATEGORIES
    ]
    execute_values(
        cur,
        "INSERT INTO defect_categories (name, code, severity, description) "
        "VALUES %s RETURNING id, code",
        rows,
    )
    result = cur.fetchall()
    mapping = {code: id_ for id_, code in result}
    print(f"[OK] {len(mapping)} defect categories created")
    return mapping


def seed_bdd_scenarios(
    cur: "psycopg2.extensions.cursor",
    equipment_map: dict[str, int],
) -> dict[int, str]:
    """Seed BDD scenarios and return {scenario_id: equipment_code} mapping."""
    rows = []
    for eq_code, scenarios in BDD_SCENARIOS.items():
        eq_id = equipment_map[eq_code]
        for s in scenarios:
            rows.append((
                eq_id,
                s["title"],
                s["feature"],
                s["given"],
                s["when"],
                s["then"],
                s["priority"],
            ))

    execute_values(
        cur,
        "INSERT INTO bdd_scenarios (equipment_id, title, feature, given_clause, when_clause, then_clause, priority) "
        "VALUES %s RETURNING id, equipment_id",
        rows,
    )
    result = cur.fetchall()

    # Build reverse lookup: equipment_id -> equipment_code
    eq_id_to_code: dict[int, str] = {v: k for k, v in equipment_map.items()}
    scenario_equipment: dict[int, str] = {
        scenario_id: eq_id_to_code[eq_id] for scenario_id, eq_id in result
    }
    print(f"[OK] {len(scenario_equipment)} BDD scenarios created")
    return scenario_equipment


def seed_test_results(
    cur: "psycopg2.extensions.cursor",
    scenario_equipment: dict[int, str],
    equipment_map: dict[str, int],
    user_map: dict[str, int],
    defect_map: dict[str, int],
) -> None:
    """Generate ~3 months of test results with ~85% pass rate.

    Date range: 2025-10-01 to 2025-12-31 (Q4 2025).
    Each scenario is executed roughly every 2-3 days.
    """
    start_date = date(2025, 10, 1)
    end_date = date(2025, 12, 31)
    user_ids = list(user_map.values())
    defect_codes = list(defect_map.keys())

    # Map severity to defect codes for weighted selection on failure
    severity_defect_map: dict[str, list[str]] = {}
    for d in DEFECT_CATEGORIES:
        sev = d["severity"]
        if sev not in severity_defect_map:
            severity_defect_map[sev] = []
        severity_defect_map[sev].append(d["code"])

    rows: list[tuple[int, int, int, int | None, str, datetime, int, str, str]] = []
    batch_counter = 1

    scenario_ids = list(scenario_equipment.keys())

    current = start_date
    while current <= end_date:
        # Skip weekends
        if current.weekday() >= 5:
            current += timedelta(days=1)
            continue

        # Generate batch number for the day
        batch = f"BATCH-{current.strftime('%Y%m%d')}-{batch_counter:04d}"
        batch_counter += 1

        # Each day, execute a subset of scenarios (roughly 1/2 to 2/3 of all scenarios)
        day_scenarios = random.sample(
            scenario_ids,
            k=random.randint(len(scenario_ids) // 2, len(scenario_ids) * 2 // 3),
        )

        for scenario_id in day_scenarios:
            eq_code = scenario_equipment[scenario_id]
            eq_id = equipment_map[eq_code]
            executor_id = random.choice(user_ids)

            # ~85% pass rate
            roll = random.random()
            if roll < 0.85:
                status = "pass"
                defect_id = None
                notes = random.choice(PASS_NOTES)
            elif roll < 0.97:
                status = "fail"
                # Pick a defect category, weighted toward minor/major for realism
                defect_code = random.choice(defect_codes)
                defect_id = defect_map[defect_code]
                notes = random.choice(FAIL_NOTES)
            elif roll < 0.99:
                status = "blocked"
                defect_id = None
                notes = "Test blocked due to equipment unavailability"
            else:
                status = "skipped"
                defect_id = None
                notes = "Skipped per supervisor decision due to schedule constraints"

            # Random execution time during working hours (06:00-18:00)
            hour = random.randint(6, 17)
            minute = random.randint(0, 59)
            exec_dt = datetime(
                current.year, current.month, current.day,
                hour, minute, 0,
                tzinfo=timezone.utc,
            )

            # Duration varies by equipment type (30s to 600s)
            duration = random.randint(30, 600)

            rows.append((
                scenario_id,
                eq_id,
                executor_id,
                defect_id,
                status,
                exec_dt,
                duration,
                notes,
                batch,
            ))

        current += timedelta(days=1)

    execute_values(
        cur,
        "INSERT INTO test_results "
        "(scenario_id, equipment_id, executed_by, defect_category_id, status, "
        "execution_date, duration_seconds, notes, batch_number) "
        "VALUES %s",
        rows,
    )

    # Count stats
    pass_count = sum(1 for r in rows if r[4] == "pass")
    fail_count = sum(1 for r in rows if r[4] == "fail")
    blocked_count = sum(1 for r in rows if r[4] == "blocked")
    skipped_count = sum(1 for r in rows if r[4] == "skipped")
    actual_pass_rate = pass_count / len(rows) * 100 if rows else 0

    print(f"[OK] {len(rows)} test results created")
    print(f"     Pass: {pass_count} ({actual_pass_rate:.1f}%) | Fail: {fail_count} | Blocked: {blocked_count} | Skipped: {skipped_count}")


def main() -> None:
    args = parse_args()

    print("=" * 60)
    print("  OQC Demo Data Seeder - Precision Dynamics Corp")
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

            user_map = seed_users(cur)
            equipment_map = seed_equipment(cur)
            defect_map = seed_defect_categories(cur)
            scenario_equipment = seed_bdd_scenarios(cur, equipment_map)
            seed_test_results(cur, scenario_equipment, equipment_map, user_map, defect_map)

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
