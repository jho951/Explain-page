'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { AuthBootstrap, AuthGate } from '@/features/auth/components';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { FOOTER_EXCLUDED_PATHS, HEADER_EXCLUDED_PATHS } from '@/constants/navigation.ts';
import { ClientLayoutProviderProps } from '@/shared/providers/client/ClientContext.types.ts';
import styles from '@/shared/providers/client/ClientContext.module.css';

const normalizePath = (pathname: string) => {
  if (!pathname) return '/';
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
};

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

  const hideHeader = isExcludedPath(strippedPathname, HEADER_EXCLUDED_PATHS);
  const hideFooter = isExcludedPath(strippedPathname, FOOTER_EXCLUDED_PATHS);

  return (
    <>
      <AuthBootstrap />
      {!hideHeader && <Header pathname={pathname} />}
      <div
        className={clsx(styles.content, {
          [styles.withHeaderOffset]: !hideHeader,
        })}
      >
        <AuthGate>{children}</AuthGate>
      </div>
      {modal}
      {!hideFooter && <Footer pathname={pathname} />}
    </>
  );
}

export { ClientProvider };
