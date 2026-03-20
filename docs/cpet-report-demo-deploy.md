# CPET Report Demo Deploy

Last updated: 2026-03-21

## Goal

Publish the standalone Belgium lactate HTML report as a shareable Oracle-hosted static URL:

- `https://demo.cyanluna.com/cpet/report/geunyun-park-belgium-lactate/`

## Repo Paths

- Source report:
  - `/Users/cyanluna-pro16/dev/cpet.db/docs/2026.03.20.Belgium.Lactate,GeunyunPark/report.html`
- Synced artifact:
  - `public/demo/cpet/report/geunyun-park-belgium-lactate/index.html`
- Demo index:
  - `public/demo/index.html`
  - `public/demo/cpet/report/index.html`

## Local Flow

Sync the latest standalone report into the portfolio demo tree:

```bash
cd /Users/cyanluna-pro16/dev/cyanluna.portfolio
pnpm demo:cpet:sync
```

Preview locally with Next:

```bash
pnpm dev
open http://localhost:3000/demo/cpet/report/geunyun-park-belgium-lactate/
```

## Oracle Deploy

Expected Oracle Nginx root:

- `/var/www/cyanluna-demos/demo`

Expected public host:

- `demo.cyanluna.com`

Deploy the static demo tree:

```bash
cd /Users/cyanluna-pro16/dev/cyanluna.portfolio
export ORACLE_DEMO_HOST=<oracle-host>
export ORACLE_DEMO_USER=opc
pnpm demo:cpet:deploy
```

If needed, override destination path:

```bash
export ORACLE_DEMO_DEST=/var/www/cyanluna-demos/demo/
```

## Verification

After deploy:

```bash
curl -I https://demo.cyanluna.com/cpet/report/geunyun-park-belgium-lactate/
curl -I https://demo.cyanluna.com/cpet/report/
curl -I https://demo.cyanluna.com/
```

## Notes

- This flow treats the report as a fully standalone static HTML artifact.
- Query-string routing is intentionally avoided; path-based URLs are simpler for Nginx, caching, and future report additions.
- Additional CPET reports can follow the same pattern under:
  - `public/demo/cpet/report/<slug>/index.html`
