# REQUIREMENTS

## Product Scope (frontend-ui)

- Next.js 기반 웹 프론트엔드 기능을 안정적으로 제공한다.
- 기존 사용자 경험(다국어, 다크모드, 블로그/콘텐츠) 회귀를 방지한다.

## Functional Requirements

- 라우팅/화면 렌더링은 기존 동작을 유지한다.
- 접근 가능한 UI와 반응형 레이아웃을 유지한다.
- 콘텐츠 렌더링(마크다운/블로그 관련 기능)을 깨지 않도록 한다.
- 에디터(`/edit`, `/[lang]/edit`) 기능은 제공하지 않는다.
- 인증이 필요한 경로는 Gateway 세션 쿠키 기반으로 보호한다.
- GitHub OAuth callback 처리는 Gateway 뒤의 Auth Service가 담당하고, 프론트는 provider callback을 직접 처리하지 않는다.
- 브라우저는 내부 MSA를 직접 호출하지 않고, 항상 Gateway 도메인만 호출한다.
- 프론트가 호출하는 공개 API 경로는 `/auth/**`, `/api/users/**`, `/blocks/**`, `/permissions/**` 로 제한한다.
- `/auth/internal/**`, `/permissions/internal/**` 같은 internal 경로와 내부 서비스 주소(`:8081`, `:8082`)는 프론트에 노출하지 않는다.
- 프론트는 Gateway 로그인 후 callback ticket을 `/auth/exchange` 로 교환하고, `/auth/me` 및 `/users/me` 로 로그인 상태와 사용자 정보를 확정한다.
- 로그인 시작은 Gateway의 `/auth/sso/start` 엔드포인트를 기준으로 한다.
- GitHub OAuth callback 은 `http://localhost:8080/auth/github/callback` 에서 처리되고, 인증 완료 후 프론트 복귀 주소는 `http://localhost:5173/auth/callback` 을 사용한다.
- Gateway가 로그아웃 공개 경로를 제공하지 않는 현재 구성에서는 프론트가 세션 무효화 API를 임의로 호출하지 않는다.

## Non-Functional Requirements

- 타입 안정성: TypeScript 오류 없이 빌드 가능해야 한다.
- 코드 품질: ESLint/Prettier 규칙을 준수한다.
- 성능: 불필요한 번들 증가/렌더링 비용 증가를 피한다.
- 클라이언트 전역 상태는 Redux Toolkit 기반으로 일관되게 관리한다.

## Assumptions

- 이 저장소는 프론트엔드 애플리케이션(Next.js)이다.
- CI/배포 파이프라인은 기존 구성을 그대로 사용한다.
- Gateway URL(`NEXT_PUBLIC_GATEWAY_BASE_URL`, 레거시 `NEXT_PUBLIC_SSO_BASE_URL` fallback)은 `/v1` API prefix 기준으로 해석되며, 세션 쿠키 이름(`SSO_SESSION_COOKIE_NAME`)이 배포 환경에 설정된다.

## Change Control

- 요구사항/가정 변경 시 이 문서를 같은 PR에서 갱신한다.
- 큰 기술 결정은 ADR(`docs/decisions/`)로 기록한다.
