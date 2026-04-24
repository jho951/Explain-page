# 2026-04-24 Update home title tag and GNB children

- Goal: change the landing `home-title` element to a `p` tag and make the header GNB use footer-style child navigation.
- Cause: the landing hero title needed different markup, and the GNB needed capitalized labels with submenu children for desktop context menus and mobile dropdowns.
- Change: replaced the hero `h1` with a styled `p`, moved the title styles to a class, and switched `GNB` to reuse the footer navigation groups with children.
- Scope: `src/features/home/landing/components/PortfolioLanding.tsx`, `src/features/home/landing/components/PortfolioLanding.module.css`, `src/shared/config/navigation.ts`.
