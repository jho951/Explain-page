# 2026-04-24 Add mock service, brand, and careers pages

- Goal: create simple placeholder pages for `Service`, `Brand Assets`, and `Careers`.
- Cause: the navigation already linked to those routes, but no pages existed yet.
- Change: added a shared info-page feature with localized mock content and wired routes for `/service`, `/brand`, `/careers` plus their `/{lang}` variants.
- Scope: `src/features/infoPages/**`, `src/features/index.ts`, `src/app/(default)/*/page.tsx`, `src/app/[lang]/*/page.tsx`.
