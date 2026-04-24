# 2026-04-24 Remove PortfolioLanding page background

- Goal: remove the background from the PortfolioLanding page root.
- Cause: the `.page` wrapper applied a decorative gradient and grid background.
- Change: removed the background and background-size declarations from the root `.page` class.
- Scope: `src/features/home/landing/components/PortfolioLanding.module.css`.
