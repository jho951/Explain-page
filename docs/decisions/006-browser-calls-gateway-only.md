# ADR 006: Browser Calls Gateway Only

## Status

Accepted

## Context

- 브라우저가 내부 MSA 주소를 직접 알거나 호출하면 서비스 경계가 프론트에 누출된다.
- 인증, 사용자, 차단, 권한 API가 여러 서비스로 분리되어 있어도 브라우저 관점에서는 단일 공개 진입점이 필요하다.
- 세션 쿠키, CORS, 사용자 주입 헤더(`X-User-Id`) 같은 교차 관심사는 Gateway에서 일관되게 처리하는 편이 안전하다.

## Decision

- 프론트엔드는 내부 MSA가 아니라 Gateway 도메인만 API 서버로 간주한다.
- 브라우저가 호출하는 공개 경로는 `/auth/**`, `/users/**`, `/blocks/**`, `/permissions/**` 로 제한한다.
- `/auth/internal/**`, `/permissions/internal/**` 같은 internal 경로와 `:8081`, `:8082` 형태의 내부 서비스 주소는 프론트에 노출하지 않는다.
- 로그인 시작도 Gateway의 `/auth/sso/start` 엔드포인트를 기준으로 한다.
- 인증 상태 확인은 callback 이후 `POST /auth/exchange` 와 `GET /auth/me` 를 기준으로 하고, 사용자 프로필은 `GET /users/me` 로 조회한다.
- 프론트는 세션 기반 호출에서 `credentials: 'include'` 를 사용하고, 사용자 식별 헤더는 직접 넣지 않는다.

## Consequences

- 프론트의 API 클라이언트는 Gateway base URL 하나만 관리하면 된다.
- 인증/사용자/권한 API 모듈을 서비스별 namespace로 나누되 모두 Gateway를 통해 호출한다.
- Gateway가 logout 공개 경로를 제공하지 않으면 프론트는 세션 무효화 버튼을 기본 노출하지 않는다.
