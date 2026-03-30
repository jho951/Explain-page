import type { AuthUser } from '@/shared/api/user.types';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'anonymous';

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  initialized: boolean;
  error: string | null;
}

interface SetAuthStatePayload {
  user: AuthUser | null;
  status: AuthStatus;
  initialized: boolean;
  error?: string | null;
}

export type { AuthStatus, AuthState, SetAuthStatePayload };
