# Explain Page

이 저장소는 `gateway-service`를 브라우저의 단일 진입점으로 사용하는 Next.js 프론트엔드입니다.

현재 구조의 핵심은 아래 두 가지입니다.

- 인증과 세션은 Gateway/Auth Service가 발급하는 cookie 기반으로 동작합니다.
- Docker 실행 경로는 `dev`와 `prod`로 분리되어 있으며, 목적에 따라 다른 compose 파일과 env 파일을 사용합니다.

## 빠른 시작

로컬에서 가장 먼저 확인할 경로는 `dev`입니다.

```bash
./scripts/run.docker.sh dev
```

호스트 `3000` 포트가 이미 사용 중이면 아래처럼 포트를 바꿉니다.

```bash
EXPLAIN_PAGE_DEV_PORT=3001 ./scripts/run.docker.sh dev
```

운영 형태 검증이 필요하면 `.env.production`을 준비한 뒤 아래를 실행합니다.

```bash
EXPLAIN_PAGE_IMAGE=123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/prod-explain-page:latest \
./scripts/run.docker.sh prod up
```

## 문서 위치

- 협업 규칙: `AGENTS.md`
- 요구사항/가정: `docs/REQUIREMENTS.md`
- 결정 기록: `docs/decisions/`
- 실행/장애 대응: `docs/runbook/DEBUG.md`
- 작업 로그: `prompts/`

## 현재 인증/API 기준

이 프론트는 브라우저가 Gateway 도메인만 호출하는 구조를 전제로 합니다.

- 로그인 시작: `/v1/auth/sso/start`
- ticket 교환: `/v1/auth/exchange`
- 세션 확인: `/v1/auth/session`
- 사용자 요약: `/v1/auth/me`
- refresh: `/v1/auth/refresh`
- logout: `/v1/auth/logout`
- 사용자 정보: `/v1/users/me`
- 문서 API: `/v1/documents/**`
- 에디터 작업 API: `/v1/editor-operations/**`
- 관리자 API: `/v1/admin/**`

인증 흐름은 아래 순서를 기준으로 이해하면 됩니다.

1. 브라우저가 Gateway SSO 시작 경로로 이동합니다.
2. Gateway/Auth Service가 GitHub OAuth를 수행합니다.
3. callback으로 돌아오면 프론트가 `ticket`을 받습니다.
4. 프론트가 `POST /v1/auth/exchange`를 호출합니다.
5. 서버가 `sso_session`, `ACCESS_TOKEN`, refresh cookie를 설정할 수 있습니다.
6. callback은 `GET /v1/auth/session`으로 Gateway 브라우저 세션이 성립했는지 확인한 뒤 `next`로 redirect합니다.
7. 앱 초기화는 `GET /v1/auth/session`으로 인증 여부를 확인하고, 인증된 경우에만 `GET /v1/auth/me?page=explain`로 사용자 요약을 읽습니다.

프론트 인증 해석 원칙은 아래와 같습니다.

- 브라우저는 cookie를 자동 전송하지만, 프론트 코드가 개별 cookie 값을 읽어 인증을 판단하지는 않습니다.
- 프론트 auth 상태의 source of truth는 `/v1/auth/session`입니다.
- `/v1/auth/me`는 로그인 성립 판정이 아니라 사용자 프로필 요약 조회입니다.
- refresh는 cookie 기반 `POST /v1/auth/refresh`로 수행합니다.

## Docker 구조

이 저장소는 dev와 prod를 다른 목적의 실행 경로로 분리합니다.

### dev

개발용 compose는 소스 코드를 컨테이너에 bind mount하고 `next dev`를 실행합니다.

- compose 파일: `docker/docker-compose.dev.yml`
- Docker target: `docker/Dockerfile`의 `dev`
- env 파일: `.env.local`
- 용도: 로컬 개발, 화면 확인, HMR, UI/API 연결 점검

### prod

운영용 compose는 미리 빌드된 Next.js standalone 이미지를 실행합니다.

- compose 파일: `docker/docker-compose.prod.yml`
- 빌드 전용 compose 파일: `docker/docker-compose.build.yml`
- env 파일: `.env.production`
- 용도: 운영 배포와 유사한 런타임 검증

