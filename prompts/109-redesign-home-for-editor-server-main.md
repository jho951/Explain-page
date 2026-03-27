# 109 redesign home for editor server main

- Date: 2026-03-19
- Goal: 메인 페이지를 `craft.do` 레퍼런스 톤으로 재구성하되, 현재 프론트의 역할에 맞게 에디터 서버 진입 화면으로 보이도록 조정
- Changes: `HomeTemplate`를 단일 랜딩 렌더로 단순화하고 `PortfolioLanding`의 카피, 섹션 구조, CSS를 에디터 서버/Gateway/워크스페이스 문맥에 맞게 전면 수정
- Requirements: 기존 요구사항 범위 안의 홈 UI/콘텐츠 개편이라 `docs/REQUIREMENTS.md`는 갱신하지 않음
