# 192-align-flow-to-conditional-refresh-and-signin-fallback

- Goal: Align auth flow to guide: `exchange -> me -> (401 only) refresh once -> me retry`, and move failure fallback to `/signin`.
- Core changes: callback failures (`error`, missing `ticket`, auth failure) now redirect to `buildStartFrontendSignInUrl(nextPath)` with configured delay (1.5s/1.2s/1.5s).
- Core changes: API refresh failure fallback now redirects to `/signin?next=...` via `buildStartFrontendSignInUrl`.
- Core changes: normalized localhost hosts (`127.0.0.1` -> `localhost`) for gateway/start/callback URLs in security config.
- Preserved behavior: requests keep `credentials: "include"` and global refresh is only used by `/auth/me` fallback path.
- Validation: `npm run typecheck` and `npm run lint` passed.
