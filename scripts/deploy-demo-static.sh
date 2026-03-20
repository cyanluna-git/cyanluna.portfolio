#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${DEMO_STATIC_SOURCE:-$ROOT_DIR/public/demo/}"
DEST_ROOT="${ORACLE_DEMO_DEST:-/var/www/cyanluna-demos/demo/}"
HOST="${ORACLE_DEMO_HOST:-}"
USER_NAME="${ORACLE_DEMO_USER:-opc}"
SSH_PORT="${ORACLE_DEMO_PORT:-22}"
SSH_IDENTITY="${ORACLE_DEMO_IDENTITY:-}"
REMOTE="${USER_NAME}@${HOST}:${DEST_ROOT}"
SSH_CMD=(ssh -p "$SSH_PORT")

if [ -z "$HOST" ]; then
  echo "Set ORACLE_DEMO_HOST before deploying." >&2
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Missing source directory: $SOURCE_DIR" >&2
  exit 1
fi

if [ -n "$SSH_IDENTITY" ]; then
  SSH_CMD+=(-i "$SSH_IDENTITY")
fi

rsync -avz --delete -e "${SSH_CMD[*]}" "$SOURCE_DIR" "$REMOTE"

echo "Deployed demo static files to $REMOTE"
