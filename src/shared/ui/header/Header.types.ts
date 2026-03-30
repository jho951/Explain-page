/**
 * 페이지의 현재 경로를 나타냅니다.
 * `/home`, `/about`, `/ko/page` 등과 같이 사용할 수 있습니다.
 */

import { NavigationTreeLink } from '@/shared/types';

/**
 * PathProps interface 설명을 여기에 작성하세요.
 */
interface PathProps {
  pathname: string;
}

/**
 * 글로벌 네비게이션 바(GNB)에 표시될 메뉴 트리입니다.
 * 대분류, 소분류 등의 메뉴 구조에 사용됩니다.
 */
/**
 * GnbProps interface 설명을 여기에 작성하세요.
 */
interface GnbProps {
  gnb: NavigationTreeLink[];
}

/**
 * Header에 전달되는 기본 props입니다.
 * 현재는 PathProps와 동일하지만, 추후 확장될 수 있으므로 유지합니다.
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
/**
 * HeaderProps type 설명을 여기에 작성하세요.
 */
type HeaderProps = PathProps;

/**
 * GNB 및 현재 경로 정보를 모두 포함한 Header 내비게이션 구성 props입니다.
 */
/**
 * HeaderNavProps interface 설명을 여기에 작성하세요.
 */
interface HeaderGnbProps extends GnbProps, PathProps {}

/**
 * 로고 클릭 시 동작과 현재 경로 정보를 포함하는 props입니다.
 */
/**
 * LogoProps interface 설명을 여기에 작성하세요.
 */
interface LogoProps extends PathProps {
  /**
   * 로고 클릭 시 호출되는 콜백 함수입니다.
   */
  onClick: () => void;
}

/**
 * Header 메뉴 오픈 상태 및 토글 콜백을 포함하는 props입니다.
 * 햄버거 메뉴 등 토글형 메뉴 UI 구성에 사용됩니다.
 */
/**
 * HeaderMenuOpenProps interface 설명을 여기에 작성하세요.
 */
interface HeaderMenuOpenProps {
  /**
   * 현재 메뉴가 열려 있는지 여부입니다.
   */
  isOpen: boolean;

  /**
   * 메뉴 열기/닫기를 제어하는 콜백입니다.
   */
  onClick: () => void;
}

/**
 * 로그인/회원가입 등 인증 관련 링크 정보입니다.
 */
/**
 * HeaderAuthLink interface 설명을 여기에 작성하세요.
 */
interface HeaderAuthLink {
  /**
   * 고유 식별자 (React key 등에 사용)
   */
  id: number;

  /**
   * 이동할 링크 주소입니다.
   */
  href: string;

  /**
   * 표시될 링크 텍스트입니다.
   */
  label: string;
}

export type {
  PathProps,
  GnbProps,
  HeaderProps,
  LogoProps,
  HeaderGnbProps,
  HeaderMenuOpenProps,
  HeaderAuthLink,
};
