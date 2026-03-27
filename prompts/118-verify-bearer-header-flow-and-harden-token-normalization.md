# 118-verify-bearer-header-flow-and-harden-token-normalization

- Date: 2026-03-27
- Goal: Verify Bearer header flow and harden against malformed token formats.
- Core changes: normalized stored/access tokens to strip accidental `Bearer ` prefix and prevent `Bearer Bearer ...` injection.
- Core changes: exchange now fails fast if access token is missing in response, because Gateway requires Authorization Bearer token.
- REQUIREMENTS.md: not updated (auth robustness and bug-prevention within existing scope).
