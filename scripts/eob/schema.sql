-- EOB (Engineering Resource Board) Demo Schema
-- Idempotent: DROP IF EXISTS + CREATE

DROP TABLE IF EXISTS fte_allocations CASCADE;
DROP TABLE IF EXISTS worklogs CASCADE;
DROP TABLE IF EXISTS milestones CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS engineers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- Departments
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Teams
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    lead_name VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Engineers
CREATE TABLE engineers (
    id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Programs (top-level initiative)
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    start_date DATE NOT NULL,
    target_end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects (belong to a program)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(30) NOT NULL UNIQUE,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    start_date DATE NOT NULL,
    target_end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Milestones / Gate Reviews
CREATE TABLE milestones (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    gate_number INTEGER,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    due_date DATE NOT NULL,
    completed_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Worklogs (time entries)
CREATE TABLE worklogs (
    id SERIAL PRIMARY KEY,
    engineer_id INTEGER NOT NULL REFERENCES engineers(id) ON DELETE CASCADE,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    hours NUMERIC(4,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_worklogs_engineer ON worklogs(engineer_id);
CREATE INDEX idx_worklogs_project ON worklogs(project_id);
CREATE INDEX idx_worklogs_date ON worklogs(log_date);

-- FTE Allocations (planned resource allocation per month)
CREATE TABLE fte_allocations (
    id SERIAL PRIMARY KEY,
    engineer_id INTEGER NOT NULL REFERENCES engineers(id) ON DELETE CASCADE,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    allocation NUMERIC(3,2) NOT NULL CHECK (allocation >= 0.0 AND allocation <= 1.0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(engineer_id, project_id, year, month)
);

CREATE INDEX idx_fte_engineer ON fte_allocations(engineer_id);
CREATE INDEX idx_fte_project ON fte_allocations(project_id);
CREATE INDEX idx_fte_period ON fte_allocations(year, month);
