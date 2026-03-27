# 117-force-logout-redirect-to-localhost3000-and-clear-token

- Date: 2026-03-27
- Goal: On logout, always clear auth token and redirect to `http://localhost:3000`.
- Core changes: `logoutAuthSession` now clears stored access token in `finally` so token is removed even when logout API fails.
- Core changes: header logout handler now redirects with `window.location.replace('http://localhost:3000')` after auth state cleanup.
- REQUIREMENTS.md: not updated (auth flow behavior alignment within current scope).
