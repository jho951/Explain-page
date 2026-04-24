import type { RefObject } from 'react';
import type { Locale, NavigationTreeLink } from '@/shared/types';

interface HeaderAuthActionsProps {
  mobile?: boolean;
  locale?: Locale;
  isAuthenticated?: boolean;
  isBusy?: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

interface HeaderMobileMenuProps {
  panelRef: RefObject<HTMLDivElement | null>;
  locale?: Locale;
  isExpanded: boolean;
  openCategoryId: string | null;
  onToggleCategory: (categoryId: string) => void;
  onNavigate: (href: string, target?: string) => void;
  isAuthenticated: boolean;
  isAuthBusy: boolean;
  onLogout: () => void;
}

interface HeaderDesktopNavProps {
  menu: NavigationTreeLink;
  index: number;
  desktopOpenIndex: number | null;
  onToggleMenu: (index: number) => void;
  onNavigate: (href: string, target?: string) => void;
}

export type { HeaderAuthActionsProps, HeaderDesktopNavProps, HeaderMobileMenuProps };
