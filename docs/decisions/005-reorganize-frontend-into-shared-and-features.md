# ADR 005: Reorganize Frontend Into Shared And Features

## Status

Accepted

## Context

기존 구조는 `components/atoms`, `components/templates`, `contexts`, `components/auth`처럼 UI 레벨과 역할이 섞여 있었습니다.
이 상태에서는 다음 문제가 있었습니다.

- 전역 레이아웃 UI와 페이지 전용 UI가 같은 축에서 관리되어 변경 지점을 찾기 어렵다.
- provider/context와 화면 컴포넌트의 경계가 멀어서 앱 조립 흐름을 빠르게 파악하기 어렵다.
- auth, home, legal, not-found 같은 기능 단위 변경이 여러 폴더를 가로질러 발생한다.

## Decision

디렉토리 구조를 `shared`와 `features` 중심으로 재구성한다.

- `shared/`: 전역 재사용 코드
- `shared/ui/`: 앱 전반에서 재사용하는 UI 조각
- `shared/layout/`: Header, Footer, DefaultLayout 같은 전역 레이아웃 구성요소
- `shared/providers/`: Client, Theme, Translation provider
- `shared/navigation/`: 전역 내비게이션 구성요소
- `features/`: auth, home, legal, not-found 같이 기능 또는 화면 단위로 응집된 코드

## Consequences

- 기능 단위 변경 시 탐색 범위가 줄어든다.
- 공용 코드와 화면 전용 코드의 경계가 더 명확해진다.
- import 경로가 한 번 크게 바뀌므로 초기 리팩터링 비용은 있다.
- 이후 신규 기능은 `features/<domain>` 아래에 추가하고, 범용화가 검증된 코드만 `shared/`로 올리는 기준을 따른다.
