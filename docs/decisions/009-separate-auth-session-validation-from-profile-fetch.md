# 009. Separate browser session validation from profile fetch

## Status

Accepted

## Context

`Explain-page` sits in front of an MSA stack where the browser talks only to `gateway-service`, while session validation and profile lookup remain distinct backend concerns.

Treating `/v1/auth/me` as both "is the browser authenticated?" and "can the profile be loaded?" couples two different boundaries:

- Gateway/Auth session validation
- Auth/User profile summary lookup

That coupling makes the frontend interpret temporary profile lookup failures as full sign-out, and it obscures the real browser contract.

## Decision

The frontend separates the two steps:

- Callback flow validates `ticket -> /v1/auth/exchange -> /v1/auth/session -> redirect`.
- App bootstrap validates `/v1/auth/session` before requesting `/v1/auth/me`.
- Redux auth status is derived from session validation, not from profile payload shape.
- `/v1/auth/me` remains a profile lookup and may fail independently from a still-valid session.

## Consequences

- Frontend auth decisions follow the Gateway browser-session contract more closely.
- A valid Gateway session can remain `authenticated` even when profile lookup temporarily fails.
- Sign-in and callback documentation must describe session confirmation separately from profile loading.
- Backend contract docs that still describe `exchange -> /v1/auth/me` as the sole session confirmation step should be updated together.
