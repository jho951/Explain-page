# 2026-04-24 Bold home title and separate GNB menu style

- Goal: make the landing title feel bold, keep GNB as its own navigation definition, and restyle the desktop context menu to match the header tone.
- Cause: the hero title still looked too light, and reusing the footer navigation groups directly for GNB made the header structure too tightly coupled.
- Change: increased the hero title weight, split GNB into its own tree definitions, replaced the desktop menu rendering with a header-specific submenu panel, and added matching panel styles.
- Scope: `src/features/home/landing/components/PortfolioLanding.module.css`, `src/shared/config/navigation.ts`, `src/shared/ui/header/Header.tsx`, `src/shared/ui/header/HeaderDesktopNav.tsx`, `src/shared/ui/header/Header.parts.types.ts`, `src/shared/ui/header/Header.module.css`.
