# 2026-04-24 Add EC2 deploy bundle and deployment docs

- Goal: support an EC2 runtime model where the server does not clone the app repository and only keeps deploy compose/env/nginx assets.
- Cause: operations want EC2 to behave as an image-only runtime host instead of a source-based deployment target.
- Change: added `deploy/ec2` with compose, env example, and nginx config, and updated README, REQUIREMENTS, runbook, and ADR docs to describe the new deployment model.
- Scope: `deploy/ec2/**`, `README.md`, `docs/REQUIREMENTS.md`, `docs/runbook/DEBUG.md`, `docs/decisions/010-run-ec2-as-image-only-runtime.md`.
