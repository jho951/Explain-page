import {
  AUTH_EXCHANGE_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_ME_PATH,
} from '@/constants/auth';
import {
  buildGatewayUrl,
  clearBrowserAuthCookies,
  clearStoredAccessToken,
  getAccessTokenFromResponse,
  GatewayRequestError,
  isGatewayConfigured,
  requestGatewayJson,
  setAuthExchangeCompleted,
  setStoredAccessToken,
} from '@/libs/api-client';

interface AuthSession {
  authenticated: boolean;
  userId: string;
  role: string;
  sessionId: string;
}

interface AuthMeResponse {
  authenticated?: boolean;
  userId?: string;
  user_id?: string;
  id?: string;
  role?: string;
  sessionId?: string;
  session_id?: string;
}

const parseAuthSession = (payload: AuthMeResponse): AuthSession => {
  const userId = payload.userId ?? payload.user_id ?? payload.id ?? '';

  return {
    authenticated: payload.authenticated !== false,
    userId,
    role: payload.role ?? '',
    sessionId: payload.sessionId ?? payload.session_id ?? '',
  };
};

const AUTH_LOGIN_PAGE = process.env.NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE || 'editor';

const getGatewayLoginUrl = () => {
  const url = buildGatewayUrl(AUTH_LOGIN_PATH);
  url.searchParams.set('page', AUTH_LOGIN_PAGE);

  return url.toString();
};

const exchangeAuthTicket = async (ticket: string): Promise<void> => {
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

  const accessToken = await getAccessTokenFromResponse(response);
  if (accessToken) {
    setStoredAccessToken(accessToken);
  }
  setAuthExchangeCompleted(true);
  // Cookie-based exchange (204) is also a valid success path.
  return;
};

const fetchAuthMe = async (): Promise<AuthSession> => {
  const payload = await requestGatewayJson<AuthMeResponse>(AUTH_ME_PATH, {
    method: 'GET',
  });

  return parseAuthSession(payload);
};

const isGatewayLogoutConfigured = () => AUTH_LOGOUT_PATH.length > 0;

const logoutAuthSession = async () => {
  if (!isGatewayLogoutConfigured()) {
    throw new Error('Gateway logout route is not configured.');
  }

  try {
    await requestGatewayJson<void>(AUTH_LOGOUT_PATH, {
      method: 'POST',
    });
  } finally {
    clearBrowserAuthCookies();
    setAuthExchangeCompleted(false);
    clearStoredAccessToken();
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
export { GatewayRequestError };
export type { AuthSession };
