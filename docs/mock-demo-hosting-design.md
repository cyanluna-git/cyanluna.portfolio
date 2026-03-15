# Mock Demo Hosting Design

Last updated: 2026-03-15
Current recommendation for demo rollout

## Decision

Use this split:

- `cyanluna.com` -> Vercel portfolio
- demo subdomains -> Oracle

But on Oracle, serve only frontend-only mock demos.

Do not run backend APIs or databases for the first public demo rollout unless a specific demo truly needs them.

## Why This Is Better

This keeps the portfolio on the easiest platform while preserving standalone demo URLs.

What you get:

- `cyanluna.com` stays simple on Vercel
- `oqc.cyanluna.com`, `eob.cyanluna.com`, and similar feel like separate products
- Oracle only serves built frontend assets, so resource usage stays low
- no need to maintain backend services, DB containers, or auth flows for mock demos

This matches the real goal:

- show product feel
- show key screens and interactions
- avoid unnecessary infrastructure

## Recommended Architecture

```text
Visitor
  -> Cloudflare DNS
    -> cyanluna.com / www.cyanluna.com -> Vercel portfolio
    -> oqc/eob/gateway/demo.cyanluna.com -> Oracle Nginx -> static frontend builds
```

## What Runs on Oracle

Recommended runtime on Oracle:

- `Nginx`
- one static build directory per demo
- optional lightweight deploy script

Do not run by default:

- PostgreSQL
- FastAPI
- Node backend processes
- auth server
- background workers

## Frontend-Only Demo Principles

Each demo should:

- use local mock JSON or TypeScript fixtures
- support navigation across important screens
- include believable empty, loading, success, and error states
- keep forms interactive even if submissions are fake
- avoid real writes, login, billing, device I/O, or persistent server state

That is enough to communicate:

- what the product is
- how the workflow feels
- what actions users can take

## Recommended Demo Delivery Pattern

For each demo:

1. build a frontend-only app
2. export static assets if possible
3. copy build output to Oracle
4. let `Nginx` serve the built files under its own subdomain

Example public URLs:

- `oqc.cyanluna.com`
- `eob.cyanluna.com`
- `gateway.cyanluna.com`
- `demo.cyanluna.com`

## Directory Layout on Oracle

```text
/var/www/cyanluna-demos/
  oqc/
    index.html
    assets/
  eob/
    index.html
    assets/
  gateway/
    index.html
    assets/
  demo/
    index.html
    assets/
```

## Why Not Put Mock Demos on Vercel Too?

That would also work technically.

But your preferred structure has valid advantages:

- demos stay separated from the portfolio operationally
- subdomains can all point to one Oracle box
- you can replace a mock with a real backend-backed demo later without changing the public hostname

## When To Add Backend Later

Promote a specific demo beyond static mock only if it needs:

- real persistence
- private API access
- device connectivity
- file processing
- long-running jobs

At that point:

- keep the same subdomain
- add backend only for that one demo
- avoid turning every demo into a full stack deployment by default

## Execution Implication

Current recommended next steps:

1. attach `cyanluna.com` and `www.cyanluna.com` to the Vercel portfolio
2. prepare Oracle `Nginx` to serve static demo directories
3. build mock frontend demos
4. upload demo build artifacts to Oracle
5. point demo subdomains to Oracle
6. update portfolio links to the new demo URLs

## Sources

- Vercel domains: https://vercel.com/docs/domains
- Nginx static content guide: https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

