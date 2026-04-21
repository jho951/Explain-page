/* eslint-disable no-console */
import { GATEWAY_BASE_URL } from '@/shared/config';
import { removeTrailingSlash } from '@/shared/utils';
import {
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_EXCHANGE_DONE_STORAGE_KEY,
  AUTH_REFRESH_PATH,
  normalizeRedirectPath,
} from '@/shared/config';
import { buildStartFrontendSignInUrl } from '@/shared/lib/auth-routing';

const GATEWAY_API_PREFIXES = [
  '/auth/',
  '/users/',
  '/documents/',
  '/editor-operations/',
  '/admin/',
  '/oauth2/',
  '/login/oauth2/',
  '/.well-known/jwks.json',
  '/health',
  '/ready',
  '/error',
] as const;

class GatewayRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'GatewayRequestError';
    this.status = status;
  }
}

const logApiClient = (event: string, detail?: unknown) => {
  console.log(`[api-client] ${event}`, detail ?? '');
};

const isGatewayConfigured = () => Boolean(GATEWAY_BASE_URL);

const assertGatewayPath = (path: string) => {
  if (!path.startsWith('/')) {
    throw new Error(`Gateway API path must start with "/": ${path}`);
  }

  const normalizedPath = path.startsWith('/v1/') ? path.slice(3) : path;

  if (
    !GATEWAY_API_PREFIXES.some(
      prefix => normalizedPath === prefix.slice(0, -1) || normalizedPath.startsWith(prefix),
    )
  ) {
    throw new Error(`Unsupported gateway API path: ${path}`);
  }
};

const buildGatewayUrl = (path: string) => {
  if (!GATEWAY_BASE_URL) throw new Error('Gateway base URL is not configured.');
  assertGatewayPath(path);

  const baseUrl = new URL(GATEWAY_BASE_URL);
  const basePath = removeTrailingSlash(baseUrl.pathname);
  const alreadyPrefixed =
    Boolean(basePath) && (path === basePath || path.startsWith(`${basePath}/`));
  const resolvedPath = alreadyPrefixed ? path : `${basePath}${path}`;

  const url = new URL(`${baseUrl.origin}${resolvedPath}`);
  logApiClient('buildGatewayUrl', { path, url: url.toString() });
  return url;
};

const canUseBrowserStorage = () =>
  typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const hasCompletedAuthExchange = () => {
  if (!canUseBrowserStorage()) {
    return false;
  }

  const completed = localStorage.getItem(AUTH_EXCHANGE_DONE_STORAGE_KEY) === 'true';
  logApiClient('hasCompletedAuthExchange', { completed });
  return completed;
};

const setAuthExchangeCompleted = (completed: boolean) => {
  if (!canUseBrowserStorage()) {
    return;
  }

  if (completed) {
    localStorage.setItem(AUTH_EXCHANGE_DONE_STORAGE_KEY, 'true');
    logApiClient('setAuthExchangeCompleted', { completed: true });
    return;
  }

  localStorage.removeItem(AUTH_EXCHANGE_DONE_STORAGE_KEY);
  logApiClient('setAuthExchangeCompleted', { completed: false });
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
  logApiClient('buildGatewayHeaders', {
    includeAuthHeader,
    hasContentType: merged.has('Content-Type'),
  });

  return merged;
};

const getResponseText = async (response: Response) => {
  try {
    return await response.text();
  } catch {
    return '';
  }
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

const clearAuthStateAndRedirectToLogin = () => {
  setAuthExchangeCompleted(false);

  if (typeof window === 'undefined') {
    return;
  }

  const nextPath =
    normalizeRedirectPath(`${window.location.pathname}${window.location.search}`) ||
    AUTH_DEFAULT_NEXT_PATH;
  logApiClient('clearAuthStateAndRedirectToLogin', { nextPath });
  logApiClient('redirectToStartFrontendSignIn', { nextPath });
  window.location.replace(buildStartFrontendSignInUrl(nextPath));
};

const refreshAccessToken = async () => {
  logApiClient('refreshAccessToken:start');
  if (!hasCompletedAuthExchange()) {
    throw new GatewayRequestError('Auth exchange is required before refresh.', 428);
  }

  if (refreshInFlight) {
    logApiClient('refreshAccessToken:await-existing');
    await refreshInFlight;
    return;
  }

  refreshInFlight = (async () => {
    const refreshResponse = await executeGatewayRequest(
      AUTH_REFRESH_PATH,
      { method: 'POST' },
      false,
    );
    logApiClient('refreshAccessToken:response', {
      status: refreshResponse.status,
      ok: refreshResponse.ok,
    });
    if (!refreshResponse.ok) {
      clearAuthStateAndRedirectToLogin();
      await throwGatewayError(refreshResponse);
    }
    logApiClient('refreshAccessToken:done', { ok: refreshResponse.ok });
  })();

  try {
    await refreshInFlight;
  } catch (error) {
    if (error instanceof GatewayRequestError) throw error;
    clearAuthStateAndRedirectToLogin();
    throw error;
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
  logApiClient('requestGatewayJson:start', {
    path,
    method: init?.method ?? 'GET',
  });
  if (path === AUTH_REFRESH_PATH && !hasCompletedAuthExchange()) {
    throw new GatewayRequestError(`Auth exchange is required before calling ${path}.`, 428);
  }

  const response = await executeGatewayRequest(path, init, true);
  logApiClient('requestGatewayJson:response', {
    path,
    status: response.status,
    ok: response.ok,
  });
  if (response.ok) {
    return parseJsonResponse<T>(response);
  }

  await throwGatewayError(response);
  throw new GatewayRequestError('Unexpected gateway response state.', response.status);
};

const refreshGatewaySession = async () => {
  await refreshAccessToken();
};

export {
  buildGatewayUrl,
  clearBrowserAuthCookies,
  hasCompletedAuthExchange,
  isGatewayConfigured,
  requestGatewayJson,
  refreshGatewaySession,
  setAuthExchangeCompleted,
  GatewayRequestError,
};
