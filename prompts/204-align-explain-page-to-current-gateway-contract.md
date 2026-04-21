# 204 Align Explain Page To Current Gateway Contract

- Date: 2026-04-21
- Goal: 현재 `gateway-service`와 `auth-service` 계약을 기준으로 explain-page의 SSO/API 기본값을 정합하게 맞췄다.
- Changes: SSO `page` 기본값을 `explain`으로 바꾸고 callback 기본 URL을 `:3000/auth/callback`으로 정리했으며, `/v1/auth/session` 및 `/v1/editor-operations/**`를 현재 Gateway 공개 경로 목록에 반영했다.
- Verification: Gateway/Auth 문서와 소스 경로를 대조한 뒤 `npm run typecheck`, `npm run lint`로 프론트 정합성을 확인한다.
