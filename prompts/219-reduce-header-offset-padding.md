# 2026-04-24 Reduce header offset padding

- Goal: reduce the top padding applied below the fixed header.
- Cause: the shared client layout used the full header offset, which left too much empty space before page content.
- Change: reduced `padding-top` from `var(--header-offset)` to `calc(var(--header-offset) - 1.6rem)` in the shared layout offset class.
- Scope: `src/shared/providers/client/ClientContext.module.css`.
