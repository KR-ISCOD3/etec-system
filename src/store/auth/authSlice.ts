import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
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

interface RegisterPayload {
  fullname_en: string;
  email: string;
  password: string;
}

// Utility function for error handling
function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'An unknown error occurred';
}

export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async ({ email, fullname_en, password }, { rejectWithValue }) => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/register`,
      { fullname_en, email, password },
      { withCredentials: true }
    );
  } catch (err: unknown) {
    const message =
      axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : extractErrorMessage(err);
    return rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  void,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async ({ identifier, password }, { rejectWithValue }) => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/login`,
      { identifier, password },
      { withCredentials: true }
    );
  } catch (err: unknown) {
    const message =
      axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : extractErrorMessage(err);
    return rejectWithValue(message);
  }
});

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/protected`, {
      withCredentials: true,
    });
    return res.data.user as User;
  } catch (err: unknown) {
    const message =
      axios.isAxiosError(err) && err.response?.status === 401
        ? 'Not authenticated'
        : extractErrorMessage(err);
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : extractErrorMessage(err);
      return rejectWithValue(message);
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
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
