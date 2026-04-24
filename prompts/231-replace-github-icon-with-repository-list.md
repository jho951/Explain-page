# 2026-04-24 Replace footer GitHub icon with repository list

- Goal: remove the footer GitHub icon and replace the landing repository panel content with grouped GitHub repository links.
- Cause: the GitHub links should live in the main landing repository section instead of the footer social icon row.
- Change: removed the footer `SNS_LINK` GitHub entry, replaced the landing endpoint list with grouped repository sections, and added link styling for the new repository cards.
- Scope: `src/features/home/landing/components/PortfolioLanding.tsx`, `src/features/home/landing/components/PortfolioLanding.module.css`, `src/shared/config/navigation.ts`.
