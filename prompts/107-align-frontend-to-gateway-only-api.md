# 107 Align Frontend To Gateway Only API

- Date: 2026-03-19
- Goal: Rework frontend API access so the browser only calls the Gateway domain and never internal MSA addresses.
- Changes: Added Gateway API client modules (`api/auth.ts`, `api/user.ts`, `api/block.ts`, `api/permission.ts`) and moved auth flow to Gateway-based endpoints.
- Docs: Updated `docs/REQUIREMENTS.md`, `docs/SSO_SESSION_FRONTEND_IMPLEMENTATION.md`, and `README.md` to reflect the Gateway-only contract.
