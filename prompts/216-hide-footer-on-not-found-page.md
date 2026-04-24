# 2026-04-24 Hide footer on not-found page

- Goal: prevent the global footer from rendering on the not-found page.
- Cause: the footer is mounted from the shared client layout, so the not-found page could not hide it by pathname alone.
- Change: added a not-found page marker and made the client layout suppress the footer when that marker is present.
- Scope: `src/features/notFound/pages/NotFoundPage.tsx`, `src/shared/providers/client/ClientContext.tsx`.
