import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

export interface Course {
  id: number;
  name: string;
  // Add other fields as necessary
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const fetchCourses = createAsyncThunk<
  Course[],
  void,
  { rejectValue: string }
>('courses/fetchCourses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/courses`, {
      withCredentials: true,
    });
    console.log("Fetched Courses Response:", response.data);
    return response.data.courses as Course[];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch courses';
    return rejectWithValue(message);
  }
});

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(
        fetchCourses.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? 'Failed to fetch courses';
        }
      );
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
