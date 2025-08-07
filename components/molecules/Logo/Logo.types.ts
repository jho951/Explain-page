/**
 * 로고 전용 아이콘에서 텍스트 표시를 위한 props입니다.
 * 예: <Logo text="Skill Blog" />
 */
interface LogoProps {
  text: string;
  pathname: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export type { LogoProps };
