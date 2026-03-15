# Oracle Reverse Proxy Design

Last updated: 2026-03-15
Task: `#946` Oracle reverse proxy subdomain routing

## Goal

Serve multiple Oracle-hosted mock demos behind a single public `80/443` entrypoint, using subdomain-based routing and direct static file serving from `Nginx`.

Primary recommendation: `Nginx`

## Demo Topology

| Demo | Public Host | Nginx Root |
| --- | --- | --- |
| OQC | `oqc.cyanluna.com` | `/var/www/cyanluna-demos/oqc` |
| EOB | `eob.cyanluna.com` | `/var/www/cyanluna-demos/eob` |
| Gateway | `gateway.cyanluna.com` | `/var/www/cyanluna-demos/gateway` |
| Demo Index | `demo.cyanluna.com` | `/var/www/cyanluna-demos/demo` |

Recommendation:

- expose only `Nginx` on public `80/443`
- serve static assets directly from `Nginx`
- use SPA fallback to `index.html` if the mock app uses client-side routing

## Recommended Oracle Host Layout

```text
/etc/nginx/
  nginx.conf
  sites-available/
    cyanluna-demos.conf
  sites-enabled/
    cyanluna-demos.conf -> ../sites-available/cyanluna-demos.conf

/etc/ssl/cyanluna/
  origin-cert.pem
  origin-key.pem

/var/www/cyanluna-demos/
  oqc/
  eob/
  gateway/
  demo/

/var/log/nginx/
  oqc.access.log
  oqc.error.log
  eob.access.log
  eob.error.log
  gateway.access.log
  gateway.error.log
```

## Nginx Configuration

### OQC Virtual Host

```nginx
server {
    listen 80;
    server_name oqc.cyanluna.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name oqc.cyanluna.com;

    ssl_certificate     /etc/ssl/cyanluna/origin-cert.pem;
    ssl_certificate_key /etc/ssl/cyanluna/origin-key.pem;

    root /var/www/cyanluna-demos/oqc;
    index index.html;

    access_log /var/log/nginx/oqc.access.log;
    error_log  /var/log/nginx/oqc.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### EOB Virtual Host

```nginx
server {
    listen 80;
    server_name eob.cyanluna.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name eob.cyanluna.com;

    ssl_certificate     /etc/ssl/cyanluna/origin-cert.pem;
    ssl_certificate_key /etc/ssl/cyanluna/origin-key.pem;

    root /var/www/cyanluna-demos/eob;
    index index.html;

    access_log /var/log/nginx/eob.access.log;
    error_log  /var/log/nginx/eob.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Gateway Virtual Host

```nginx
server {
    listen 80;
    server_name gateway.cyanluna.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name gateway.cyanluna.com;

    ssl_certificate     /etc/ssl/cyanluna/origin-cert.pem;
    ssl_certificate_key /etc/ssl/cyanluna/origin-key.pem;

    root /var/www/cyanluna-demos/gateway;
    index index.html;

    access_log /var/log/nginx/gateway.access.log;
    error_log  /var/log/nginx/gateway.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Demo Index Virtual Host

```nginx
server {
    listen 80;
    server_name demo.cyanluna.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name demo.cyanluna.com;

    ssl_certificate     /etc/ssl/cyanluna/origin-cert.pem;
    ssl_certificate_key /etc/ssl/cyanluna/origin-key.pem;

    root /var/www/cyanluna-demos/demo;
    index index.html;

    access_log /var/log/nginx/demo.access.log;
    error_log  /var/log/nginx/demo.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Deployment Steps

### 1. Install Nginx

```bash
sudo dnf install -y nginx
sudo systemctl enable --now nginx
```

Use `apt-get` instead of `dnf` on Ubuntu.

### 2. Create static directories

```bash
sudo mkdir -p /var/www/cyanluna-demos/{oqc,eob,gateway,demo}
sudo chown -R $USER:$(id -gn) /var/www/cyanluna-demos
```

### 3. Place the config

```bash
sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
sudo vi /etc/nginx/sites-available/cyanluna-demos.conf
sudo ln -s /etc/nginx/sites-available/cyanluna-demos.conf /etc/nginx/sites-enabled/cyanluna-demos.conf
```

### 4. Validate and reload

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl status nginx --no-pager
```

## Deploy Shape

Recommended per-demo deploy flow:

```bash
pnpm build
rsync -avz dist/ oracle:/var/www/cyanluna-demos/oqc/
sudo nginx -t
sudo systemctl reload nginx
```

Replace `dist/` with the actual frontend build output directory.

## Smoke Tests

Host-based validation before DNS cutover:

```bash
curl -I -H "Host: oqc.cyanluna.com" http://127.0.0.1
curl -I -H "Host: eob.cyanluna.com" http://127.0.0.1
curl -I -H "Host: gateway.cyanluna.com" http://127.0.0.1
```

After Cloudflare DNS is live:

```bash
curl -I https://oqc.cyanluna.com
curl -I https://eob.cyanluna.com
curl -I https://gateway.cyanluna.com
```

## Operational Rules

- keep each demo as build artifacts plus static assets
- do not introduce backend services unless required
- keep one log file per host for easier incident isolation
- reload Nginx after config changes, do not restart unless needed
- use `try_files ... /index.html` for SPA route fallback

## Sources

- Nginx beginner guide: https://nginx.org/en/docs/beginners_guide.html
- Nginx static content guide: https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/

