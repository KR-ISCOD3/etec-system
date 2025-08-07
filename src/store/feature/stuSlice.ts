import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

type AxiosErrorResponse = {
  response?: {
    data?: {
      error?: string;
    };
  };
};

export interface Student {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  teacher_id: number;
  class_id: number;
  created_at?: string;
  updated_at?: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

// 🔸 Async thunk to create student
export const createStudent = createAsyncThunk<
  Student,
  Omit<Student, 'id' | 'created_at' | 'updated_at'>,
  { rejectValue: string }
>('students/createStudent', async (newStudent, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/instructor/class/students`,
      newStudent,
      { withCredentials: true }
    );
    return response.data.student as Student; // assuming backend returns { student: { ... } }
  } catch (error: unknown) {
    const err = error as AxiosErrorResponse;
    const errorMessage = err?.response?.data?.error ?? 'Failed to create student';
    return rejectWithValue(errorMessage);
  }
});

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearStudentError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create student';
      });
  },
});

export const { clearStudentError } = studentSlice.actions;
export default studentSlice.reducer;
