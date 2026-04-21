# Debug Runbook

## 목적

이 문서는 `Explain-page`를 Docker 또는 로컬 개발 환경에서 실행할 때 자주 만나는 문제를 빠르게 진단하기 위한 runbook입니다.

우선순위는 아래 순서로 보면 됩니다.

1. Docker daemon이 정상인가
2. env 파일이 맞는가
3. host port가 비어 있는가
4. 컨테이너 내부 앱이 실제로 기동했는가
5. callback URL과 실제 접속 URL이 일치하는가

## 1. dev가 안 올라올 때

### 증상

- `./scripts/run.docker.sh dev` 실행 후 컨테이너가 바로 종료된다.
- 브라우저에서 접속이 안 된다.

### 확인 순서

```bash
docker compose -f docker/docker-compose.dev.yml ps
docker logs --tail 100 explain-page-dev
```

### 기대 결과

- 컨테이너 상태가 `Up`
- 로그에 `next dev --hostname 0.0.0.0 --port 3000`
- 로그에 `Ready`

## 2. prod가 실행되지 않을 때

### 대표 원인

- `.env.production` 파일이 없다.

### 확인 메시지

```txt
Environment file not found at .../.env.production
```

### 조치

```bash
cp .env.production.example .env.production
```

그 다음 실제 운영 도메인 값으로 수정한다.

## 3. 포트 충돌이 날 때

### 대표 메시지

```txt
Bind for 0.0.0.0:3000 failed: port is already allocated
```

### 의미

호스트의 `3000` 포트를 이미 다른 프로세스나 다른 컨테이너가 사용 중이라는 뜻이다.

### 확인 방법

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
docker ps --format '{{.Names}}\t{{.Ports}}'
```

### 조치

개발용은 포트를 바꿔서 실행한다.

```bash
EXPLAIN_PAGE_DEV_PORT=3001 ./scripts/run.docker.sh dev
```

운영용도 같은 방식으로 바꿀 수 있다.

```bash
EXPLAIN_PAGE_PROD_PORT=3001 ./scripts/run.docker.sh prod
```

### 주의

SSO callback이 `3000`을 기준으로 되어 있으면, 단순히 dev host port만 `3001`로 바꾼 경우 로그인 callback은 별도 조정이 필요할 수 있다.

## 4. Docker 권한 오류가 날 때

### 대표 메시지

```txt
permission denied while trying to connect to the Docker daemon socket
```

### 의미

- Docker Desktop이 꺼져 있거나
- 현재 셸에서 Docker daemon에 접근할 권한이 없거나
- 실행 환경의 sandbox 제한이 있는 경우다.

### 확인 방법

```bash
docker ps
docker compose version
```

### 조치

- Docker Desktop이 실행 중인지 확인한다.
- 로컬 터미널에서 직접 같은 명령을 실행해 본다.
- 에이전트 환경이라면 Docker 접근 권한 허용이 필요할 수 있다.

## 5. dev는 떠 있는데 브라우저에서 안 열릴 때

### 확인 순서

1. 컨테이너가 `Up` 상태인지 확인한다.
2. `docker logs --tail 100 explain-page-dev`에서 `Ready`가 찍혔는지 본다.
3. host port 설정이 기대와 같은지 본다.

예:

- `EXPLAIN_PAGE_DEV_PORT=3001`로 띄웠으면 접속 URL도 `http://localhost:3001`이어야 한다.

## 6. 화면은 열리는데 로그인 redirect가 이상할 때

### 대표 원인

- `NEXT_PUBLIC_START_FRONTEND_URL`
- `NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL`
- 실제 접속한 브라우저 URL

이 세 가지가 서로 맞지 않는 경우다.

### dev 기본 기대값

```txt
NEXT_PUBLIC_START_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE=explain
```

### 점검 포인트

- 실제로 `3001`로 접속했는데 env는 `3000`으로 남아 있지 않은가
- Gateway/Auth Service의 등록된 callback URI와 프론트 env가 같은가
- redirect 후 query의 `ticket` 또는 `error`가 기대대로 오는가

## 7. 코드 변경이 dev 컨테이너에 반영되지 않을 때

### 현재 dev 구조

- 저장소는 `/app`에 bind mount된다.
- `.next`와 `node_modules`는 별도 volume이다.
- `WATCHPACK_POLLING=true`가 켜져 있다.

### 조치 순서

1. 로그에 컴파일 재시작이 보이는지 확인한다.
2. 파일이 실제 저장소에 저장됐는지 확인한다.
3. 그래도 반영이 늦으면 컨테이너를 재시작한다.

```bash
docker restart explain-page-dev
```

## 8. prod 동작을 빠르게 검증하고 싶을 때

### 권장 순서

1. `.env.production.example`을 복사해 `.env.production` 생성
2. 실제 도메인 또는 테스트용 도메인 값 반영
3. `./scripts/run.docker.sh prod`
4. 로그와 포트 상태 확인

## 9. 추천 확인 명령 모음

```bash
./scripts/run.docker.sh dev
EXPLAIN_PAGE_DEV_PORT=3001 ./scripts/run.docker.sh dev
./scripts/run.docker.sh prod
docker compose -f docker/docker-compose.dev.yml ps
docker compose -f docker/docker-compose.prod.yml ps
docker logs --tail 100 explain-page-dev
docker logs --tail 100 explain-page-prod
lsof -nP -iTCP:3000 -sTCP:LISTEN
```
