import {
  AUTH_CONSUMER_CALLBACK_URL,
  AUTH_CALLBACK_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_SIGN_IN_PATH,
  normalizeRedirectPath,
} from '@/shared/config';
import { PROJECT_URL } from '@/shared/config';

const getConsumerOrigin = () => {
  try {
    return new URL(AUTH_CONSUMER_CALLBACK_URL).origin;
  } catch {
    return PROJECT_URL || 'http://localhost:3000';
  }
};

const buildStartFrontendSignInUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const signInBaseUrl = getConsumerOrigin();
  const signInUrl = new URL(AUTH_SIGN_IN_PATH, signInBaseUrl);
  signInUrl.searchParams.set('next', normalizedNextPath);
  return signInUrl.toString();
};

const isExternalStartFrontend = () => false;

const buildCallbackUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const callbackUrl = new URL(AUTH_CALLBACK_PATH, getConsumerOrigin());
  callbackUrl.searchParams.set('next', normalizedNextPath);
  return callbackUrl.toString();
};

export { buildCallbackUrl, buildStartFrontendSignInUrl, isExternalStartFrontend };
