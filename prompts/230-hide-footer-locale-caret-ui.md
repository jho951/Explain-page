# 2026-04-24 Hide footer locale caret UI

- Goal: remove the default `▾` caret UI from the footer locale select.
- Cause: the built-in select caret was no longer wanted in the footer language control.
- Change: hid the `span[aria-hidden='true']` caret inside the locale select and reduced the right padding accordingly.
- Scope: `src/shared/ui/footer/FooterMeta.module.css`.
