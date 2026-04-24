# 010. Run EC2 as image-only runtime with deploy bundle

## Status

Accepted

## Context

The team does not want EC2 instances to clone the application repository and execute source-aware workflows there.

Instead, EC2 should behave as a thin runtime host:

- pull a prebuilt image from a registry
- read a small deployment env file
- run compose and nginx only

That requires the repository to publish a deployment bundle that is smaller and more operationally stable than the full source tree.

## Decision

- The repository keeps local Docker validation paths under `docker/` for dev and local prod checks.
- A separate EC2 deployment bundle lives under `deploy/ec2/`.
- EC2 deployment uses:
  - `deploy/ec2/docker-compose.yml`
  - `deploy/ec2/.env`
  - `deploy/ec2/nginx/default.conf`
- EC2 pulls a prebuilt image (`EXPLAIN_PAGE_IMAGE`) instead of building from source.
- Nginx fronts the app container and proxies port 80 to the Next.js runtime on port 3000.

## Consequences

- EC2 no longer needs the full app repository to deploy this frontend.
- Build and runtime concerns are more clearly separated.
- Operators must keep the deploy bundle and registry image tag in sync.
- Deployment documentation must distinguish:
  - local repo-based prod validation
  - EC2 runtime deployment from the deploy bundle
