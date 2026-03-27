# 115-align-callback-exchange-me-to-v1-and-verify-flow

- Date: 2026-03-27
- Goal: Align callback flow to Gateway v1 auth routes and verify exchange/me behavior expectations.
- Core changes: set default `AUTH_EXCHANGE_PATH` to `/v1/auth/exchange` and `AUTH_ME_PATH` to `/v1/auth/me`.
- Additional change: callback error message now prints configured auth paths (`AUTH_EXCHANGE_PATH`, `AUTH_ME_PATH`) instead of hardcoded legacy paths.
- REQUIREMENTS.md: not updated (bug fix within existing auth flow requirements).
