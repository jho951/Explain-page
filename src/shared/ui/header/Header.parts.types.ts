import type { MenuItem } from '@jho951/ui-components';
import type { RefObject } from 'react';
import type { Locale } from '@/shared/types';

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
  desktopOpenIndex: number | null;
  onToggleMenu: (index: number) => void;
  onCloseMenu: () => void;
  getMenuItems: (index: number) => MenuItem[];
}

export type { HeaderAuthActionsProps, HeaderDesktopNavProps, HeaderMobileMenuProps };
