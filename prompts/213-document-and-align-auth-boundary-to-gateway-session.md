# 213-document-and-align-auth-boundary-to-gateway-session

- Date: 2026-04-23
- Goal: Document the current Gateway/Auth contract clearly and align callback/bootstrap auth flow to the backend session boundary.
- Changes: Updated callback to validate `exchange -> /auth/session -> redirect` and left profile loading to app bootstrap.
- Changes: Updated README, REQUIREMENTS, sign-in copy, and ADRs to separate browser session validation from `/auth/me` profile lookup.
- Findings: Backend contract/docs still contain mixed descriptions around `exchange -> /auth/me` and `ACCESS_TOKEN` vs `sso_session` browser precedence, so those repos need follow-up updates too.
