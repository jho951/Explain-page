# 2026-04-24 Revert mobile logo overlay menu change

- Goal: revert the recent mobile logo-triggered full-screen overlay menu behavior.
- Cause: that mobile header interaction should not replace the previous logo/home link and hamburger dropdown pattern.
- Change: restored the previous mobile header structure with the home logo link, hamburger button, expandable dropdown panel, and height-based mobile menu rendering.
- Scope: `src/shared/ui/header/Header.tsx`, `src/shared/ui/header/HeaderMobileMenu.tsx`, `src/shared/ui/header/Header.parts.types.ts`, `src/shared/ui/header/Header.module.css`.
