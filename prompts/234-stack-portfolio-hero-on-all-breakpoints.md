# 2026-04-24 Stack PortfolioLanding hero on all breakpoints

- Goal: keep the PortfolioLanding hero vertically stacked on both mobile and desktop.
- Cause: the hero still forced a fixed minimum height and switched to a two-column layout on desktop.
- Change: removed the `heroCopy` minimum height and deleted the desktop `grid-template-columns` override for `.hero`.
- Scope: `src/features/home/landing/components/PortfolioLanding.module.css`.
