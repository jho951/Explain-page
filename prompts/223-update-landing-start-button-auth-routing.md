# 2026-04-24 Update landing start button auth routing

- Goal: remove the policy CTA, rename the login CTA to "시작하기", and branch its behavior by auth state.
- Cause: the landing hero needed a single primary CTA that sends anonymous users to sign-in and authenticated users to the editor service entry.
- Change: removed the secondary button, renamed the primary CTA, and added a client-side CTA component that routes to `/signin` when unauthenticated and to `NEXT_PUBLIC_START_FRONTEND_URL` when authenticated.
- Scope: `src/features/home/landing/components/PortfolioLanding.tsx`, `src/features/home/landing/components/PortfolioLandingCta.tsx`, `src/features/home/landing/components/PortfolioLanding.module.css`.
