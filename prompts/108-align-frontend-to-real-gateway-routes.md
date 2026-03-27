# 108 Align Frontend To Real Gateway Routes

- Date: 2026-03-19
- Goal: Match frontend auth/API flow to the actual `jho951/Api-gateway-server` public routes.
- Changes: Switched the auth flow to `/auth/login/github -> /auth/session -> /users/me`, removed default reliance on `/auth/exchange`, `/auth/me`, and `/auth/logout`, and hid logout when the Gateway does not expose a logout route.
- Docs: Updated requirements, implementation docs, README, and ADR to reflect the real Gateway contract.
