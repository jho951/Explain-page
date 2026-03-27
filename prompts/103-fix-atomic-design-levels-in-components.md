2026-03-16

- 목적: `components/` 디렉토리의 아토믹 디자인 레벨이 적절한지 점검하고 필요한 구조 수정 수행
- 핵심 변경: `Header` 전용 하위 컴포넌트를 `components/organisms/Header/` 내부로 이동해 organism 내부 서브컴포넌트로 정리
- 핵심 변경: `FooterMeta`를 `components/organisms/Footer/`로 이동해 molecule이 organism 타입을 참조하던 역의존 제거
- 검증: `npm run _typecheck` 통과
