#!/usr/bin/env bash
# One-shot deploy for a fresh Hostinger Docker VPS (Ubuntu 24.04 + Docker).
# Usage:  bash deploy.sh
set -euo pipefail

REPO="https://github.com/2026Pacewalk/travokart.git"
BRANCH="redesign/travokart-static"
APPDIR="/opt/travokart"

echo ">> Ensuring git + docker compose are available..."
command -v git >/dev/null || (apt-get update -y && apt-get install -y git)
docker compose version >/dev/null

echo ">> Fetching source..."
if [ -d "$APPDIR/.git" ]; then
  git -C "$APPDIR" fetch origin "$BRANCH"
  git -C "$APPDIR" checkout "$BRANCH"
  git -C "$APPDIR" reset --hard "origin/$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO" "$APPDIR"
fi

cd "$APPDIR/deploy"

if [ ! -f .env ]; then
  echo ">> Creating .env with a random SESSION_SECRET..."
  SECRET="$(openssl rand -hex 32)"
  cat > .env <<EOF
DOMAIN=travokart.com
ACME_EMAIL=hellopacewalk@gmail.com
ADMIN_EMAIL=admin@travokart.com
ADMIN_PASSWORD=Travokart@2025
SESSION_SECRET=${SECRET}
EOF
fi

echo ">> Freeing ports 80/443 (stopping any prior Traefik that isn't ours)..."
# If Hostinger's template started its own Traefik, stop it so ours can bind 80/443.
for c in $(docker ps --format '{{.Names}} {{.Ports}}' | awk '/:80->|:443->/{print $1}'); do
  case "$c" in
    travokart_traefik) : ;;                 # keep ours
    *) echo "   stopping $c"; docker stop "$c" >/dev/null || true ;;
  esac
done

echo ">> Building and starting..."
docker compose up -d --build

echo ">> Done. Containers:"
docker compose ps
