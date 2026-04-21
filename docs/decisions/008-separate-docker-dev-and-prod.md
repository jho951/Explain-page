# 008. Separate Docker Development And Production Runtime

## Status

Accepted

## Context

The repository previously had a single Docker Compose path that always built and ran the production image shape. That made local container-based development awkward because source mounting, hot reload, and production runtime concerns were mixed together.

## Decision

- `docker/Dockerfile` now exposes distinct `dev` and `runner` targets.
- `docker/docker-compose.dev.yml` runs `next dev` with source bind mounts for local development.
- `docker/docker-compose.prod.yml` builds the standalone production runtime and expects a dedicated `.env.production`.
- `scripts/run.docker.sh` selects the correct compose file through `dev|prod`.

## Consequences

- Local Docker development can use live-reload semantics without changing the production image path.
- Production runtime stays aligned with the existing standalone Next.js build output.
- Operators must provide a separate `.env.production` file before running the production compose path.