## Docker 파일 역할

### `docker/Dockerfile`

- `deps`: `npm ci`
- `dev`: 개발 서버 실행
- `builder`: production build 생성
- `runner`: standalone 결과 실행

### `docker/docker-compose.dev.yml`

- 소스 디렉터리를 `/app`에 mount합니다.
- `node_modules`, `.next`는 volume으로 분리합니다.
- `WATCHPACK_POLLING=true`로 Docker 환경에서 파일 변경 감지를 안정화합니다.

### `docker/docker-compose.prod.yml`

- production runtime 이미지를 pull해서 실행합니다.
- `.env.production`이 없으면 실행되지 않게 설계했습니다.

### `docker/docker-compose.build.yml`

- CI 또는 로컬 이미지 검증에서만 사용합니다.
- `NEXT_PUBLIC_*` 값을 build arg로 주입해 standalone 이미지를 만듭니다.

### `scripts/run.docker.sh`

모드와 action에 따라 compose 파일과 env 파일을 자동 선택합니다.

```bash
./scripts/run.docker.sh dev up
./scripts/run.docker.sh prod up
./scripts/run.docker.sh prod build
```

지원하는 host port override:

- `EXPLAIN_PAGE_DEV_PORT`
- `EXPLAIN_PAGE_PROD_PORT`

## 환경 변수

### 개발용 `.env.local`

개발용 기준 예시는 현재 저장소의 `.env.local`을 따릅니다.

핵심 값:

- `NEXT_PUBLIC_GATEWAY_BASE_URL`
- `NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE=explain`
- `NEXT_PUBLIC_START_FRONTEND_URL=http://localhost:3000`
- `NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL=http://localhost:3000/auth/callback`

### 운영용 `.env.production`

운영용 템플릿은 `.env.production.example`을 복사해서 사용합니다.

```bash
cp .env.production.example .env.production
```

운영에서는 아래 값을 실제 도메인으로 바꿔야 합니다.

- `NEXT_PUBLIC_GATEWAY_BASE_URL`
- `NEXT_PUBLIC_SSO_BASE_URL`
- `NEXT_PUBLIC_START_FRONTEND_URL`
- `NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL`

## 자주 쓰는 명령

### dev 실행

```bash
./scripts/run.docker.sh dev
```

### dev를 다른 포트로 실행

```bash
EXPLAIN_PAGE_DEV_PORT=3001 ./scripts/run.docker.sh dev
```

### prod 실행

```bash
EXPLAIN_PAGE_IMAGE=123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/prod-explain-page:latest \
./scripts/run.docker.sh prod up
```

### prod 이미지 로컬 빌드

```bash
EXPLAIN_PAGE_IMAGE=explain-page:local ./scripts/run.docker.sh prod build
```

### compose 직접 실행

```bash
docker compose -f docker/docker-compose.dev.yml up --build
EXPLAIN_PAGE_IMAGE=explain-page:local docker compose -f docker/docker-compose.build.yml build
EXPLAIN_PAGE_IMAGE=123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/prod-explain-page:latest docker compose -f docker/docker-compose.prod.yml up -d
```

### 로컬 node 개발 서버 실행

```bash
./scripts/run.local.sh
```

## 무엇을 언제 써야 하나

- 화면 개발과 API 연결 확인: `dev`
- HMR이 필요할 때: `dev`
- 운영 이미지 형태 검증: `prod build` 후 `prod up`
- Docker 없이 빠르게 코드만 확인: `run.local.sh`

## 현재 확인된 주의 사항

- 호스트 `3000` 포트가 다른 컨테이너나 프로세스와 충돌할 수 있습니다.
- SSO callback URL과 실제 접속 포트가 다르면 로그인 redirect가 어긋날 수 있습니다.
- `dev`를 `3001`로 띄우면 화면 확인은 가능하지만, callback이 `3000`을 기준으로 잡혀 있으면 인증 플로우는 추가 조정이 필요합니다.

세부 장애 대응은 `docs/runbook/DEBUG.md`를 참고하면 됩니다.
