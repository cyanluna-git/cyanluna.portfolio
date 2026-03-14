-- OQC (Outgoing Quality Control) Demo Schema
-- Idempotent: DROP IF EXISTS + CREATE

DROP TABLE IF EXISTS test_results CASCADE;
DROP TABLE IF EXISTS bdd_scenarios CASCADE;
DROP TABLE IF EXISTS defect_categories CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Equipment
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(30) NOT NULL UNIQUE,
    equipment_type VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'operational',
    commissioned_date DATE NOT NULL,
    last_maintenance_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Defect Categories
CREATE TABLE defect_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'major', 'minor', 'cosmetic')),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BDD Scenarios (Gherkin-style test definitions)
CREATE TABLE bdd_scenarios (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    feature VARCHAR(200) NOT NULL,
    given_clause TEXT NOT NULL,
    when_clause TEXT NOT NULL,
    then_clause TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bdd_scenarios_equipment ON bdd_scenarios(equipment_id);
CREATE INDEX idx_bdd_scenarios_priority ON bdd_scenarios(priority);

-- Test Results (execution records)
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES bdd_scenarios(id) ON DELETE CASCADE,
    equipment_id INTEGER NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
    executed_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    defect_category_id INTEGER REFERENCES defect_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pass', 'fail', 'blocked', 'skipped')),
    execution_date TIMESTAMPTZ NOT NULL,
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0),
    notes TEXT,
    batch_number VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_results_scenario ON test_results(scenario_id);
CREATE INDEX idx_test_results_equipment ON test_results(equipment_id);
CREATE INDEX idx_test_results_executed_by ON test_results(executed_by);
CREATE INDEX idx_test_results_status ON test_results(status);
CREATE INDEX idx_test_results_date ON test_results(execution_date);
CREATE INDEX idx_test_results_defect ON test_results(defect_category_id);
