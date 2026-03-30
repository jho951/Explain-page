'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { fetchAuthMe } from '@/shared/api';
import { AUTH_CALLBACK_PATH } from '@/shared/config';
import { setAuthExchangeCompleted } from '@/shared/lib';
import { useAppDispatch } from '@/shared/state/hooks';
import { setAuthState } from '@/shared/state/slices/auth-slice';
import { normalizePath } from '@/shared/utils';

function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const pathname = normalizePath(usePathname() ?? '/');

  useEffect(() => {
    if (pathname === AUTH_CALLBACK_PATH) return;

    let cancelled = false;

    dispatch(
      setAuthState({
        user: null,
        status: 'loading',
        initialized: false,
        error: null,
      }),
    );

    const bootstrap = async () => {
      try {
        const authSession = await fetchAuthMe();
        if (!authSession.authenticated) throw new Error('Gateway auth state is not authenticated.');
        setAuthExchangeCompleted(true);
        if (!authSession.user) throw new Error('Gateway auth profile is missing.');
        if (cancelled) return;

        dispatch(
          setAuthState({
            user: authSession.user,
            status: 'authenticated',
            initialized: true,
            error: null,
          }),
        );
      } catch (error) {
        if (cancelled) return;

        dispatch(
          setAuthState({
            user: null,
            status: 'anonymous',
            initialized: true,
            error: error instanceof Error ? error.message : 'Failed to load auth session.',
          }),
        );
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [dispatch, pathname]);

  return null;
}

export { AuthBootstrap };
