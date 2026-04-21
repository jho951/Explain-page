# 205 Separate Docker Dev And Prod

- Date: 2026-04-21
- Goal: Docker 실행 경로를 개발용과 운영용으로 분리하고, 우선 dev compose로 테스트할 수 있게 정리했다.
- Changes: Dockerfile에 `dev`/`runner` 타깃을 분리하고, `docker-compose.dev.yml`, `docker-compose.prod.yml`, `./scripts/run.docker.sh [dev|prod]` 구조로 재편했다.
- Verification: compose 파일 문법을 확인하고 `dev` compose 기준으로 컨테이너 기동을 검증한다.
