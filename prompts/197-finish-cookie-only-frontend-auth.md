# 197-finish-cookie-only-frontend-auth

- Goal: Keep the frontend on cookie-based session auth while preserving the backend's internal hybrid behavior.
- Changes: Removed frontend access-token persistence and Authorization header injection.
- Changes: Kept cookie-based Gateway requests (`credentials: "include"`) and SSO session bootstrapping.
- Notes: The frontend still uses `auth_exchange_done` as a non-token flow flag for refresh fallback.
