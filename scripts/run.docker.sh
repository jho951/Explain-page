#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-dev}"
ACTION="${2:-up}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker command not found."
  exit 1
fi

case "$MODE" in
  dev)
    COMPOSE_FILES=(-f "$ROOT_DIR/docker/docker-compose.dev.yml")
    BUILD_FILES=(-f "$ROOT_DIR/docker/docker-compose.dev.yml")
    ENV_FILE="$ROOT_DIR/.env.local"
    CONTAINER_NAME="explain-page-dev"
    HOST_PORT="${EXPLAIN_PAGE_DEV_PORT:-3000}"
    ;;
  prod)
    COMPOSE_FILES=(-f "$ROOT_DIR/docker/docker-compose.prod.yml")
    BUILD_FILES=(-f "$ROOT_DIR/docker/docker-compose.build.yml")
    ENV_FILE="$ROOT_DIR/.env.production"
    CONTAINER_NAME="explain-page-prod"
    HOST_PORT="${EXPLAIN_PAGE_PROD_PORT:-3000}"
    ;;
  *)
    echo "Unsupported mode: $MODE"
    echo "Usage: ./scripts/run.docker.sh [dev|prod] [up|down|build|logs|restart|ps]"
    exit 1
    ;;
esac

compose() {
  docker compose "${COMPOSE_FILES[@]}" "$@"
}

build_compose() {
  docker compose "${BUILD_FILES[@]}" "$@"
}

case "$ACTION" in
  up)
    if [[ ! -f "$ENV_FILE" ]]; then
      echo "Environment file not found at $ENV_FILE"
      exit 1
    fi
    if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
      docker rm -f "$CONTAINER_NAME" >/dev/null
    fi
    if [[ "$MODE" == "dev" ]]; then
      compose up --build -d
    else
      compose pull
      compose up -d
    fi
    compose ps
    echo
    echo "App is running in Docker ($MODE): http://localhost:$HOST_PORT"
    ;;
  down)
    compose down --remove-orphans
    ;;
  build)
    build_compose build
    ;;
  logs)
    compose logs -f
    ;;
  restart)
    compose restart
    ;;
  ps)
    compose ps
    ;;
  *)
    echo "Usage: ./scripts/run.docker.sh [dev|prod] [up|down|build|logs|restart|ps]"
    exit 1
    ;;
esac
