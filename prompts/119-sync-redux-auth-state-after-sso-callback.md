# 119-sync-redux-auth-state-after-sso-callback

- Date: 2026-03-27
- Goal: Ensure UI reflects logged-in state immediately after SSO callback success.
- Core changes: in `AuthCallbackClient`, dispatch `setAuthState({ status: authenticated, initialized: true, user })` after successful exchange/auth-me/user-me sequence.
- Core changes: keep route redirect behavior, but synchronize Redux auth before `router.replace(nextPath)`.
- REQUIREMENTS.md: not updated (bug fix within existing auth flow scope).
