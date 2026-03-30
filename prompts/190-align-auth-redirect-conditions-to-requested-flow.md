# 190-align-auth-redirect-conditions-to-requested-flow

- Goal: Force auth redirect behavior to match requested 6-condition flow.
- Core changes: `AuthGate` now redirects unauthenticated protected-route access using `buildSsoStartUrl(nextPath)` under `initialized === true && status !== "loading" && !isAuthenticated`.
- Core changes: `/signin` route behavior is enforced from `SignInTemplate` via `window.location.replace(buildStartFrontendSignInUrl(nextPath))`.
- Core changes: `/auth/callback` now auto-redirects to `buildStartFrontendSignInUrl(nextPath)` on missing ticket (1.2s) and callback/auth error (1.5s).
- Core changes: API 401->refresh failure now redirects directly to `buildStartFrontendSignInUrl(nextPath)` in client API error handler.
- Validation: typecheck and lint passed.
