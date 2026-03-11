User request:

- Fix lint errors blocking commit/push.
- Specifically address unused import in HeaderDesktopNav and hook dependency warnings in Header.

Work performed:

- Removed unused `MenuItem` type import from `components/molecules/gnb/HeaderDesktopNav.tsx`.
- Wrapped `updateExpandedHeight` in `useCallback` inside `components/organisms/header/Header.tsx`.
- Added `updateExpandedHeight` to `useLayoutEffect` and `useEffect` dependency arrays.

Verification:

- Intended follow-up: run eslint on the two touched files to confirm the pre-commit issue is resolved.
