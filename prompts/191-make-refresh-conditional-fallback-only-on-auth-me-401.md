# 191-make-refresh-conditional-fallback-only-on-auth-me-401

- Goal: Align auth flow to `exchange -> me -> (401 only) refresh once -> me retry`.
- Core changes: removed global `401 -> refresh -> retry` behavior from `requestGatewayJson` to avoid unconditional refresh loops.
- Core changes: added explicit `refreshGatewaySession()` export from API client.
- Core changes: updated `fetchAuthMe()` to attempt refresh fallback only when first `/v1/auth/me` returns 401 and exchange is completed, then retry `/v1/auth/me` once.
- Failure behavior: if retry still fails, error is propagated to existing login fallback flow.
- Validation: `npm run typecheck` and `npm run lint` passed.
