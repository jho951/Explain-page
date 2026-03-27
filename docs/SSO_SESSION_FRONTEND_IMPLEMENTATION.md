# SSO Session Frontend Implementation

## Overview

이 프론트는 외부 OAuth provider 토큰을 직접 저장하지 않는다. 인증은 `Gateway + HttpOnly 쿠키 세션` 기준으로 동작한다.

현재 구현 목표:

- 브라우저는 내부 MSA가 아니라 Gateway 도메인으로만 요청
- 로그인 시작은 프론트가 아니라 Gateway로 위임
- 로그인 완료 후 callback `ticket` 을 `/auth/exchange` 로 교환하고 `/auth/me` 호출
- 앱 시작 시 `/users/me`로 사용자 상태 bootstrap
- GitHub callback 은 Gateway 뒤의 Auth Service가 처리
- 보호 경로의 최종 판정은 Gateway session endpoint 기준으로 제어

## Current Flow

1. 사용자가 `/signin` 진입
2. 로그인 버튼 클릭
3. 프론트가 `GET {GATEWAY_BASE_URL}/auth/sso/start?redirect_uri=http://localhost:5173/auth/callback` 로 이동
4. Gateway가 Auth Service로 전달하고 GitHub callback(`http://localhost:8080/auth/github/callback`)을 처리한다.
5. Auth Service가 세션 쿠키를 발급한다.
6. 프론트가 `POST {GATEWAY_BASE_URL}/auth/exchange` 로 callback ticket 을 세션으로 교환한다.
7. 프론트가 `GET {GATEWAY_BASE_URL}/auth/me` 으로 세션 상태를 확인한다.
8. 프론트가 `GET {GATEWAY_BASE_URL}/users/me` 로 사용자 정보를 조회한다.
9. 사용자 정보를 Redux `auth` slice에 저장
10. 이후 보호 경로 `/app/**` 는 인증 상태 기준으로 접근

## Implemented Files

- `libs/api-client.ts`
  - Gateway base URL과 허용된 공개 경로(`/auth`, `/api/users`, `/blocks`, `/permissions`)를 관리
  - 모든 Gateway 요청을 `credentials: 'include'` 로 전송
- `api/auth.ts`
  - Gateway 로그인 URL 생성
  - `/auth/exchange`, `/auth/me` 호출
  - 로그아웃 경로는 명시적으로 설정된 경우에만 사용
- `api/user.ts`, `api/block.ts`, `api/permission.ts`
  - Gateway 공개 API namespace 별 클라이언트 entrypoint
- `store/slices/auth-slice.ts`
  - `user`, `status`, `initialized`, `error` 상태 관리
- `features/auth/components/AuthBootstrap.tsx`
  - 앱 시작 시 `/users/me` bootstrap
- `features/auth/components/AuthGate.tsx`
  - `/app/**` 접근 시 비로그인 사용자를 `/signin` 으로 리다이렉트
- `app/(default)/(auth)/signin/page.tsx`
  - `next` 파라미터를 포함한 Gateway 로그인 URL 생성
- `app/auth/callback/page.tsx`
  - callback 착지 후 `/auth/exchange`, `/auth/me`, `/users/me` 재확인 후 원래 경로로 복귀
- `middleware.ts`
  - Gateway session endpoint 응답으로 보호 경로 인증 판정
- `shared/layout/Header/Header.tsx`
  - 로그인/UI 액션을 auth state 기준으로 전환

## Environment Variables

필수:

- `NEXT_PUBLIC_GATEWAY_BASE_URL`
  - Gateway base URL
- `SSO_SESSION_COOKIE_NAME`
  - 프론트 미들웨어가 확인할 세션 쿠키 이름

참고:

- `NEXT_PUBLIC_SSO_BASE_URL`
  - 레거시 fallback. 미설정 시 `NEXT_PUBLIC_GATEWAY_BASE_URL` 우선 사용
- `NEXT_PUBLIC_SITE`
  - 시작 프론트 origin 및 callback fallback 계산에 사용
- `NEXT_PUBLIC_AUTH_CONSUMER_CALLBACK_URL`
  - Gateway/Auth Service가 `redirect_uri` 를 받는 구성일 때만 사용
