# 195-header-logout-visibility-fix

- Goal: Make the header logout button visible whenever a user is authenticated or has a stored access token.
- Changes: Removed logout gating from `HeaderAuthActions` and switched the header to pass a token-aware auth state.
- Changes: Added local-session cleanup fallback when gateway logout is unavailable, so logout remains usable.
- Notes: Preserved existing gateway logout behavior when configured.
