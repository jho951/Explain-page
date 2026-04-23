# 2026-04-23

- 목적: 최신 Gateway 인증 구조 기준으로 editor-service, user-service, 계약 문서의 인증 설정을 정합화한다.
- 배경: `POST /v1/documents` 호출이 `iss claim is not valid`로 401을 반환했고, Gateway 내부 JWT 계약과 downstream 서비스 검증 설정이 어긋나 있었다.
- 핵심 변경: editor-service와 user-service가 `api-gateway / internal-services / shared secret` 기준의 내부 JWT를 우선 검증하도록 설정 우선순위와 dev/prod compose env를 수정했다.
- 문서 반영: editor-service 요구사항, gateway/editor/user/explain service-contract 문서를 최신 `session -> gateway internal JWT -> downstream` 흐름 기준으로 갱신했다.
- 메모: 실제 배포 환경에서는 `GATEWAY_INTERNAL_JWT_SHARED_SECRET`와 `PLATFORM_SECURITY_JWT_SECRET`를 동일 값으로 운영해야 한다.
