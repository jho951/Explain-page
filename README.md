기술 블로그
다국어 번역
마크댜운 에디터
다크 모드
rss 피드 적용

## AI Agent Collaboration Artifacts

- Working agreement: `AGENTS.md`
- Requirements & assumptions: `docs/REQUIREMENTS.md`
- Decisions (ADR): `docs/decisions/`
- Prompt logs: `prompts/`
- Runbook: `docs/runbook/DEBUG.md`

## Auth Setup

- Browser requests only the Gateway domain.
- GitHub callback is handled by Gateway/Auth Service.
- This frontend uses `ticket -> /auth/exchange -> /auth/me` and `/users/me` after Gateway login.
- Auth is cookie-based: the frontend does not persist access tokens in `localStorage`.
- All auth requests use `credentials: "include"` and rely on server-issued cookies.
- Required server env vars:
  - `NEXT_PUBLIC_GATEWAY_BASE_URL`
- Gateway base URL shape:
  - fixed API prefix: `http://localhost:8080/v1/*` (or `{configured-gateway-base}/v1/*`)

## Docker

1. 이미지 빌드

```bash
docker build -f docker/Dockerfile -t explain-page:local .
```

2. 컨테이너 실행 (`.env.local` 사용)

```bash
docker run --rm -p 3000:3000 --env-file .env.local --name explain-page explain-page:local
```

3. compose + 스크립트로 실행

```bash
./scripts/run.docker.sh
```

4. 로컬 dev 실행

```bash
./scripts/run.local.sh
```
