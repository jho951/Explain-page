const TITLE = process.env.NEXT_PUBLIC_TITLE!;
const DESCRIPTION = process.env.NEXT_PUBLIC_DESCRIPTION!;
const COPY = process.env.NEXT_PUBLIC_COPY!;
const PROJECT_URL = process.env.NEXT_PUBLIC_SITE || 'http://localhost:3000';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const KAKAO_SECRET_KEY = process.env.KAKAO_CLIENT_ID;
const GOOGLE_CLIENT_KEY = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_KEY = process.env.GITHUB_CLIENT_ID;
const GITHUB_SECRET_KEY = process.env.GITHUB_CLIENT_SECRET;
const NEXTAUTH_SECRET_KEY = process.env.NEXTAUTH_SECRET;
const resolveGatewayBaseUrl = () => {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_GATEWAY_BASE_URL ||
    process.env.NEXT_PUBLIC_SSO_BASE_URL ||
    'http://localhost:8080';
  const normalized = rawBaseUrl.replace(/\/+$/, '');

  if (normalized.endsWith('/v1')) {
    return normalized;
  }

  return `${normalized}/v1`;
};

const GATEWAY_BASE_URL = resolveGatewayBaseUrl();
const START_FRONTEND_URL = process.env.NEXT_PUBLIC_START_FRONTEND_URL?.replace(/\/$/, '');
const AUTH_CONSUMER_CALLBACK_URL = (
  process.env.NEXT_PUBLIC_AUTH_CONSUMER_CALLBACK_URL ||
  process.env.NEXT_PUBLIC_SSO_CONSUMER_CALLBACK_URL ||
  ''
).replace(/\/$/, '');
const SSO_SESSION_COOKIE_NAME = process.env.SSO_SESSION_COOKIE_NAME || 'sso_session';

const NODE_ENV = process.env.NODE_ENV;

export {
  TITLE,
  DESCRIPTION,
  COPY,
  PROJECT_URL,
  NODE_ENV,
  OPENAI_API_KEY,
  KAKAO_SECRET_KEY,
  GOOGLE_CLIENT_KEY,
  GOOGLE_SECRET_KEY,
  GITHUB_CLIENT_KEY,
  GITHUB_SECRET_KEY,
  NEXTAUTH_SECRET_KEY,
  GATEWAY_BASE_URL,
  START_FRONTEND_URL,
  AUTH_CONSUMER_CALLBACK_URL,
  SSO_SESSION_COOKIE_NAME,
};
