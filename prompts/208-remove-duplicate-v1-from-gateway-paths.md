# 208 Remove Duplicate v1 From Gateway Paths

- Date: 2026-04-21
- Goal: Gateway base URL가 이미 `/v1`을 포함할 때 프론트 요청 path에 `/v1`가 중복되지 않게 정리한다.
- Changes: auth 관련 기본 API path를 `/auth/...` 형태로 바꾸고, API client path 검증도 `/auth/...` 기준으로 처리하되 기존 `/v1/...` 입력도 정상 해석되게 유지했다.
- Verification: 관련 상수와 URL 조립 로직을 점검해 최종 요청이 `http://localhost:8080/v1/...` 형태로 만들어지는지 확인한다.
