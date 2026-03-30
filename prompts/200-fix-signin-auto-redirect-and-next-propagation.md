# 200-fix-signin-auto-redirect-and-next-propagation

- Date: 2026-03-30
- Goal: Fix `/signin?next=%2F` so the frontend actually advances into Gateway login without requiring a manual click.
- Changes: `SignInTemplate` now auto-redirects anonymous users to Gateway after auth bootstrap finishes, and `getGatewayLoginUrl(nextPath)` now sends `next` through the callback redirect URI.
- Notes: This is a local auth-flow bug fix; no REQUIREMENTS or ADR update was needed.
