# 2026-04-24 Adjust footer spacing and locale select padding

- Goal: add space between the footer navigation and meta row, and fine-tune the locale select spacing around the globe and caret icons.
- Cause: the footer sections were visually too tight, and the locale select padding did not balance the left globe icon and right arrow spacing well.
- Change: added vertical gap to the footer container, moved the globe icon slightly right, increased left select padding, and reduced right select padding.
- Scope: `src/shared/ui/footer/Footer.module.css`, `src/shared/ui/footer/FooterMeta.module.css`.