- `NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PATH`
  - 로그인 시작 path override. 기본값은 `/auth/sso/start`
- `NEXT_PUBLIC_GATEWAY_AUTH_EXCHANGE_PATH`
  - ticket 교환 path override. 기본값은 `/auth/exchange`
- `NEXT_PUBLIC_GATEWAY_AUTH_ME_PATH`
  - 인증 상태 조회 path override. 기본값은 `/auth/me`
- `NEXT_PUBLIC_GATEWAY_AUTH_LOGOUT_PATH`
  - Gateway가 별도 로그아웃 공개 경로를 제공할 때만 설정

백엔드 설정 전제:

- 백엔드 CORS 허용 origin 과 실제 프론트 origin 이 일치해야 한다.
- Gateway의 `GATEWAY_CORS_ALLOWED_ORIGINS` 에 실제 프론트 origin 이 포함되어야 한다.
- GitHub OAuth 앱 callback URL 은 프론트가 아니라 Gateway/Auth Service callback 이어야 한다.

## Required Gateway Endpoints

프론트 구현은 아래 엔드포인트를 전제로 한다.

- `GET /auth/sso/start`
- `GET /auth/github/callback`
- `POST /auth/exchange`
- `GET /auth/me`
- `GET /users/me`
- `GET /permissions/me`

권장 응답 예시:

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John",
  "avatarUrl": "https://...",
  "roles": ["user"]
}
```

## Frontend Behavior Rules

- GitHub access token, refresh token은 프론트에 저장하지 않는다.
- `localStorage` 에 장기 인증 토큰을 저장하지 않는다.
- 브라우저는 Gateway 도메인만 호출하고 내부 MSA 주소를 알지 못한다.
- 인증 상태 확인은 `GET /auth/me` 결과를 기준으로 한다.
- GitHub OAuth provider callback 은 프론트가 아니라 Gateway/Auth Service가 처리한다.
- 모든 인증 요청은 `credentials: 'include'` 로 보낸다.
- 프론트는 `X-User-Id` 같은 사용자 헤더를 직접 넣지 않는다.
- 사용자 프로필 bootstrap 은 `GET /users/me` 로 수행한다.
- 보호 페이지는 `/app` 및 `/app/**` 기준으로 처리한다.

## Middleware Policy

`middleware.ts` 는 보호 경로 요청마다 Gateway의 `/auth/me` 를 호출해 인증 상태를 확인한다.

이유:

- 보호 경로의 최종 판정 기준을 서버와 클라이언트 모두 Gateway session endpoint로 일치시킨다.
- 단순 쿠키 존재만으로 인증 성공으로 간주하지 않는다.

즉:

- `/auth/me` 성공: 페이지 진입 허용
- session endpoint 실패: `/signin?next=...` 로 리다이렉트

## Sign-In and Callback Rules

- `/signin`
  - `next` 쿼리를 받아 원래 이동하려던 경로를 유지한다.
  - Gateway 로그인 URL로 이동한다.
- `/auth/callback`
  - `error` 가 있으면 오류 표시
  - 성공 시 `/auth/exchange -> /auth/me -> /users/me -> next redirect`

## Header Behavior

헤더 액션은 auth state에 따라 달라진다.

- 비로그인
  - `Login` -> `/signin`
  - `Get Started` -> `/signin?next=/app`
- 로그인
  - `Open App` -> `/app`

## Operational Notes

서버와 반드시 합의해야 할 항목:

- Gateway 도메인
- 백엔드 CORS 허용 origin 과 프론트 origin 일치 여부
- Gateway `GATEWAY_CORS_ALLOWED_ORIGINS`
- 세션 쿠키 도메인 범위
- `SameSite` 정책
- `Secure` 적용 여부
- GitHub OAuth 앱 callback URL
- `/auth/me`, `/users/me` 응답 스키마

## Verification

구현 후 확인한 항목:

- `npm run _typecheck`
- `npm run _lint`

## Related Documents

- `docs/SSO_SESSION_PLAN.md`
- `docs/REQUIREMENTS.md`
- `docs/decisions/003-use-sso-session-cookie-auth.md`
