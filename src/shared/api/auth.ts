/* eslint-disable no-console */
import {
  AUTH_EXCHANGE_PATH,
  AUTH_LOGIN_PAGE,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
} from '@/shared/config';
import type { RawAuthMeResponse, AuthSession } from '@/shared/api/auth.types';
import {
  buildGatewayUrl,
  clearBrowserAuthCookies,
  hasCompletedAuthExchange,
  GatewayRequestError,
  isGatewayConfigured,
  refreshGatewaySession,
  requestGatewayJson,
  setAuthExchangeCompleted,
} from '@/shared/lib';
import { AUTH_CONSUMER_CALLBACK_URL } from '@/shared/config';

const logAuthApi = (event: string, detail?: unknown) => {
  console.log(`[auth-api] ${event}`, detail ?? '');
};

const parseAuthSession = (payload: RawAuthMeResponse): AuthSession => {
  const resolvedUser = payload.user ?? payload;
  const userId = resolvedUser.userId ?? resolvedUser.user_id ?? resolvedUser.id ?? '';
  const email = resolvedUser.email ?? '';
  const name = resolvedUser.name ?? email ?? '';
  const avatarUrl = resolvedUser.avatarUrl ?? resolvedUser.avatar_url;
  const roles = Array.isArray(resolvedUser.roles)
    ? resolvedUser.roles
    : resolvedUser.role
      ? [resolvedUser.role]
      : [];
  const hasUserProfile = Boolean(userId || email || name || roles.length > 0);

  return {
    authenticated: payload.authenticated !== false,
    sessionId: payload.sessionId ?? payload.session_id ?? '',
    user: hasUserProfile
      ? {
          id: userId,
          email,
          name,
          avatarUrl,
          roles,
        }
      : null,
  };
};

const getGatewayLoginUrl = () => {
  const url = buildGatewayUrl(AUTH_LOGIN_PATH);
  url.searchParams.set('page', AUTH_LOGIN_PAGE);
  url.searchParams.set('redirect_uri', AUTH_CONSUMER_CALLBACK_URL);

  const resolved = url.toString();
  logAuthApi('getGatewayLoginUrl', { resolved });
  return resolved;
};

const exchangeAuthTicket = async (ticket: string): Promise<void> => {
  logAuthApi('exchangeAuthTicket:start', {
    hasTicket: Boolean(ticket),
    ticketLength: ticket.length,
  });
  const response = await fetch(buildGatewayUrl(AUTH_EXCHANGE_PATH), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticket }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new GatewayRequestError(responseText || 'Gateway request failed.', response.status);
  }
  logAuthApi('exchangeAuthTicket:response', { status: response.status, ok: response.ok });
  setAuthExchangeCompleted(true);
  logAuthApi('exchangeAuthTicket:done');
  return;
};

const fetchAuthMe = async (): Promise<AuthSession> => {
  logAuthApi('fetchAuthMe:start');
  try {
    const payload = await requestGatewayJson<RawAuthMeResponse>(AUTH_ME_PATH, {
      method: 'GET',
    });
    logAuthApi('fetchAuthMe:payload', payload);

    const session = parseAuthSession(payload);
    logAuthApi('fetchAuthMe:parsed', session);
    return session;
  } catch (error) {
    const shouldFallbackRefresh =
      error instanceof GatewayRequestError && error.status === 401 && hasCompletedAuthExchange();

    if (!shouldFallbackRefresh) {
      throw error;
    }

    logAuthApi('fetchAuthMe:fallback-refresh:start');
    await refreshGatewaySession();
    logAuthApi('fetchAuthMe:fallback-refresh:done');

    const retriedPayload = await requestGatewayJson<RawAuthMeResponse>(AUTH_ME_PATH, {
      method: 'GET',
    });
    logAuthApi('fetchAuthMe:retry-payload', retriedPayload);

    const retriedSession = parseAuthSession(retriedPayload);
    logAuthApi('fetchAuthMe:retry-parsed', retriedSession);
    return retriedSession;
  }
};

const isGatewayLogoutConfigured = () => AUTH_LOGOUT_PATH.length > 0;

const logoutAuthSession = async () => {
  logAuthApi('logoutAuthSession:start');
  if (!isGatewayLogoutConfigured()) throw new Error('Gateway logout route is not configured.');

  try {
    await requestGatewayJson<void>(AUTH_LOGOUT_PATH, {
      method: 'POST',
    });
  } finally {
    clearBrowserAuthCookies();
    setAuthExchangeCompleted(false);
    logAuthApi('logoutAuthSession:cleanup-done');
  }
};

export {
  exchangeAuthTicket,
  fetchAuthMe,
  getGatewayLoginUrl,
  isGatewayConfigured,
  isGatewayLogoutConfigured,
  logoutAuthSession,
};
