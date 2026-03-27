2026-03-16

- 목적: 현재 코드베이스에서 실제 참조되지 않는 죽은 코드 제거
- 핵심 변경: 미사용 `Theme` context API와 그에 종속된 타입/상수 파일 제거, provider를 단순화
- 핵심 변경: 잘못 놓여 있던 `app/generateStaticParams.ts` 삭제 및 미사용 `BaseLayoutProps` 제거
- 핵심 변경: 비어 있는 `assets/lang/*` 파일 의존 제거, `middleware`에서 사용하는 `LOCALE_COOKIE`만 유지
- 검증: `npm run _typecheck` 통과
