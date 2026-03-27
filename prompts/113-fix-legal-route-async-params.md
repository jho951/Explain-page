# 113-fix-legal-route-async-params

- Date: 2026-03-27
- Goal: Resolve Next.js dynamic API warning on `/legal/[slug]` (`params` must be awaited).
- Core changes: awaited `params` in `generateMetadata` and `LegalPage`; aligned slug access to `[slug]` route shape.
- Additional alignment: added `privacy-policy` alias in legal content map to match existing `/legal/privacy-policy` link.
- REQUIREMENTS.md: not updated (bug fix within existing requirements scope).
