2026-03-16

- 목적: 프로젝트 테마가 사용자 수동 선택 없이 시스템 설정만 따르도록 강제
- 핵심 변경: `ThemeProvider`에서 `localStorage` 기반 수동 테마와 토글 로직 제거
- 핵심 변경: `matchMedia('(prefers-color-scheme: dark)')`를 구독해 OS 테마 변경 시 즉시 반영
- 핵심 변경: 테마 상수에서 `system` 값을 제거하고 관련 static params 생성 로직 단순화
- 검증: `npm run _typecheck` 실행, 기존 `assets/lang/en.ts`, `assets/lang/ko.ts` 모듈 오류로 실패
