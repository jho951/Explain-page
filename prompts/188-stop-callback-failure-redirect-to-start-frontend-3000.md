# 188-stop-callback-failure-redirect-to-start-frontend-3000

- Goal: Prevent callback failure paths from redirecting to start frontend (`:3000`) when consumer callback is on `:5173`.
- Root cause: `AuthCallbackClient` used `buildStartFrontendSignInUrl`, which targets `NEXT_PUBLIC_START_FRONTEND_URL`.
- Core changes: replaced callback restart URL with Gateway SSO start URL (`/v1/auth/sso/start`) using `redirect_uri=AUTH_CONSUMER_CALLBACK_URL` and `page=AUTH_LOGIN_PAGE`.
- Behavior: callback error/missing ticket/auth-me failure now restart via Gateway -> return to consumer callback flow, instead of hard redirecting to `:3000`.
- REQUIREMENTS.md: not updated (bug fix within existing auth callback flow).
