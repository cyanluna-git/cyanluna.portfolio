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
