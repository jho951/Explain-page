'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { AuthBootstrap, AuthGate } from '@/features/auth';
import { Header, Footer } from '@/shared/ui/layout';
import { FOOTER_EXCLUDED_PATHS, HEADER_EXCLUDED_PATHS } from '@/shared/config';
import type { ClientLayoutProviderProps } from './ClientContext.types';
import { normalizePath } from '@/shared/utils';

import styles from '@/shared/providers/client/ClientContext.module.css';

const NOT_FOUND_PAGE_MARKER = '[data-page-kind="not-found"]';

const stripLocalePrefix = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const segments = normalized.split('/');
  const maybeLocale = segments[1];

  if (maybeLocale && /^[a-z]{2}$/i.test(maybeLocale)) {
    const stripped = `/${segments.slice(2).join('/')}`;
    return normalizePath(stripped || '/');
  }

  return normalized;
};

const isExcludedPath = (pathname: string, excludedPaths: string[]) => {
  const normalized = normalizePath(pathname);
  return excludedPaths.some(path => normalized === path || normalized.startsWith(`${path}/`));
};

function ClientProvider({ children, modal }: ClientLayoutProviderProps) {
  const pathname = usePathname() ?? '/';
  const strippedPathname = stripLocalePrefix(pathname);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  useLayoutEffect(() => {
    const syncNotFoundState = () => {
      setIsNotFoundPage(Boolean(document.querySelector(NOT_FOUND_PAGE_MARKER)));
    };

    syncNotFoundState();

    const observer = new MutationObserver(syncNotFoundState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-page-kind'],
    });

    return () => observer.disconnect();
  }, [pathname]);

  const hideHeader = isExcludedPath(strippedPathname, HEADER_EXCLUDED_PATHS);
  const hideFooter = isExcludedPath(strippedPathname, FOOTER_EXCLUDED_PATHS) || isNotFoundPage;

  return (
    <>
      <AuthBootstrap />
      {!hideHeader && <Header pathname={pathname} />}
      <div className={clsx(styles.content, { [styles.withHeaderOffset]: !hideHeader })}>
        <AuthGate>{children}</AuthGate>
      </div>
      {modal}
      {!hideFooter && <Footer pathname={pathname} />}
    </>
  );
}

export { ClientProvider };
