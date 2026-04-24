import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { isGatewayLogoutConfigured, logoutAuthSession } from '@/shared/api';
import {
  buildStartFrontendSignInUrl,
  clearBrowserAuthCookies,
  setAuthExchangeCompleted,
} from '@/shared/lib';

interface UseHeaderNavigationOptions {
  closeAll: () => void;
}

const isExternalHref = (href: string, target?: string) =>
  target === '_blank' ||
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('mailto:');

function useHeaderNavigation({ closeAll }: UseHeaderNavigationOptions) {
  const router = useRouter();
  const canLogout = isGatewayLogoutConfigured();

  const navigate = useCallback(
    (href: string, target?: string) => {
      if (isExternalHref(href, target)) {
        window.open(href, target ?? '_blank', 'noopener,noreferrer');
      } else {
        router.push(href);
      }

      closeAll();
    },
    [closeAll, router],
  );

  const handleLogin = useCallback(() => {
    navigate(buildStartFrontendSignInUrl());
  }, [navigate]);

  const handleLogout = useCallback(async () => {
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
  }, [canLogout, closeAll]);

  return {
    handleLogin,
    handleLogout,
    navigate,
  };
}

export { useHeaderNavigation };
