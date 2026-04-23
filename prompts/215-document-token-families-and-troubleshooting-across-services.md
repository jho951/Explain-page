# 2026-04-23

- 목적: Gateway 내부 JWT 계층과 현재 장애 시나리오를 service-contract 및 troubleshooting 문서에 공식 반영한다.
- 배경: 일반 보호 서비스용 내부 JWT와 authz-service caller proof JWT의 역할 차이가 문서상 충분히 드러나지 않았다.
- 핵심 변경:
  - service-contract에 내부 토큰 패밀리와 authz 별도 caller proof 계약을 추가
  - gateway/authz/user/editor troubleshooting 문서에 401/403 증상, 원인, 설정 확인 포인트, 해결 방법 정리
  - editor-service와 authz-service에 작업 로그 추가
