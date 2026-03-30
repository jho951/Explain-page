# 196-migrate-auth-to-cookie-session

- Goal: Remove localStorage-based access token handling and rely on server-issued cookies for auth/session calls.
- Changes: Removed Authorization header injection and token persistence from the frontend API client.
- Changes: Updated auth bootstrap and header logic to derive auth state from `/v1/auth/me` only.
- Notes: Documented the cookie-based session model in README and ADR `docs/decisions/007-cookie-based-session-auth.md`.
