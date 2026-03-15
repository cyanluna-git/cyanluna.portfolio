# Domain Routing Design

Last updated: 2026-03-15
Task: `#945` Cloudflare DNS + Vercel custom domain design

## Current Recommendation

Use this architecture:

- portfolio on Vercel
- mock demos on Oracle
- Oracle serves static frontend-only demo builds

Reason:

- the portfolio fits Vercel best
- the demos benefit from standalone subdomains
- the demos do not need backend or DB runtime yet

See `docs/mock-demo-hosting-design.md`.

## Goal

Use `cyanluna.com` as the primary public domain while keeping the portfolio on Vercel and routing Oracle-hosted mock demos through dedicated subdomains.

## Current State

- Portfolio project: `cyanluna.portfolio`
- Current production URL: `https://cyanlunaportfolio.vercel.app`
- Domain purchased via Cloudflare: `cyanluna.com`
- Demo subdomains will be served from Oracle
- Local Vercel CLI check on 2026-03-15 showed the project is linked

## Recommended Public URL Strategy

- `https://cyanluna.com` -> portfolio on Vercel
- `https://www.cyanluna.com` -> 308 redirect to `https://cyanluna.com`
- `https://oqc.cyanluna.com` -> Oracle static mock demo
- `https://eob.cyanluna.com` -> Oracle static mock demo
- `https://gateway.cyanluna.com` -> Oracle static mock demo
- `https://demo.cyanluna.com` -> Oracle demo index

## Architecture

```text
Browser
  -> Cloudflare DNS
    -> cyanluna.com / www.cyanluna.com -> Vercel
    -> oqc/eob/gateway/demo.cyanluna.com -> Cloudflare proxy -> Oracle Nginx -> static frontend files
```

Responsibilities:

- Cloudflare: DNS, TLS edge, proxy for Oracle-bound subdomains
- Vercel: portfolio hosting and portfolio custom domain handling
- Oracle: Nginx-based static hosting for demo frontends

## DNS Design

### Final DNS Record Table

| Type | Name | Target | Proxy | TTL | Purpose |
| --- | --- | --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | `DNS only` | `Auto` | Portfolio apex to Vercel |
| `CNAME` | `www` | `cname.vercel-dns-0.com` | `DNS only` | `Auto` | Portfolio `www` to Vercel |
| `A` | `oqc` | `<ORACLE_PUBLIC_IP>` | `Proxied` | `Auto` | OQC static mock demo |
| `A` | `eob` | `<ORACLE_PUBLIC_IP>` | `Proxied` | `Auto` | EOB static mock demo |
| `A` | `gateway` | `<ORACLE_PUBLIC_IP>` | `Proxied` | `Auto` | Gateway static mock demo |
| `A` | `demo` | `<ORACLE_PUBLIC_IP>` | `Proxied` | `Auto` | Demo index / hub |

Notes:

- keep the Vercel-bound records as `DNS only` for the initial portfolio setup
- keep the Oracle-bound demo records as `Proxied`
- if Vercel returns a project-specific value for `www`, prefer that over the generic CNAME

## Vercel Configuration

Attach both of these to the `cyanluna.portfolio` Vercel project:

- `cyanluna.com`
- `www.cyanluna.com`

Recommended commands:

```bash
cd /Users/cyanluna-pro16/dev/cyanluna.portfolio
vercel domains add cyanluna.com cyanluna.portfolio
vercel domains add www.cyanluna.com cyanluna.portfolio
vercel domains inspect cyanluna.com
vercel domains inspect www.cyanluna.com
```

Recommended canonical policy:

- canonical: `https://cyanluna.com`
- redirect source: `https://www.cyanluna.com`
- redirect type: permanent `308`

## Oracle Demo Mapping

| Public Host | Oracle Nginx Root |
| --- | --- |
| `oqc.cyanluna.com` | `/var/www/cyanluna-demos/oqc` |
| `eob.cyanluna.com` | `/var/www/cyanluna-demos/eob` |
| `gateway.cyanluna.com` | `/var/www/cyanluna-demos/gateway` |
| `demo.cyanluna.com` | `/var/www/cyanluna-demos/demo` |

Principles:

- expose only `80` and `443` publicly
- serve built frontend files directly from `Nginx`
- avoid backend or DB runtime for the first mock rollout
- use one subdomain per demo

## Rollout Sequence

1. add `cyanluna.com` and `www.cyanluna.com` to Vercel
2. create Cloudflare `@` and `www` records for Vercel
3. confirm the portfolio works on `cyanluna.com`
4. configure Oracle Nginx for static demo hosting
5. upload demo build artifacts to Oracle
6. create `oqc`, `eob`, `gateway`, and `demo` records in Cloudflare
7. validate each demo hostname
8. update portfolio links to point at the final demo URLs

## App Follow-up After Domain Cutover

Once the custom domain is live, update hardcoded site URLs in:

- `src/app/layout.tsx`
- `src/app/sitemap.ts`

Replace:

- `https://cyanlunaportfolio.vercel.app`

With:

- `https://cyanluna.com`

## Validation Checklist

Portfolio:

- `https://cyanluna.com` returns the Vercel-hosted portfolio
- `https://www.cyanluna.com` redirects to `https://cyanluna.com`

Demo hosts:

- each subdomain resolves in Cloudflare
- each subdomain serves the expected static mock demo
- HTTPS succeeds

## Related Docs

- `docs/mock-demo-hosting-design.md`
- `docs/oracle-reverse-proxy-design.md`
- `docs/cloudflare-oracle-security-checklist.md`
- `docs/domain-cutover-runbook.md`

