# 114-switch-login-start-to-v1-path

- Date: 2026-03-27
- Goal: Route SSO login start to Gateway v1 path (`/v1/auth/sso/start?...`).
- Core changes: updated default `AUTH_LOGIN_PATH` to `/v1/auth/sso/start`.
- Compatibility change: expanded gateway path allowlist to include `/v1/*` API prefixes so path validation does not block login URL construction.
- REQUIREMENTS.md: not updated (existing auth flow scope, path alignment bug fix).
