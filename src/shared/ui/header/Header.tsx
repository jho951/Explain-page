'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { useRouter } from 'next/navigation';
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
import { buildStartFrontendSignInUrl } from '@/shared/lib';
import { clearBrowserAuthCookies, setAuthExchangeCompleted } from '@/shared/lib';
import { isGatewayLogoutConfigured, logoutAuthSession } from '@/shared/api';
import { useAppSelector } from '@/shared/state/hooks';

import styles from '@/shared/ui/header/Header.module.css';

function Header({ pathname }: HeaderProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const authStatus = useAppSelector(state => state.auth.status);

  const [isExpanded, setIsExpanded] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const isAuthenticated = authStatus === 'authenticated';
  const isAuthBusy = authStatus === 'loading';
  const canLogout = isGatewayLogoutConfigured();
  const showLogout = isAuthenticated;

  const closeAll = useCallback(() => {
    setIsExpanded(false);
    setOpenCategoryId(null);
    setDesktopOpenIndex(null);
  }, []);

  const isExternalHref = (href: string, target?: string) =>
    target === '_blank' ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:');

  const navigate = (href: string, target?: string) => {
    if (isExternalHref(href, target)) {
      window.open(href, target ?? '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }

    closeAll();
  };

  const handleLogout = async () => {
    try {
      if (canLogout) {
        await logoutAuthSession();
      }
    } finally {
      clearBrowserAuthCookies();
      setAuthExchangeCompleted(false);
      closeAll();
      window.location.replace('/');
    }
  };

  const updateExpandedHeight = useCallback(() => {
    const headerEl = headerRef.current;
    const panelEl = panelRef.current;
    if (!headerEl || !panelEl || !isMobile || !isExpanded) return;

    const next = Math.ceil(headerEl.scrollHeight);

    setExpandedHeight(prev => (prev === next ? prev : next));
  }, [isExpanded, isMobile]);

  useLayoutEffect(() => {
    if (!isMobile || !isExpanded) {
      setExpandedHeight(null);
      return;
    }

    const raf = requestAnimationFrame(updateExpandedHeight);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isExpanded, openCategoryId, updateExpandedHeight]);

  useEffect(() => {
    if (!isMobile || !isExpanded || !panelRef.current) return;

    const observer = new ResizeObserver(() => updateExpandedHeight());
    observer.observe(panelRef.current);

    return () => observer.disconnect();
  }, [isMobile, isExpanded, updateExpandedHeight]);

  useEffect(() => {
    if (desktopOpenIndex === null) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setDesktopOpenIndex(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopOpenIndex(null);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopOpenIndex]);

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
      <div className={styles.headerInner}>
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
                onToggleMenu={nextIndex =>
                  setDesktopOpenIndex(prev => (prev === nextIndex ? null : nextIndex))
                }
              />
            ))}
          </nav>
        )}

        <nav className={styles.gnbBtn} aria-label="Header actions">
          {!isMobile && (
            <HeaderAuthActions
              isAuthenticated={showLogout}
              isBusy={isAuthBusy}
              onLogin={() => navigate(buildStartFrontendSignInUrl())}
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
              onClick={() => setIsExpanded(prev => !prev)}
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
          isAuthenticated={showLogout}
          isAuthBusy={isAuthBusy}
          onLogout={handleLogout}
          onToggleCategory={categoryId =>
            setOpenCategoryId(prev => (prev === categoryId ? null : categoryId))
          }
        />
      )}
    </header>
  );
}

export { Header };
