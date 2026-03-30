import type { AuthState } from '@/shared/state/slices/auth-slice.types';

interface RootState {
  auth: AuthState;
}

type AppStore = ReturnType<typeof import('@/shared/state').makeStore>;
type AppDispatch = AppStore['dispatch'];

export type { AppStore, RootState, AppDispatch };
