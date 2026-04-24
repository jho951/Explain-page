# 2026-04-24 Center legal modal on mobile and raise z-index

- Goal: keep the legal modal centered on mobile and make sure it blocks header interaction.
- Cause: the mobile modal was bottom-aligned and its overlay z-index sat below the header layer.
- Change: centered the mobile overlay vertically and raised the modal overlay z-index above the header.
- Scope: `src/features/legal/components/LegalModal.module.css`.
