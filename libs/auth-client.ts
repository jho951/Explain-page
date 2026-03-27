export { fetchCurrentUser as fetchAuthMe } from '@/api/user';
export {
  getGatewayLoginUrl as getSsoStartUrl,
  isGatewayConfigured as isSsoConfigured,
  logoutAuthSession,
  GatewayRequestError as SsoRequestError,
} from '@/api/auth';
export { fetchCurrentUser } from '@/api/user';
export type { AuthUser } from '@/api/user';
