# 2026-04-24 Fix not-found home link

- Goal: make the "Back to home" action on the not-found page return to the actual home screen.
- Cause: the link pointed to `/public`, which is not the app's home route.
- Change: switched the link to a locale-aware home path: `/` for the default locale and `/${locale}` for localized routes.
- Scope: `src/features/notFound/pages/NotFoundPage.tsx`.
