import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import courseReducer from "./feature/courseSlice"; // import course reducer
import branchReducer from "./feature/branchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer, // add courses slice here
    branches: branchReducer,
  },
});

// Export types for TypeScript hooks usage:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
