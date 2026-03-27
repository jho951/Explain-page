'use client';

import { useEffect } from 'react';

import { fetchAuthMe } from '@/api/auth';
import { fetchCurrentUser } from '@/api/user';
import { hasCompletedAuthExchange } from '@/libs/api-client';
import { useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/slices/auth-slice';

function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
      if (!hasCompletedAuthExchange()) {
        if (cancelled) {
          return;
        }

        dispatch(
          setAuthState({
            user: null,
            status: 'anonymous',
            initialized: true,
            error: null,
          }),
        );
        return;
      }

      try {
        const authSession = await fetchAuthMe();
        if (!authSession.authenticated) {
          throw new Error('Gateway auth state is not authenticated.');
        }

        const user = await fetchCurrentUser();

        if (cancelled) {
          return;
        }

        dispatch(
          setAuthState({
            user,
            status: 'authenticated',
            initialized: true,
            error: null,
          }),
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

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
  }, [dispatch]);

  return null;
}

export { AuthBootstrap };
