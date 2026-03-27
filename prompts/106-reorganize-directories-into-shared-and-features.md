2026-03-16

- 목적: 유지보수성을 높이기 위해 프론트엔드 디렉토리 구조를 실무형 `shared` / `features` 중심으로 재구성
- 핵심 변경: 전역 레이아웃, 공용 UI, provider를 `shared/`로 이동하고 auth, home, legal, not-found UI를 `features/`로 분리
- 핵심 변경: `app/` 라우트와 내부 import 경로를 새 구조로 전면 갱신
- 핵심 변경: 구조 변경 기준과 운영 원칙을 ADR 005에 기록
- 검증: `npm run _typecheck` 통과
