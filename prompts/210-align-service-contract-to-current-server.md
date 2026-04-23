# 210 Align Service Contract To Current Server

- Date: 2026-04-23
- Goal: 현재 `service-contract`와 실제 서버 응답/서비스 명칭 기준으로 explain-page의 auth 타입과 랜딩 정보를 정합하게 맞춘다.
- Changes: `/v1/auth/me`를 세션 응답과 섞지 않도록 프론트 auth 타입/사용 로직을 정리하고, 메인 랜딩의 서비스 맵 명칭을 `*-service` 및 `explain-page` 기준으로 수정했다.
- Verification: `npm run typecheck`, `npm run lint`
