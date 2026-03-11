User request:

- Fix pre-commit TypeScript failures caused by casing/path mismatches.

Work performed:

- Normalized aliased imports to match the real directory names:
  - `components/organisms/Header`
  - `components/organisms/Footer`
  - `components/molecules/Logo`
  - `components/molecules/Fnb`
- Updated dependent files in `contexts/`, `components/organisms/`, and `components/molecules/gnb/`.

Reason:

- On case-sensitive resolution, mixed `header/Header`, `footer/Footer`, `logo/Logo`, `fnb/Fnb` imports cause TypeScript to treat the same module as different files, which blocks the husky pre-commit `tsc` step.

Verification:

- Intended follow-up: run `tsc --noEmit -p tsconfig.json` or targeted eslint/tsc checks.
