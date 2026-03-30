# 189-add-auth-debug-logs-and-fix-callback-provider-context

- Goal: Add aggressive auth-flow console logs for runtime tracing and unblock callback crash.
- Core changes: added detailed console logs in `src/shared/lib/api-client.ts`, `src/shared/api/auth.ts`, and `src/features/auth/components/AuthCallbackClient.tsx`.
- Core changes: removed Redux hook dependency from `AuthCallbackClient` to avoid `react-redux context value` error when callback route renders outside Provider boundary.
- Validation: `npm run typecheck` and `npm run lint` both pass.
- REQUIREMENTS.md: not updated (debug instrumentation + callback crash fix within existing auth flow).
