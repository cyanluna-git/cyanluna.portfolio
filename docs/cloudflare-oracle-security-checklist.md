# Cloudflare + Oracle Security Checklist

Last updated: 2026-03-15
Task: `#944` Oracle security rules and SSL/TLS operations

## Goal

Define the minimum-safe network and TLS posture for serving Oracle-hosted static mock demos behind Cloudflare.

## Security Model

```text
Visitor
  -> Cloudflare edge certificate
  -> Cloudflare proxy
  -> Oracle origin certificate
  -> Nginx
  -> static frontend files
```

Target state:

- portfolio apex stays on Vercel
- Oracle only serves demo subdomains
- Cloudflare proxied DNS is enabled for Oracle-bound subdomains
- Cloudflare SSL/TLS mode is `Full (strict)`
- public traffic reaches only `443`

## Primary Recommendations

### 1. Prefer OCI NSGs over subnet-wide security lists

Use an instance-level NSG where possible.

### 2. Use Cloudflare Origin CA on Oracle

For the Oracle origin, use a Cloudflare Origin CA certificate and set the zone SSL/TLS mode to `Full (strict)`.

### 3. Redirect HTTP at Cloudflare

Enable Cloudflare `Always Use HTTPS` at the edge.

### 4. Keep Oracle simple

Expose only `Nginx`.

Do not add backend or DB ports to the public surface for mock demos.

## Network Policy

### Public inbound policy

| Port | Source | Required | Why |
| --- | --- | --- | --- |
| `443/tcp` | `0.0.0.0/0` | Yes | HTTPS from Cloudflare to origin |
| `80/tcp` | `0.0.0.0/0` | Optional | Temporary bootstrap only |
| `22/tcp` | Your admin IP or VPN CIDR only | Yes | SSH administration |

Target steady state:

- `443/tcp` open
- `22/tcp` restricted
- `80/tcp` closed if Cloudflare `Always Use HTTPS` is handling redirects

### OCI NSG rules

Ingress:

- allow `TCP 443` from `0.0.0.0/0`
- allow `TCP 22` from `<ADMIN_CIDR>`
- optionally allow `TCP 80` during bootstrap only

## Host Firewall Policy

### Oracle Linux / RHEL with `firewalld`

```bash
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --remove-service=http
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="<ADMIN_CIDR>" service name="ssh" accept'
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

### Process binding check

Validate that only Nginx and SSH are listening publicly:

```bash
sudo ss -tulpn | grep -E ':22|:80|:443'
```

Desired result:

- `0.0.0.0:443` or `*:443` for Nginx
- `0.0.0.0:22` only if SSH is intentionally public

## Cloudflare SSL/TLS Settings

Required settings:

- SSL/TLS mode: `Full (strict)`
- DNS proxy: `Proxied`
- Always Use HTTPS: `On`

Install on Oracle:

- certificate: `/etc/ssl/cyanluna/origin-cert.pem`
- private key: `/etc/ssl/cyanluna/origin-key.pem`

Important limitation:

- if a proxied demo record is switched to `DNS only`, browsers may see certificate trust errors with Origin CA

## Common Issues

### Redirect loops (ERR_TOO_MANY_REDIRECTS)

Cause: Cloudflare SSL/TLS mode is set to `Flexible` while the origin forces HTTPS via Nginx redirect. Cloudflare connects to origin on port 80, origin redirects to HTTPS, Cloudflare downgrades back to HTTP — infinite loop.

Fix: set SSL/TLS mode to `Full (strict)` and ensure Nginx listens on 443 with a valid origin certificate. Remove any HTTP-to-HTTPS redirect in Nginx when Cloudflare `Always Use HTTPS` handles it at the edge.

### Certificate trust errors

Cause: Cloudflare Origin CA certificates are only trusted by Cloudflare's edge. If the DNS record is switched to `DNS only` (grey cloud), browsers connect directly to the origin and reject the untrusted cert.

Fix: always keep Oracle-bound records `Proxied` (orange cloud). If direct access is needed for debugging, use a Let's Encrypt certificate instead or connect via SSH tunnel.

### WebSocket connection failures

Cause: WebSocket upgrade requests require Cloudflare to proxy the `Upgrade: websocket` header. If a firewall rule or Cloudflare WAF rule strips the header, the handshake fails with HTTP 400/403.

Fix:
- Ensure the Cloudflare zone has WebSocket support enabled (available on all plans)
- In Nginx, configure the upstream proxy to pass upgrade headers:

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:<APP_PORT>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
}
```

- Confirm OCI NSG allows the same port (443) — WebSocket runs over the existing HTTPS connection

## Post-Apply Verification

### 1. Verify Cloudflare settings

```bash
# check DNS record is proxied (should return Cloudflare IP, not Oracle IP)
dig +short demo.cyanluna.com

# check SSL certificate chain from edge
curl -vI https://demo.cyanluna.com 2>&1 | grep -E 'issuer|subject|SSL'
```

### 2. Verify origin connectivity

```bash
# from the Oracle instance — confirm Nginx is listening on 443
sudo ss -tulpn | grep -E ':443|:22'

# confirm origin certificate validity
openssl x509 -in /etc/ssl/cyanluna/origin-cert.pem -noout -dates -subject

# test HTTPS handshake locally
curl -vI --resolve demo.cyanluna.com:443:127.0.0.1 https://demo.cyanluna.com 2>&1 | grep -E 'HTTP/|SSL'
```

### 3. Verify firewall rules

```bash
# OCI NSG rules (via OCI CLI)
oci network nsg rules list --nsg-id <NSG_OCID> --output table

# host firewall
sudo firewall-cmd --list-all

# confirm no unexpected ports are exposed
sudo ss -tulpn | grep LISTEN
```

### 4. Verify no redirect loop

```bash
# should return 200, not 301/302 chain
curl -sI -L https://demo.cyanluna.com | grep -E 'HTTP/|Location:'
```

### 5. Verify WebSocket (if applicable)

```bash
# requires wscat (npm install -g wscat)
wscat -c wss://demo.cyanluna.com/ws/
```

## Rollout Checklist

- [ ] Cloudflare Oracle-bound DNS records are `Proxied`
- [ ] Cloudflare SSL/TLS mode is `Full (strict)`
- [ ] Cloudflare `Always Use HTTPS` is enabled
- [ ] Cloudflare Origin CA certificate is installed on Oracle
- [ ] Oracle Nginx serves `443`
- [ ] OCI NSG allows `443` and restricted `22`
- [ ] no unnecessary app or DB ports are exposed

## Sources

- Cloudflare Full / Full (strict): https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/
- Cloudflare Origin CA: https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/
- Cloudflare Always Use HTTPS: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/
- Oracle NSGs: https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/networksecuritygroups.htm

