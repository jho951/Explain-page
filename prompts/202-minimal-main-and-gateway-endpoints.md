# 202 Minimal Main And Gateway Endpoints

- Date: 2026-04-17
- Goal: 메인 페이지 구성을 최소화하고 현재 Gateway 공개 API 경로에 맞게 프론트 설정을 정리했다.
- Changes: 홈 랜딩을 단일 진입 섹션으로 축소하고, 브라우저 허용 API prefix에서 미등록 `/workspaces`, `/permissions` 경로를 제거했다.
- Verification: `npm run typecheck`, `npm run lint`, 수정 파일 대상 `prettier --check`를 통과했다.
