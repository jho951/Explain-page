# 211-document-current-auth-structure-for-redux-vs-cookie-flow

- Date: 2026-04-23
- Goal: Inspect the current frontend auth/session structure and compare it to a Redux `accessToken` + Bearer header plan.
- Findings: The app currently uses cookie-based session auth, global `credentials: "include"` requests, and `/v1/auth/me` driven auth bootstrap.
- Findings: Redux stores auth session shape (`user/status/initialized/error`) only; it does not store an access token.
- Findings: Refresh is not executed as a generic app-wide token restore; it is a conditional fallback from `/v1/auth/me` after a 401 when auth exchange was previously completed.
