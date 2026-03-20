#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEFAULT_SOURCE="/Users/cyanluna-pro16/dev/cpet.db/docs/2026.03.20.Belgium.Lactate,GeunyunPark/report.html"
REPORT_SOURCE="${1:-${CPET_REPORT_SOURCE:-$DEFAULT_SOURCE}}"
REPORT_SLUG="${CPET_REPORT_SLUG:-geunyun-park-belgium-lactate}"
REPORT_TITLE="${CPET_REPORT_TITLE:-Geunyun Park Belgium Lactate Report}"
TARGET_DIR="$ROOT_DIR/public/demo/cpet/report/$REPORT_SLUG"
INDEX_DIR="$ROOT_DIR/public/demo/cpet/report"
DEMO_INDEX="$ROOT_DIR/public/demo/index.html"

if [ ! -f "$REPORT_SOURCE" ]; then
  echo "Missing source report: $REPORT_SOURCE" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR" "$INDEX_DIR" "$(dirname "$DEMO_INDEX")"
cp "$REPORT_SOURCE" "$TARGET_DIR/index.html"

cat > "$INDEX_DIR/index.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CPET Reports</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #0d1419;
      --panel: #12212a;
      --line: rgba(255,255,255,0.08);
      --text: #eef2f4;
      --muted: #9fb1bc;
      --accent: #6fd4c4;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      font-family: "Avenir Next", "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top, rgba(111,212,196,0.12), transparent 32%),
        linear-gradient(180deg, #0b1217, var(--bg));
      color: var(--text);
    }
    main {
      width: min(720px, 100%);
      padding: 28px;
      border-radius: 24px;
      background: rgba(18, 33, 42, 0.88);
      border: 1px solid var(--line);
      box-shadow: 0 24px 64px rgba(0,0,0,0.28);
    }
    h1 {
      margin: 0 0 8px;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
    }
    p {
      margin: 0 0 20px;
      color: var(--muted);
      line-height: 1.6;
    }
    a {
      display: block;
      padding: 16px 18px;
      border-radius: 18px;
      text-decoration: none;
      color: var(--text);
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--line);
    }
    a strong {
      display: block;
      margin-bottom: 6px;
      color: var(--accent);
    }
  </style>
</head>
<body>
  <main>
    <h1>CPET Report Library</h1>
    <p>Oracle demo host static reports. Share the detail URL directly for a standalone viewer.</p>
    <a href="./$REPORT_SLUG/">
      <strong>$REPORT_TITLE</strong>
      /cpet/report/$REPORT_SLUG/
    </a>
  </main>
</body>
</html>
EOF

cat > "$DEMO_INDEX" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CyanLuna Demo Index</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #091015;
      --panel: #122029;
      --line: rgba(255,255,255,0.08);
      --text: #eef2f4;
      --muted: #9ab0bc;
      --accent: #d9a85b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      padding: 24px;
      font-family: "Avenir Next", "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(217,168,91,0.18), transparent 28%),
        radial-gradient(circle at bottom right, rgba(111,212,196,0.16), transparent 28%),
        linear-gradient(180deg, #060b0f, var(--bg));
      color: var(--text);
    }
    main {
      width: min(920px, 100%);
      margin: 0 auto;
      padding: 28px;
      border-radius: 26px;
      background: rgba(18, 32, 41, 0.84);
      border: 1px solid var(--line);
    }
    h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 5vw, 3.2rem);
    }
    p {
      margin: 0 0 24px;
      color: var(--muted);
      line-height: 1.65;
      max-width: 64ch;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    a {
      padding: 18px;
      border-radius: 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--line);
      text-decoration: none;
      color: var(--text);
      transition: transform 160ms ease, border-color 160ms ease;
    }
    a:hover {
      transform: translateY(-2px);
      border-color: rgba(255,255,255,0.18);
    }
    a strong {
      display: block;
      margin-bottom: 6px;
      color: var(--accent);
    }
  </style>
</head>
<body>
  <main>
    <h1>CyanLuna Demo Host</h1>
    <p>Standalone public demos and reports served from the Oracle static host.</p>
    <div class="grid">
      <a href="./cpet/report/$REPORT_SLUG/">
        <strong>CPET Report</strong>
        $REPORT_TITLE
      </a>
    </div>
  </main>
</body>
</html>
EOF

echo "Synced CPET report to $TARGET_DIR/index.html"
