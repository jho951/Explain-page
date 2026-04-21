# 207 Reset Dev Port To 3000

- Date: 2026-04-21
- Goal: 현재 `explain-page-dev` 컨테이너의 host port를 다시 `3000`으로 맞춘다.
- Changes: 저장소 기본 설정이 이미 `3000`임을 확인했고, 실행 중이던 dev 컨테이너의 `3001 -> 3000` 포트 매핑을 `3000 -> 3000`으로 재기동한다.
- Verification: Docker 컨테이너 포트 매핑과 접속 주소를 다시 확인한다.
