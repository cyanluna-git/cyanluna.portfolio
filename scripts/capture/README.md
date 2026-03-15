# Playwright Capture Pipeline

Automated screenshot capture for portfolio project pages.

## Setup

```bash
pnpm add -D @playwright/test
npx playwright install chromium
```

## Usage

Capture screenshots for a specific project:

```bash
pnpm capture:unahouse
pnpm capture:cpet
pnpm capture:today-bike
```

Run the full pipeline (seed data + capture + optimize):

```bash
pnpm capture:all
```

## Architecture

```
scripts/capture/
  config.ts        — shared viewport, theme, DPR settings
  helpers.ts       — browser launch, screenshot, wait utilities
  seeds/           — dummy data seeding scripts per project
  scenarios/       — capture scenario scripts per project
```

## Scenarios

| Script | Project | Server | Port |
|--------|---------|--------|------|
| `capture:unahouse` | Personal Finance | una.house.fiance | 3104 |
| `capture:today-bike` | Today.Bike | today.bike | 3000 |
| `capture:ai-cycling-coach` | AI Cycling Coach | Vercel (prod) | — |
| `capture:kanban` | AI Kanban Pipeline | kanban-board | 5173 |
| `capture:cpet` | CPET Platform | cpet.db | 3100 |
| `capture:ride-analytics` | Ride Analytics | asan.bicycle | 3102 |
| `capture:assist-11th` | aSSiST 11th Community | assist.11th | 3103 |
| `capture:assist-hub` | Assist Hub | assist-hub | 5103 |
| `capture:equipment-gateway` | Equipment Gateway | edwards/unify | 3001 |
| `capture:resource-board` | Resource Board | edwards.operation.board | 3004 |
| `capture:smart-factory-qc` | Smart Factory QC | edwards.oqc.infra | 3006 |
| `capture:javis` | Javis | jira.javis | 3009 |
| `capture:code-review` | Code Review Suite | (CLI, static HTML) | — |

## Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| Viewport | 1200x800 | Matches screenshot-guide.md |
| DPR | 2x | Retina quality |
| Color scheme | dark | Portfolio dark theme |
| Output | public/projects/[slug]/raw/ | Fed into optimize-images.mjs |

## Adding a New Project

1. Create seed script in `seeds/<project>.ts` (if needed)
2. Create scenario in `scenarios/<project>.ts`
3. Add npm script to `package.json`
4. Update this README's Scenarios table
