# 2026-04-24 Remove careers page and navigation links

- Goal: remove the careers page and delete its entries from both GNB and FNB.
- Cause: the careers section is no longer needed in the current navigation and page set.
- Change: removed the careers route files, deleted the careers entries from `ABOUT`/`GNB`, and removed the careers mock content from the shared info page feature.
- Scope: `src/shared/config/navigation.ts`, `src/features/infoPages/components/InfoPage.tsx`, `src/app/(default)/careers/page.tsx`, `src/app/[lang]/careers/page.tsx`.
