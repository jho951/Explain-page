#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.yml"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker command not found."
  exit 1
fi

if [[ ! -f "$ROOT_DIR/.env.local" ]]; then
  echo ".env.local not found at $ROOT_DIR/.env.local"
  exit 1
fi

if docker ps -a --format '{{.Names}}' | grep -qx 'explain-page'; then
  docker rm -f explain-page >/dev/null
fi

docker compose -f "$COMPOSE_FILE" up --build -d
docker compose -f "$COMPOSE_FILE" ps

echo
echo "App is running in Docker: http://localhost:3000"
