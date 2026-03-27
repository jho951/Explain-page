# 116-add-jwt-hybrid-access-refresh-flow

- Date: 2026-03-27
- Goal: Implement JWT hybrid auth flow with access token header injection and refresh retry.
- Core changes: added default refresh route (`/v1/auth/refresh`), per-request Bearer injection from stored access token, and 401 -> refresh -> single retry logic in gateway client.
- Core changes: exchange now captures access token from response (Authorization header or JSON body) and stores it; logout clears stored access token.
- Security note: refresh token is never stored or sent via Authorization header; refresh relies on cookie credentials only.
- REQUIREMENTS.md: not updated (implementation alignment within current auth integration scope).
