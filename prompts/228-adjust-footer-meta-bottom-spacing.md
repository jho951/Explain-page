# 2026-04-24 Adjust footer meta bottom spacing

- Goal: make the footer meta bottom row use `space-between` while keeping the language and icon group compact.
- Cause: the mobile override spread the language and icon group too wide and stacked the bottom row vertically.
- Change: switched the mobile bottom row back to a horizontal `space-between` layout and kept `languageAndIcons` grouped with `gap: 1rem`.
- Scope: `src/shared/ui/footer/FooterMeta.module.css`.
