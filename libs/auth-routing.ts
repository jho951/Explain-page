import {
  AUTH_CALLBACK_PATH,
  AUTH_DEFAULT_NEXT_PATH,
  AUTH_SIGN_IN_PATH,
  normalizeRedirectPath,
} from '@/constants/auth';
import { PROJECT_URL, START_FRONTEND_URL } from '@/constants/security';

const buildStartFrontendSignInUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const signInBaseUrl = START_FRONTEND_URL || PROJECT_URL;
  const signInUrl = new URL(AUTH_SIGN_IN_PATH, signInBaseUrl);
  signInUrl.searchParams.set('next', normalizedNextPath);
  return signInUrl.toString();
};

const isExternalStartFrontend = () =>
  Boolean(START_FRONTEND_URL) && START_FRONTEND_URL !== PROJECT_URL;

const buildCallbackUrl = (nextPath?: string) => {
  const normalizedNextPath = normalizeRedirectPath(nextPath) || AUTH_DEFAULT_NEXT_PATH;
  const callbackUrl = new URL(AUTH_CALLBACK_PATH, PROJECT_URL);
  callbackUrl.searchParams.set('next', normalizedNextPath);
  return callbackUrl.toString();
};

export { buildCallbackUrl, buildStartFrontendSignInUrl, isExternalStartFrontend };
