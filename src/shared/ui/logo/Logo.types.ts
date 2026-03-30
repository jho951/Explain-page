interface LogoProps {
  text: string;
  pathname: string;
  size: number;
  homeAriaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export type { LogoProps };
