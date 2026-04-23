/* eslint-disable no-console */
import {
  AUTH_EXCHANGE_PATH,
  AUTH_LOGIN_PAGE,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
  AUTH_SESSION_PATH,
} from '@/shared/config';
import type { AuthMeResponse, AuthSessionValidationResponse } from '@/shared/api/auth.types';
import type { AuthUser } from '@/shared/api/user.types';
import {
  buildGatewayUrl,
  buildCallbackUrl,
  clearBrowserAuthCookies,
  hasCompletedAuthExchange,
  GatewayRequestError,
  isGatewayConfigured,
  refreshGatewaySession,
  requestGatewayJson,
  setAuthExchangeCompleted,
} from '@/shared/lib';
const logAuthApi = (event: string, detail?: unknown) => {
  console.log(`[auth-api] ${event}`, detail ?? '');
};

const requestWithRefreshFallback = async <T>(
  request: () => Promise<T>,
  label: string,
): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    const shouldFallbackRefresh =
      error instanceof GatewayRequestError && error.status === 401 && hasCompletedAuthExchange();

    if (!shouldFallbackRefresh) {
      throw error;
    }

    logAuthApi(`${label}:fallback-refresh:start`);
    await refreshGatewaySession();
    logAuthApi(`${label}:fallback-refresh:done`);
    return request();
  }
};

const parseAuthUser = (payload: AuthMeResponse): AuthUser => {
  const user: AuthUser = {
    id: payload.id ?? '',
    email: payload.email ?? '',
    name: payload.name ?? payload.email ?? '',
    avatarUrl: payload.avatarUrl ?? undefined,
    roles: Array.isArray(payload.roles) ? payload.roles : [],
    status: payload.status,
  };

  if (!user.id && !user.email && !user.name && user.roles.length === 0 && !user.status) {
    throw new Error('Gateway auth profile is missing.');
  }

  return user;
};

const getGatewayLoginUrl = (nextPath?: string) => {
  const url = buildGatewayUrl(AUTH_LOGIN_PATH);
  url.searchParams.set('page', AUTH_LOGIN_PAGE);
  url.searchParams.set('redirect_uri', buildCallbackUrl(nextPath).toString());

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

const fetchAuthSession = async (): Promise<AuthSessionValidationResponse> => {
  logAuthApi('fetchAuthSession:start');

  const payload = await requestWithRefreshFallback(
    () =>
      requestGatewayJson<AuthSessionValidationResponse>(AUTH_SESSION_PATH, {
        method: 'GET',
      }),
    'fetchAuthSession',
  );

  logAuthApi('fetchAuthSession:payload', payload);

  if (payload.authenticated !== true) {
    throw new GatewayRequestError('Gateway session is not authenticated.', 401);
  }

  return payload;
};

const fetchAuthMe = async (): Promise<AuthUser> => {
  logAuthApi('fetchAuthMe:start');
  const authMePath = `${AUTH_ME_PATH}?page=${encodeURIComponent(AUTH_LOGIN_PAGE)}`;
  const payload = await requestWithRefreshFallback(
    () =>
      requestGatewayJson<AuthMeResponse>(authMePath, {
        method: 'GET',
      }),
    'fetchAuthMe',
  );
  logAuthApi('fetchAuthMe:payload', payload);

  const user = parseAuthUser(payload);
  logAuthApi('fetchAuthMe:parsed', user);
  return user;
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
  fetchAuthSession,
  getGatewayLoginUrl,
  isGatewayConfigured,
  isGatewayLogoutConfigured,
  logoutAuthSession,
};
