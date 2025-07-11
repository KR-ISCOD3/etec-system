import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../api/config';  // Adjust path accordingly

interface User {
  id: number;
  email: string;
  role: string;
  // add more user fields if needed
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  identifier: string;
  password: string;
}

// Async thunk: login
export const login = createAsyncThunk<
  void, // no data needed on success, backend sets cookie
  LoginPayload,
  { rejectValue: string }
>('auth/login', async ({ identifier, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // send cookies
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      return rejectWithValue(data.message || 'Login failed');
    }
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Async thunk: fetch user info
export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/protected`, {
      credentials: 'include',
    });
    if (!res.ok) {
      return rejectWithValue('Not authenticated');
    }
    const data = await res.json();
    return data.user as User;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Async thunk: logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // optional: clear error state
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? 'Failed to fetch user';
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
