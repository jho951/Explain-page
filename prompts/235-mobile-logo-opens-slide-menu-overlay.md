# 2026-04-24 Make mobile logo open slide menu overlay

- Goal: make the mobile LNB behave like a full-screen slide menu opened from the home/logo icon.
- Cause: the previous mobile header used a small dropdown/hamburger pattern instead of a side-sliding menu that covers the screen.
- Change: switched the mobile logo into a menu trigger, removed the mobile hamburger button, converted the mobile menu into a full-screen slide overlay, and added a close action plus body scroll lock while open.
- Scope: `src/shared/ui/header/Header.tsx`, `src/shared/ui/header/HeaderMobileMenu.tsx`, `src/shared/ui/header/Header.parts.types.ts`, `src/shared/ui/header/Header.module.css`.
