import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

export interface Branch {
  id: number;
  branch_name: string;
  // Add other fields if needed
}

interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch branches
export const fetchBranches = createAsyncThunk<
  Branch[],
  void,
  { rejectValue: string }
>('branches/fetchBranches', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/branches`, {
      withCredentials: true,
    });
    console.log("Fetched Branches Response:", response.data);
    return response.data.branches as Branch[]; // adjust if your API response differs

  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch branches';
    return rejectWithValue(message);
  }
});

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action: PayloadAction<Branch[]>) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch branches';
      });
  },
});

export const { clearError } = branchSlice.actions;
export default branchSlice.reducer;
