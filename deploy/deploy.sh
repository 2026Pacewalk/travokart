#!/usr/bin/env bash
# Deploy Travokart onto a Hostinger "Docker + Traefik" VPS.
# Attaches the app to the VPS's existing Traefik (certresolver "letsencrypt").
# Usage:  bash deploy.sh
set -euo pipefail

REPO="https://github.com/2026Pacewalk/travokart.git"
BRANCH="redesign/travokart-static"
APPDIR="/opt/travokart"

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
  cat > .env <<EOF
DOMAIN=travokart.com
ACME_EMAIL=hellopacewalk@gmail.com
ADMIN_EMAIL=admin@travokart.com
ADMIN_PASSWORD=Travokart@2025
SESSION_SECRET=$(openssl rand -hex 32)
EOF
fi

echo ">> Building and starting the app (Traefik already runs on the host)..."
docker compose up -d --build

echo ">> Containers:"
docker compose ps
echo ">> Give it ~60s to compile, then it will be reachable via Traefik."
