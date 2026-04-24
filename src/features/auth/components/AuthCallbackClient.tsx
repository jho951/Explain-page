/* eslint-disable no-console */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@jho951/ui-components';

import { exchangeAuthTicket, fetchAuthSession } from '@/shared/api';
import {
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_EXCHANGE_PATH,
  AUTH_SESSION_PATH,
  START_FRONTEND_URL,
  normalizeRedirectPath,
} from '@/shared/config';
import type {
  AuthCallbackClientProps,
  CallbackStep,
} from '@/features/auth/components/AuthCallbackClient.types';
import { buildStartFrontendSignInUrl, GatewayRequestError } from '@/shared/lib';
import { resolveLocaleFromPathname } from '@/shared/utils';

const logAuthCallback = (event: string, detail?: unknown) => {
  console.log(`[auth-callback] ${event}`, detail ?? '');
};

function AuthCallbackClient({ callbackError, ticketParam, nextParam }: AuthCallbackClientProps) {
  logAuthCallback('render', { callbackError, hasTicketParam: Boolean(ticketParam), nextParam });
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState<CallbackStep>('idle');
  const locale = resolveLocaleFromPathname(nextParam ?? '/');
  const text = useMemo(
    () =>
      locale === 'en'
        ? {
            missingTicket: 'SSO callback ticket is missing. Please sign in again.',
            verifyFailed: 'Failed to validate Gateway login session.',
            retryHint: 'Please try again shortly.',
            retryLogin: 'Sign in again',
            exchanging: 'Exchanging auth ticket for session...',
            checking: 'Validating Gateway session...',
          }
        : {
            missingTicket: 'SSO callback ticket 이 없습니다. 다시 로그인해 주세요.',
            verifyFailed: 'Gateway 로그인 세션 확인에 실패했습니다.',
            retryHint: '잠시 후 다시 시도해 주세요.',
            retryLogin: '다시 로그인',
            exchanging: '인증 ticket을 세션으로 교환하고 있습니다...',
            checking: 'Gateway 세션을 확인하고 있습니다...',
          },
    [locale],
  );
  useEffect(() => {
    const nextPath = normalizeRedirectPath(nextParam) || AUTH_DEFAULT_NEXT_PATH;
    const restartUrl = buildStartFrontendSignInUrl(nextPath);
    logAuthCallback('effect:start', { nextPath, restartUrl, callbackError, ticketParam });

    if (callbackError) {
      logAuthCallback('effect:callback-error', { callbackError, restartUrl });
      setErrorMessage(`SSO callback error: ${callbackError}`);
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1500);
      return () => window.clearTimeout(timeoutId);
    }

    const ticket = ticketParam?.trim();
    if (!ticket) {
      logAuthCallback('effect:missing-ticket', { restartUrl });
      setErrorMessage(text.missingTicket);
      const timeoutId = window.setTimeout(() => {
        window.location.replace(restartUrl);
      }, 1200);
      return () => window.clearTimeout(timeoutId);
    }

    let cancelled = false;

    const completeSignIn = async () => {
      let currentStep: CallbackStep = 'exchange';
      logAuthCallback('completeSignIn:start', { currentStep, ticketLength: ticket.length });

      try {
        setStep('exchange');
        logAuthCallback('completeSignIn:exchange:start');
        await exchangeAuthTicket(ticket);
        logAuthCallback('completeSignIn:exchange:done');

        currentStep = 'auth-session';
        setStep('auth-session');
        logAuthCallback('completeSignIn:auth-session:start');
        const authSession = await fetchAuthSession();
        logAuthCallback('completeSignIn:auth-session:done', authSession);

        if (!cancelled) {
          const successRedirectUrl = START_FRONTEND_URL || nextPath;
          logAuthCallback('completeSignIn:success-redirect', { successRedirectUrl });
          setStep('done');
          window.location.replace(successRedirectUrl);
        }
      } catch (error) {
        logAuthCallback('completeSignIn:error', { currentStep, error });
        if (!cancelled) {
          const message =
            error instanceof GatewayRequestError
              ? `[${currentStep === 'exchange' ? AUTH_EXCHANGE_PATH : AUTH_SESSION_PATH} ${error.status}] ${error.message}`
              : error instanceof Error
                ? error.message
                : 'Failed to verify gateway auth.';

          setErrorMessage(`${text.verifyFailed} ${message || text.retryHint}`);
          window.setTimeout(() => {
            logAuthCallback('completeSignIn:error-restart', { restartUrl });
            window.location.replace(restartUrl);
          }, 1500);
        }
      }
    };

    void completeSignIn();

    return () => {
      cancelled = true;
      logAuthCallback('effect:cleanup');
    };
  }, [callbackError, nextParam, text, ticketParam]);

  return (
    <main>
      <p>{errorMessage || (step === 'exchange' ? text.exchanging : text.checking)}</p>
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
          {text.retryLogin}
        </Button>
      ) : null}
    </main>
  );
}

export default AuthCallbackClient;
