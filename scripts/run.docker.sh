#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-dev}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker command not found."
  exit 1
fi

case "$MODE" in
  dev)
    COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.dev.yml"
    ENV_FILE="$ROOT_DIR/.env.local"
    CONTAINER_NAME="explain-page-dev"
    HOST_PORT="${EXPLAIN_PAGE_DEV_PORT:-3000}"
    ;;
  prod)
    COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.prod.yml"
    ENV_FILE="$ROOT_DIR/.env.production"
    CONTAINER_NAME="explain-page-prod"
    HOST_PORT="${EXPLAIN_PAGE_PROD_PORT:-3000}"
    ;;
  *)
    echo "Unsupported mode: $MODE"
    echo "Usage: ./scripts/run.docker.sh [dev|prod]"
    exit 1
    ;;
esac

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found at $ENV_FILE"
  exit 1
fi

if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  docker rm -f "$CONTAINER_NAME" >/dev/null
fi

docker compose -f "$COMPOSE_FILE" up --build -d
docker compose -f "$COMPOSE_FILE" ps

echo
echo "App is running in Docker ($MODE): http://127.0.0.1:$HOST_PORT"
