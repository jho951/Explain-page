# Requirements

## 목적

이 문서는 현재 `Explain-page` 프론트엔드가 어떤 실행 가정과 운영 기준 위에서 동작하는지 정리합니다.

이 문서의 목적은 아래와 같습니다.

- 새로 합류한 사람이 로컬/운영 실행 조건을 빠르게 이해할 수 있어야 한다.
- 프론트가 어떤 Gateway 계약 위에서 동작하는지 명확해야 한다.
- Docker dev/prod 모드의 차이를 실행 전에 이해할 수 있어야 한다.

## 제품/런타임 가정

### 기본 런타임

- 프레임워크는 Next.js 기반이다.
- 브라우저는 backend 개별 서비스가 아니라 `gateway-service`만 직접 호출한다.
- 인증 상태는 브라우저 storage가 아니라 서버가 발급한 cookie 기준으로 판단한다.

### 인증 가정

- 로그인 시작 경로는 Gateway의 `/v1/auth/sso/start`다.
- callback 이후 프론트는 `ticket -> /v1/auth/exchange -> /v1/auth/me` 순서를 따른다.
- 프론트는 `Authorization` 헤더를 기본 세션 상태 저장소로 사용하지 않는다.
- 인증 관련 요청은 `credentials: "include"`를 사용한다.
- explain 프론트 기본 대상 page는 `explain`이다.

### Gateway 공개 경로 가정

브라우저가 현재 사용하는 경로는 아래와 같다.

- `/v1/auth/sso/start`
- `/v1/auth/exchange`
- `/v1/auth/me`
- `/v1/auth/session`
- `/v1/auth/refresh`
- `/v1/auth/logout`
- `/v1/users/me`
- `/v1/documents/**`
- `/v1/editor-operations/**`
- `/v1/admin/**`

`authz-service` 권한 체크는 브라우저 공개 API가 아니라 Gateway 내부 선검사 흐름이다.

## Docker 실행 요구사항

### 공통

- Docker Desktop 또는 호환 daemon이 실행 중이어야 한다.
- `docker compose` 명령이 사용 가능해야 한다.
- 저장소 루트에서 compose를 실행해야 한다.

### dev 모드

- env 파일은 `.env.local`을 사용한다.
- compose 파일은 `docker/docker-compose.dev.yml`이다.
- 컨테이너는 `next dev`를 실행한다.
- 소스 코드는 bind mount로 연결된다.
- host port 기본값은 `3000`이다.
- 필요하면 `EXPLAIN_PAGE_DEV_PORT`로 host port를 바꿀 수 있다.

### prod 모드

- env 파일은 `.env.production`을 사용한다.
- compose 파일은 `docker/docker-compose.prod.yml`이다.
- 컨테이너는 standalone production runtime을 실행한다.
- host port 기본값은 `3000`이다.
- 필요하면 `EXPLAIN_PAGE_PROD_PORT`로 host port를 바꿀 수 있다.

## 환경 변수 요구사항

### 필수 공개 환경 변수

- `NEXT_PUBLIC_GATEWAY_BASE_URL`
- `NEXT_PUBLIC_START_FRONTEND_URL`
- `NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL`

### 하위 호환 변수

- `NEXT_PUBLIC_SSO_BASE_URL`

### 권장 명시 값

- `NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE=explain`

## 개발/운영 모드 구분 요구사항

현재 저장소는 아래 원칙을 따른다.

1. 개발 편의성과 운영 런타임을 동일한 compose 경로에 섞지 않는다.
2. `dev`는 빠른 수정과 HMR을 우선한다.
3. `prod`는 실제 배포와 유사한 standalone runtime을 우선한다.
4. 운영 env 파일이 없으면 `prod`는 실행되지 않아야 한다.

## 문서 유지 원칙

아래 항목이 바뀌면 이 문서를 같이 갱신해야 한다.

- Gateway 공개 경로
- 인증 흐름
- Docker 실행 모드
- 필수 env 변수
- host port 정책
