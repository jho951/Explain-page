import { removeTrailingSlash } from '@/shared/utils';

const TITLE = process.env.NEXT_PUBLIC_TITLE!;
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION!;
const COPY = process.env.NEXT_PUBLIC_COPY!;
const PROJECT_URL = process.env.NEXT_PUBLIC_START_FRONTEND_URL;

const normalizeHost = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === '127.0.0.1') {
      parsed.hostname = 'localhost';
    }
    return parsed.toString();
  } catch {
    return url;
  }
};

const resolveGatewayBaseUrl = () => {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SSO_BASE_URL || 'http://localhost:8080';
  const normalized = removeTrailingSlash(normalizeHost(rawBaseUrl));

  if (normalized.endsWith('/v1')) return normalized;
  return `${normalized}/v1`;
};

const GATEWAY_BASE_URL = resolveGatewayBaseUrl();
const START_FRONTEND_URL = process.env.NEXT_PUBLIC_START_FRONTEND_URL
  ? removeTrailingSlash(normalizeHost(process.env.NEXT_PUBLIC_START_FRONTEND_URL))
  : undefined;
const AUTH_CONSUMER_CALLBACK_URL = removeTrailingSlash(
  normalizeHost(
    process.env.NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL || 'http://localhost:5173/auth/callback',
  ),
);

export {
  TITLE,
  DESCRIPTION,
  COPY,
  PROJECT_URL,
  GATEWAY_BASE_URL,
  START_FRONTEND_URL,
  AUTH_CONSUMER_CALLBACK_URL,
};
