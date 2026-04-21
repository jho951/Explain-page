import type { AuthUser } from '@/shared/api/user.types';

interface AuthSession {
  authenticated: boolean;
  sessionId: string;
  user: AuthUser | null;
}

interface RawAuthUser {
  id?: string;
  userId?: string;
  user_id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  avatar_url?: string;
  roles?: string[];
  role?: string;
  status?: string;
}

interface RawAuthMeResponse extends RawAuthUser {
  authenticated?: boolean;
  sessionId?: string;
  session_id?: string;
  user?: RawAuthUser | null;
}

export type { AuthSession, RawAuthMeResponse };
