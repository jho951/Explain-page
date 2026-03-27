'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@jho951/ui-components';

import { exchangeAuthTicket, fetchAuthMe, GatewayRequestError } from '@/api/auth';
import { fetchCurrentUser } from '@/api/user';
import {
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_EXCHANGE_PATH,
  AUTH_ME_PATH,
  normalizeRedirectPath,
} from '@/constants/auth';
import { buildStartFrontendSignInUrl } from '@/libs/auth-routing';
import { useAppDispatch } from '@/store/hooks';
import { setAuthState } from '@/store/slices/auth-slice';

type CallbackStep = 'idle' | 'exchange' | 'auth-me' | 'user-me' | 'done';

interface AuthCallbackClientProps {
  callbackError?: string;
  ticketParam?: string;
  nextParam?: string;
}

function AuthCallbackClient({ callbackError, ticketParam, nextParam }: AuthCallbackClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState<CallbackStep>('idle');

  useEffect(() => {
    const nextPath = normalizeRedirectPath(nextParam) || AUTH_DEFAULT_NEXT_PATH;
    const restartUrl = buildStartFrontendSignInUrl(nextPath);

    if (callbackError) {
      setErrorMessage(`SSO callback error: ${callbackError}`);
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1500);
      return () => window.clearTimeout(timeoutId);
    }

    const ticket = ticketParam?.trim();
    if (!ticket) {
      setErrorMessage('SSO callback ticket 이 없습니다. 다시 로그인해 주세요.');
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1500);
      return () => window.clearTimeout(timeoutId);
    }

    let cancelled = false;

    const completeSignIn = async () => {
      let currentStep: CallbackStep = 'exchange';

      try {
        setStep('exchange');
        await exchangeAuthTicket(ticket);

        currentStep = 'auth-me';
        setStep('auth-me');
        const authMe = await fetchAuthMe();

        if (!authMe.authenticated) {
          throw new Error('Gateway auth state is not authenticated.');
        }

        currentStep = 'user-me';
        setStep('user-me');
        const user = await fetchCurrentUser();

        if (!cancelled) {
          dispatch(
            setAuthState({
              user,
              status: 'authenticated',
              initialized: true,
              error: null,
            }),
          );
          setStep('done');
          router.replace(nextPath);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof GatewayRequestError
              ? `[${currentStep === 'exchange' ? AUTH_EXCHANGE_PATH : currentStep === 'auth-me' ? AUTH_ME_PATH : '/users/me'} ${error.status}] ${error.message}`
              : error instanceof Error
                ? error.message
                : 'Failed to verify gateway auth.';

          setErrorMessage(
            `Gateway 로그인 세션 확인에 실패했습니다. ${message || '잠시 후 다시 시도해 주세요.'}`,
          );
          window.setTimeout(() => {
            window.location.replace(restartUrl);
          }, 1500);
        }
      }
    };

    void completeSignIn();

    return () => {
      cancelled = true;
    };
  }, [callbackError, dispatch, nextParam, router, ticketParam]);

  return (
    <main>
      <p>
        {errorMessage ||
          (step === 'exchange'
            ? '인증 ticket을 세션으로 교환하고 있습니다...'
            : step === 'user-me'
              ? '사용자 정보를 확인하고 있습니다...'
              : 'Gateway 인증 상태를 확인하고 있습니다...')}
      </p>
      {errorMessage ? (
        <Button
          type="button"
          variant="primary"
          onClick={() =>
            window.location.replace(
              buildStartFrontendSignInUrl(
                normalizeRedirectPath(nextParam) || AUTH_DEFAULT_NEXT_PATH,
              ),
            )
          }
        >
          다시 로그인
        </Button>
      ) : null}
    </main>
  );
}

export default AuthCallbackClient;
