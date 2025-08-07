import { ButtonHTMLAttributes } from 'react';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggledIcon?: 'hamburger' | 'close';
  isToggled?: boolean;
  iconSize: number;
}

export type { MenuButtonProps };
