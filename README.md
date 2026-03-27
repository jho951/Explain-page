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
- All auth requests use `credentials: "include"`.
- Required server env vars:
  - `NEXT_PUBLIC_GATEWAY_BASE_URL`
  - `SSO_SESSION_COOKIE_NAME`
- Gateway base URL shape:
  - fixed API prefix: `http://localhost:8080/v1/*` (or `{configured-gateway-base}/v1/*`)
