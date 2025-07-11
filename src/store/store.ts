// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Export types for TypeScript use in hooks:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
