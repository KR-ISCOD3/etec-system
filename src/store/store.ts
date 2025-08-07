import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import courseReducer from "./feature/courseSlice"; // import course reducer
import branchReducer from "./feature/branchSlice";
import roomReducer from "./feature/roomSlice";
import classReducer from "./feature/classSlice";
import stuReducer from "./feature/stuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer, // add courses slice here
    branches: branchReducer,
    rooms: roomReducer,
    class: classReducer,
    stu: stuReducer,
  },
});

// Export types for TypeScript hooks usage:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
