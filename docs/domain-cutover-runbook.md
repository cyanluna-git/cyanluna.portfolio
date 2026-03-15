# Domain Cutover Runbook

Last updated: 2026-03-15
Task: `#943` domain cutover execution checklist and validation

## Goal

Provide a safe rollout procedure for:

- moving the portfolio domain to `cyanluna.com`
- exposing Oracle-hosted static mock demos on subdomains

## Target End State

Portfolio:

- `https://cyanluna.com` -> Vercel portfolio
- `https://www.cyanluna.com` -> 308 redirect to `https://cyanluna.com`

Demos:

- `https://oqc.cyanluna.com` -> Oracle static mock demo
- `https://eob.cyanluna.com` -> Oracle static mock demo
- `https://gateway.cyanluna.com` -> Oracle static mock demo
- `https://demo.cyanluna.com` -> Oracle demo index

## Before You Start

Collect:

- `<ORACLE_PUBLIC_IP>`
- `<ADMIN_CIDR>`
- Oracle SSH access
- Vercel access for project `cyanluna.portfolio`
- Cloudflare access for zone `cyanluna.com`

## Preflight Checklist

- [ ] Vercel project is linked locally
- [ ] Oracle Nginx config is prepared
- [ ] Cloudflare Origin CA certificate is ready for Oracle
- [ ] OCI NSG rules are ready
- [ ] host firewall policy is ready
- [ ] current portfolio remains reachable at `https://cyanlunaportfolio.vercel.app`

## Phase 1: Vercel Domain Attach

### Step 1. Add domains to Vercel

```bash
cd /Users/cyanluna-pro16/dev/cyanluna.portfolio
vercel domains add cyanluna.com cyanluna.portfolio
vercel domains add www.cyanluna.com cyanluna.portfolio
vercel domains inspect cyanluna.com
vercel domains inspect www.cyanluna.com
```

## Phase 2: Oracle Static Demo Preparation

### Step 2. Install the Cloudflare Origin CA certificate on Oracle

Place:

- `/etc/ssl/cyanluna/origin-cert.pem`
- `/etc/ssl/cyanluna/origin-key.pem`

### Step 3. Create demo directories

```bash
sudo mkdir -p /var/www/cyanluna-demos/{oqc,eob,gateway,demo}
sudo chown -R $USER:$(id -gn) /var/www/cyanluna-demos
```

### Step 4. Upload static build artifacts

Copy each demo build output into its target directory.

### Step 5. Configure Nginx virtual hosts

Apply the config from `docs/oracle-reverse-proxy-design.md`.

Check:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6. Verify Oracle local routing before public DNS

```bash
curl -I -H "Host: oqc.cyanluna.com" http://127.0.0.1
curl -I -H "Host: eob.cyanluna.com" http://127.0.0.1
curl -I -H "Host: gateway.cyanluna.com" http://127.0.0.1
```

## Phase 3: Oracle Security Posture

### Step 7. Apply OCI NSG and host firewall rules

Target public policy:

- allow `443/tcp`
- allow `22/tcp` only from `<ADMIN_CIDR>`
- keep `80/tcp` closed in steady state if Cloudflare handles redirects

Check:

```bash
sudo ss -tulpn | grep -E ':22|:80|:443'
```

## Phase 4: Cloudflare DNS for Portfolio

### Step 8. Create Vercel DNS records in Cloudflare

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | `DNS only` |
| `CNAME` | `www` | `cname.vercel-dns-0.com` or Vercel-provided value | `DNS only` |

Public test:

```bash
curl -I https://cyanluna.com
curl -I https://www.cyanluna.com
```

## Phase 5: Canonical Redirect

### Step 9. Set `www` -> apex redirect

Public test:

```bash
curl -I https://www.cyanluna.com
```

## Phase 6: Cloudflare DNS for Oracle Demos

### Step 10. Create Oracle demo records

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| `A` | `oqc` | `<ORACLE_PUBLIC_IP>` | `Proxied` |
| `A` | `eob` | `<ORACLE_PUBLIC_IP>` | `Proxied` |
| `A` | `gateway` | `<ORACLE_PUBLIC_IP>` | `Proxied` |
| `A` | `demo` | `<ORACLE_PUBLIC_IP>` | `Proxied` |

Public test:

```bash
curl -I https://oqc.cyanluna.com
curl -I https://eob.cyanluna.com
curl -I https://gateway.cyanluna.com
```

## Phase 7: Portfolio Metadata Update

### Step 11. Update hardcoded site URLs

Files:

- `src/app/layout.tsx`
- `src/app/sitemap.ts`

Replace:

- `https://cyanlunaportfolio.vercel.app`

With:

- `https://cyanluna.com`

## Rollback Strategy

Portfolio rollback:

1. revert Cloudflare `@` and `www` records
2. keep using `https://cyanlunaportfolio.vercel.app`

Demo rollback:

1. delete or disable `oqc`, `eob`, `gateway`, `demo` records
2. keep Oracle files and Nginx config in place for later retry

## Final Sign-Off Checklist

- [ ] `cyanluna.com` serves the Vercel portfolio
- [ ] `www.cyanluna.com` redirects to apex
- [ ] `oqc.cyanluna.com` serves OQC mock demo
- [ ] `eob.cyanluna.com` serves EOB mock demo
- [ ] `gateway.cyanluna.com` serves Gateway mock demo
- [ ] Cloudflare demo records are `Proxied`
- [ ] Cloudflare SSL/TLS is `Full (strict)`
- [ ] Oracle exposes only intended public ports

