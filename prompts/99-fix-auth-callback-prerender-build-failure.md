# Prompt Log

- Date: 2026-03-13
- Task: Fix Next.js build failure while prerendering `/auth/callback`
- Summary:
  - Investigated build-time crash caused by Redux hook usage in `app/auth/callback/page.tsx`
  - Removed Redux dependency from the callback page because it is outside the layout tree that provides the store
  - Split the route into a server page and client component to avoid `useSearchParams()` prerender failures in Next.js 15
  - Marked the route as dynamic so Next.js does not try to statically prerender the callback page
