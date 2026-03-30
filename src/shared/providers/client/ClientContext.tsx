'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { AuthBootstrap, AuthGate } from '@/features/auth';
import { Header, Footer } from '@/shared/ui/layout';
import { FOOTER_EXCLUDED_PATHS, HEADER_EXCLUDED_PATHS } from '@/shared/config';
import type { ClientLayoutProviderProps } from './ClientContext.types';
import { normalizePath } from '@/shared/utils';

import styles from '@/shared/providers/client/ClientContext.module.css';

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
      <div className={clsx(styles.content, { [styles.withHeaderOffset]: !hideHeader })}>
        <AuthGate>{children}</AuthGate>
      </div>
      {modal}
      {!hideFooter && <Footer pathname={pathname} />}
    </>
  );
}

export { ClientProvider };
