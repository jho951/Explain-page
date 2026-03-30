'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import {
  AUTH_CONSUMER_CALLBACK_URL,
  AUTH_LOGIN_PAGE,
  AUTH_LOGIN_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  SUPPORTED_LOCALES,
  normalizeRedirectPath,
} from '@/shared/config';
import type { AuthGateProps } from '@/features/auth/components/AuthGate.types';
import { buildGatewayUrl } from '@/shared/lib';
import { useAppSelector } from '@/shared/state/hooks';
import { normalizePath } from '@/shared/utils';

const stripLocalePrefix = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const segments = normalized.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    firstSegment &&
    SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
  ) {
    const strippedPath = `/${segments.slice(1).join('/')}`;
    return normalizePath(strippedPath || '/');
  }

  return normalized;
};

const isProtectedPath = (pathname: string) => {
  const strippedPath = stripLocalePrefix(pathname);
  return strippedPath === '/app' || strippedPath.startsWith('/app/');
};

const buildSsoStartUrl = (nextPath: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const callbackUrl = new URL(AUTH_CONSUMER_CALLBACK_URL);
  callbackUrl.searchParams.set('next', normalizedNextPath);

  const loginUrl = buildGatewayUrl(AUTH_LOGIN_PATH);
  loginUrl.searchParams.set('page', AUTH_LOGIN_PAGE);
  loginUrl.searchParams.set('redirect_uri', callbackUrl.toString());
  return loginUrl.toString();
};

function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname() ?? '/';
  const protectedPath = isProtectedPath(pathname);
  const { initialized, status } = useAppSelector(state => state.auth);
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (
      protectedPath &&
      initialized === true &&
      status !== 'loading' &&
      isAuthenticated === false
    ) {
      const nextPath = `${window.location.pathname}${window.location.search}`;
      window.location.replace(buildSsoStartUrl(nextPath));
      return;
    }
  }, [initialized, isAuthenticated, protectedPath, status]);

  if (protectedPath && (!initialized || !isAuthenticated)) return null;

  return <>{children}</>;
}

export { AuthGate };
