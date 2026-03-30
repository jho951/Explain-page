import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AuthState, SetAuthStatePayload } from '@/shared/state/slices/auth-slice.types';

const initialState: AuthState = {
  user: null,
  status: 'idle',
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<SetAuthStatePayload>) {
      state.user = action.payload.user;
      state.status = action.payload.status;
      state.initialized = action.payload.initialized;
      state.error = action.payload.error ?? null;
    },
    clearAuthState(state) {
      state.user = null;
      state.status = 'anonymous';
      state.initialized = true;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

const { setAuthState, clearAuthState, clearAuthError } = authSlice.actions;

export { setAuthState, clearAuthState, clearAuthError };
export default authSlice.reducer;
