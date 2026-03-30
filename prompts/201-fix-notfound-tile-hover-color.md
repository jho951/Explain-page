# 2026-03-30 NotFound hover color fix

- Goal: fix hover color not applying on the 404 / not-found tile grid.
- Cause: the tile wrapper blocked pointer events, so SVG hover styles never fired.
- Change: restored pointer events on the wrapper and wired hover fill/stroke to `--hover-color`.
- Scope: `src/features/notFound/pages/NotFoundPage.module.css`, `src/features/notFound/components/NotFoundTiles.module.css`.
