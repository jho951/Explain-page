'use client';

import { useRef, type CSSProperties } from 'react';
import { Button, Icon } from '@jho951/ui-components';

import { GNB } from '@/shared/config';
import { TITLE } from '@/shared/config';
import type { HeaderProps } from './Header.types';
import { Logo } from '../logo';
import { HeaderAuthActions } from './HeaderAuthActions';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import { ICON_BASE_PATH } from '@/shared/config';
import { useIsMobile } from '@/shared/hooks';
import { useAppSelector } from '@/shared/state/hooks';
import { useHeaderExpandedHeight } from './useHeaderExpandedHeight';
import { useHeaderMenuState } from './useHeaderMenuState';
import { useHeaderNavigation } from './useHeaderNavigation';

import styles from '@/shared/ui/header/Header.module.css';

function Header({ pathname }: HeaderProps) {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement | null>(null);
  const headerInnerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const authStatus = useAppSelector(state => state.auth.status);

  const {
    closeAll,
    desktopOpenIndex,
    isExpanded,
    openCategoryId,
    toggleCategory,
    toggleDesktopMenu,
    toggleMobileMenu,
  } = useHeaderMenuState({ headerRef });
  const { expandedHeight } = useHeaderExpandedHeight({
    headerInnerRef,
    isExpanded,
    isMobile,
    openCategoryId,
    panelRef,
  });
  const { handleLogin, handleLogout, navigate } = useHeaderNavigation({ closeAll });
  const isAuthenticated = authStatus === 'authenticated';
  const isAuthBusy = authStatus === 'loading';
  const showLogout = isAuthenticated;

  const headerStyle: CSSProperties | undefined =
    isMobile && expandedHeight
      ? ({ '--header-expanded-h': `${expandedHeight}px` } as CSSProperties)
      : undefined;

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isMobile && isExpanded ? styles.isExpanded : ''}`}
      style={headerStyle}
    >
      <div ref={headerInnerRef} className={styles.headerInner}>
        <div className={styles.homeBtn}>
          <Logo pathname={pathname} onClick={closeAll} text={TITLE} size={40} />
        </div>

        {!isMobile && (
          <nav className={styles.desktopNav} aria-label="global navigation">
            {GNB.map((menu, index) => (
              <HeaderDesktopNav
                key={menu.id}
                menu={menu}
                index={index}
                desktopOpenIndex={desktopOpenIndex}
                onNavigate={navigate}
                onToggleMenu={toggleDesktopMenu}
              />
            ))}
          </nav>
        )}

        <nav className={styles.gnbBtn} aria-label="Header actions">
          {!isMobile && (
            <HeaderAuthActions
              isAuthenticated={showLogout}
              isBusy={isAuthBusy}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          )}
          {isMobile && (
            <Button
              variant="text"
              type="button"
              className={`${styles.btn} ${styles.ghost}`}
              aria-label={isExpanded ? '메뉴 닫기' : '메뉴 열기'}
              aria-controls="ttHeaderPanel"
              aria-expanded={isExpanded}
              onClick={toggleMobileMenu}
            >
              {isExpanded ? (
                <Icon name="close" source="url" basePath={ICON_BASE_PATH} size={28} />
              ) : (
                <Icon name="hamburger" source="url" basePath={ICON_BASE_PATH} size={28} />
              )}
            </Button>
          )}
        </nav>
      </div>

      {isMobile && (
        <HeaderMobileMenu
          panelRef={panelRef}
          isExpanded={isExpanded}
          openCategoryId={openCategoryId}
          onNavigate={navigate}
          onLogin={handleLogin}
          isAuthenticated={showLogout}
          isAuthBusy={isAuthBusy}
          onLogout={handleLogout}
          onToggleCategory={toggleCategory}
        />
      )}
    </header>
  );
}

export { Header };
