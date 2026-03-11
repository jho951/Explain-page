User request:

- Fix build failure caused by missing GitHub auth env vars during build.
- Fix the Header CSS autoprefixer warning about `end`.

Work performed:

- Changed `libs/auth.ts` to export `createAuthOptions()` instead of throwing during module import.
- Updated `app/api/auth/[...nextauth]/route.ts` to create the NextAuth handler at request time.
- Replaced `justify-content: end` with `justify-content: flex-end` in `components/organisms/Header/Header.module.css`.

Reason:

- Build should succeed even when auth env vars are not present at compile time.
- Auth env validation should happen when the auth route is actually invoked.
