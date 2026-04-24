# 2026-04-24 Add mock FAQ page

- Goal: create a simple FAQ page with mock Q&A content.
- Cause: the navigation already pointed to `/community/faq`, but no page existed yet.
- Change: added a new FAQ feature with localized mock Q&A content and wired routes for both `/community/faq` and `/{lang}/community/faq`.
- Scope: `src/features/faq/**`, `src/features/index.ts`, `src/app/(default)/community/faq/page.tsx`, `src/app/[lang]/community/faq/page.tsx`.
