# 007. Switch frontend auth to cookie-based session handling

## Status

Accepted

## Context

The frontend previously stored access tokens in `localStorage` and mirrored them into `Authorization` headers for Gateway calls. That approach made the session model split across browser storage and cookies.

## Decision

The frontend now treats authentication as cookie-based:

- Gateway requests keep `credentials: "include"`.
- The frontend no longer persists access tokens in `localStorage`.
- Session state is derived from `/v1/auth/me` and server-issued cookies.

## Consequences

- The backend must issue cookies that the browser can send back to Gateway.
- Logout must be handled by the server logout endpoint so httpOnly cookies can be cleared.
- The frontend no longer depends on `Authorization: Bearer ...` for normal session calls.
