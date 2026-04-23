# 212-align-auth-bootstrap-to-msa-session-boundary

- Date: 2026-04-23
- Goal: MSA 구조에 맞게 프론트 인증 부트스트랩에서 세션 검증과 사용자 프로필 조회 책임을 분리한다.
- Changes: `AUTH_SESSION_PATH`와 `fetchAuthSession()`을 추가하고, refresh fallback 로직을 공통 helper로 정리했다.
- Changes: `AuthBootstrap`이 먼저 `/v1/auth/session`으로 인증 상태를 확정한 뒤 `/v1/auth/me`로 프로필을 읽도록 바꿨다.
- Notes: 세션은 유효하지만 프로필 조회가 실패한 경우에도 프론트 auth 상태는 `authenticated`로 유지하고 오류만 저장한다.
