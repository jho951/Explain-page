import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/shared/state/slices/auth-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });
export type { AppStore, RootState, AppDispatch } from '@/shared/state/store.types';
