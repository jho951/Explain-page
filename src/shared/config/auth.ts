import { SUPPORTED_LOCALES } from './locale';
import { normalizePath } from '@/shared/utils';

const AUTH_SIGN_IN_PATH = '/signin';
const AUTH_CALLBACK_PATH = '/auth/callback';
const AUTH_DEFAULT_NEXT_PATH = '/';
const AUTH_LOGIN_PATH = process.env.NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PATH || '/v1/auth/sso/start';
const AUTH_EXCHANGE_PATH =
  process.env.NEXT_PUBLIC_GATEWAY_AUTH_EXCHANGE_PATH || '/v1/auth/exchange';
const AUTH_ME_PATH = process.env.NEXT_PUBLIC_GATEWAY_AUTH_ME_PATH || '/v1/auth/me';
const AUTH_REFRESH_PATH = process.env.NEXT_PUBLIC_GATEWAY_AUTH_REFRESH_PATH || '/v1/auth/refresh';
const AUTH_LOGOUT_PATH = process.env.NEXT_PUBLIC_GATEWAY_AUTH_LOGOUT_PATH || '/v1/auth/logout';
const AUTH_EXCHANGE_DONE_STORAGE_KEY =
  process.env.NEXT_PUBLIC_AUTH_EXCHANGE_DONE_STORAGE_KEY || 'auth_exchange_done';
const AUTH_LOGIN_PAGE = process.env.NEXT_PUBLIC_GATEWAY_AUTH_LOGIN_PAGE || 'explain';

const normalizeRedirectPath = (value?: string | null) => {
  if (!value) return '/';
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }
  if (!decoded.startsWith('/') || decoded.startsWith('//')) return '/';

  const normalized = normalizePath(decoded);
  const segments = normalized.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const strippedPath =
    firstSegment && SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
      ? normalizePath(`/${segments.slice(1).join('/')}`)
      : normalized;

  if (
    strippedPath === AUTH_CALLBACK_PATH ||
    strippedPath.startsWith(`${AUTH_CALLBACK_PATH}/`) ||
    strippedPath === AUTH_SIGN_IN_PATH ||
    strippedPath.startsWith(`${AUTH_SIGN_IN_PATH}/`)
  )
    return '/';

  if (
    firstSegment &&
    SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number]) &&
    segments.length === 1
  )
    return '/';

  return normalized;
};

export {
  AUTH_SIGN_IN_PATH,
  AUTH_CALLBACK_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_LOGIN_PATH,
  AUTH_EXCHANGE_PATH,
  AUTH_ME_PATH,
  AUTH_REFRESH_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_EXCHANGE_DONE_STORAGE_KEY,
  AUTH_LOGIN_PAGE,
  normalizeRedirectPath,
};
