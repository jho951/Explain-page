# 2026-04-24 Align footer layout on mobile

- Goal: make the footer alignment consistent on mobile screens.
- Cause: the mobile footer mixed centered grid alignment with left-aligned meta content, so sections did not line up cleanly.
- Change: switched the footer nav grid to a single left-aligned column on mobile and made the bottom locale/social row span and align consistently.
- Scope: `src/shared/ui/footer/Footer.module.css`, `src/shared/ui/footer/FooterMeta.module.css`.
