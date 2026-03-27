import { GATEWAY_BASE_URL } from '@/constants/security';
import {
  AUTH_ACCESS_TOKEN_STORAGE_KEY,
  AUTH_EXCHANGE_DONE_STORAGE_KEY,
  AUTH_ME_PATH,
  AUTH_REFRESH_PATH,
} from '@/constants/auth';

const GATEWAY_API_PREFIXES = [
  '/auth/',
  '/users/',
  '/blocks/',
  '/permissions/',
  '/v1/auth/',
  '/v1/users/',
  '/v1/blocks/',
  '/v1/permissions/',
] as const;

class GatewayRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'GatewayRequestError';
    this.status = status;
  }
}

interface TokenPayload {
  accessToken?: string;
  access_token?: string;
  token?: string;
}

const isGatewayConfigured = () => Boolean(GATEWAY_BASE_URL);

const assertGatewayPath = (path: string) => {
  if (!path.startsWith('/')) {
    throw new Error(`Gateway API path must start with "/": ${path}`);
  }

  if (
    !GATEWAY_API_PREFIXES.some(prefix => path === prefix.slice(0, -1) || path.startsWith(prefix))
  ) {
    throw new Error(`Unsupported gateway API path: ${path}`);
  }
};

const buildGatewayUrl = (path: string) => {
  if (!GATEWAY_BASE_URL) {
    throw new Error('Gateway base URL is not configured.');
  }

  assertGatewayPath(path);
  return new URL(path, GATEWAY_BASE_URL);
};

const canUseBrowserStorage = () =>
  typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const normalizeAccessToken = (token?: string | null) => {
  if (!token) {
    return '';
  }

  return token.trim().replace(/^Bearer\s+/i, '');
};

const getStoredAccessToken = () => {
  if (!canUseBrowserStorage()) {
    return '';
  }

  return normalizeAccessToken(localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY));
};

const setStoredAccessToken = (token: string) => {
  if (!canUseBrowserStorage()) {
    return;
  }

  const normalizedToken = normalizeAccessToken(token);
  if (!normalizedToken) {
    localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, normalizedToken);
};

const clearStoredAccessToken = () => {
  if (!canUseBrowserStorage()) {
    return;
  }

  localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
};

const hasCompletedAuthExchange = () => {
  if (!canUseBrowserStorage()) {
    return false;
  }

  return localStorage.getItem(AUTH_EXCHANGE_DONE_STORAGE_KEY) === 'true';
};

const setAuthExchangeCompleted = (completed: boolean) => {
  if (!canUseBrowserStorage()) {
    return;
  }

  if (completed) {
    localStorage.setItem(AUTH_EXCHANGE_DONE_STORAGE_KEY, 'true');
    return;
  }

  localStorage.removeItem(AUTH_EXCHANGE_DONE_STORAGE_KEY);
};

const AUTH_COOKIE_NAMES = ['refresh_token', 'sso_session', 'ACCESS_TOKEN', 'JSESSIONID'] as const;

const clearBrowserAuthCookies = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const cookieAttributes = [
    'path=/',
    'Max-Age=0',
    'expires=Thu, 01 Jan 1970 00:00:00 GMT',
  ] as const;

  for (const name of AUTH_COOKIE_NAMES) {
    document.cookie = `${name}=; ${cookieAttributes.join('; ')}`;
  }
};

const buildGatewayHeaders = (headers?: HeadersInit, includeAuthHeader = true) => {
  const merged = new Headers(headers);
  if (!merged.has('Content-Type')) {
    merged.set('Content-Type', 'application/json');
  }

  const accessToken = getStoredAccessToken();
  if (includeAuthHeader && accessToken && !merged.has('Authorization')) {
    merged.set('Authorization', `Bearer ${accessToken}`);
  }

  return merged;
};

const parseAccessToken = (payload: unknown): string => {
  if (!payload || typeof payload !== 'object') {
    return '';
  }

  const tokenPayload = payload as TokenPayload;
  return normalizeAccessToken(
    tokenPayload.accessToken ?? tokenPayload.access_token ?? tokenPayload.token ?? '',
  );
};

const getResponseText = async (response: Response) => {
  try {
    return await response.text();
  } catch {
    return '';
  }
};

const getResponseJson = async (response: Response): Promise<unknown> => {
  const responseText = await getResponseText(response);
  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    return null;
  }
};

const getAccessTokenFromResponse = async (response: Response) => {
  const authorization =
    response.headers.get('Authorization') || response.headers.get('authorization');
  if (authorization?.startsWith('Bearer ')) {
    return normalizeAccessToken(authorization);
  }

  const payload = await getResponseJson(response);
  return parseAccessToken(payload);
};

const throwGatewayError = async (response: Response): Promise<never> => {
  const responseText = await getResponseText(response);
  const message = responseText || `Gateway request failed: ${response.status}`;
  throw new GatewayRequestError(message, response.status);
};

const executeGatewayRequest = async (
  path: string,
  init?: RequestInit,
  includeAuthHeader = true,
): Promise<Response> =>
  fetch(buildGatewayUrl(path), {
    ...init,
    credentials: 'include',
    headers: buildGatewayHeaders(init?.headers, includeAuthHeader),
  });

let refreshInFlight: Promise<void> | null = null;

const refreshAccessToken = async () => {
  if (!hasCompletedAuthExchange()) {
    throw new GatewayRequestError('Auth exchange is required before refresh.', 428);
  }

  if (refreshInFlight) {
    await refreshInFlight;
    return;
  }

  refreshInFlight = (async () => {
    const refreshResponse = await executeGatewayRequest(
      AUTH_REFRESH_PATH,
      { method: 'POST' },
      false,
    );
    if (!refreshResponse.ok) {
      clearStoredAccessToken();
      await throwGatewayError(refreshResponse);
    }

    const refreshedToken = await getAccessTokenFromResponse(refreshResponse);
    if (refreshedToken) {
      setStoredAccessToken(refreshedToken);
    } else {
      clearStoredAccessToken();
    }
  })();

  try {
    await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
};

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const requestGatewayJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  if ((path === AUTH_ME_PATH || path === AUTH_REFRESH_PATH) && !hasCompletedAuthExchange()) {
    throw new GatewayRequestError(`Auth exchange is required before calling ${path}.`, 428);
  }

  const response = await executeGatewayRequest(path, init, true);
  if (response.ok) {
    return parseJsonResponse<T>(response);
  }

  if (response.status === 401 && path !== AUTH_REFRESH_PATH && hasCompletedAuthExchange()) {
    await refreshAccessToken();
    const retryResponse = await executeGatewayRequest(path, init, true);
    if (retryResponse.ok) {
      return parseJsonResponse<T>(retryResponse);
    }
    await throwGatewayError(retryResponse);
  }

  await throwGatewayError(response);
  throw new GatewayRequestError('Unexpected gateway response state.', response.status);
};

export {
  buildGatewayUrl,
  clearBrowserAuthCookies,
  clearStoredAccessToken,
  getAccessTokenFromResponse,
  hasCompletedAuthExchange,
  isGatewayConfigured,
  requestGatewayJson,
  setAuthExchangeCompleted,
  setStoredAccessToken,
  GatewayRequestError,
};
