import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../api/config'; // Adjust path if needed

interface User {
  id: number;
  name?: string;
  email: string;
  role: string;
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

// Utility function for error handling
function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "An unknown error occurred";
}

// Async thunk: login
export const login = createAsyncThunk<
  void, // return type
  LoginPayload, // argument type
  { rejectValue: string } // thunkAPI type
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
  } catch (err: unknown) {
    return rejectWithValue(extractErrorMessage(err));
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
    console.log(data);
    return data.user as User;
  } catch (err: unknown) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

// Async thunk: logout
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        return rejectWithValue('Logout failed');
      }
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Logout failed';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
