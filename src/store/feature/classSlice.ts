import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

export interface Room {
  id: number;
  room_number: string;
}

export interface Branch {
  id: number;
  branch_name: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface Class {
  id: number | null;
  teacher_id: number;
  room_id: number | null;
  branch_id: number;
  course_id: number;
  lesson: string;
  total_student: number;
  class_status?: string | null;
  status: string;
  isdeleted: 'enable' | 'disable';
  term?: string;
  time?: string;
  starting_date?: string;

  // Nested objects
  rooms?: Room;
  branches?: Branch;
  courses?: Course;
}


interface ClassState {
  classes: Class[];
  classloading: boolean;
  error: string | null;
}

// Fetch all classes
export const fetchClasses = createAsyncThunk<
  Class[],
  void,
  { rejectValue: string }
>('classes/fetchClasses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/instructor/class`, {
      withCredentials: true,
    });
    return response.data.classes as Class[];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch classes';
    return rejectWithValue(message);
  }
});

// Add a new class
export const addClass = createAsyncThunk<
  Class,
  Omit<Class, 'id' | 'isdeleted'>,
  { rejectValue: string }
>('classes/addClass', async (newClass, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/instructor/class`, newClass, {
      withCredentials: true,
    });
    return response.data.data[0] as Class; // assuming API returns inserted class inside data array
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to add class';
    return rejectWithValue(message);
  }
});



// Update existing class
export const updateClass = createAsyncThunk<
  Class,
  { id: number; data: Omit<Class, 'id' | 'isdeleted'> },
  { rejectValue: string }
>('classes/updateClass', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/instructor/class/${id}`, data, {
      withCredentials: true,
    });
    return response.data.data[0] as Class;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to update class';
    return rejectWithValue(message);
  }
});

// Soft delete class by setting isdeleted = "enable"
export const softDeleteClass = createAsyncThunk<
  Class,
  number,
  { rejectValue: string }
>('classes/softDeleteClass', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/instructor/class/${id}`,
      {
        data: { isdeleted: 'enable' },
        withCredentials: true,
      }
    );
    return response.data.data[0] as Class;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to soft delete class';
    return rejectWithValue(message);
  }
});

// pre end class by setting isdeleted = "enable"
export const preEndClass = createAsyncThunk<
  Class,
  number,
  { rejectValue: string }
>('classes/preEndClass', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/instructor/class/preEnd/${id}`,
      { status: 'pre-end' }, // optional data
      { withCredentials: true }
    );
    return response.data.data[0] as Class;
    
  }catch (error: unknown) {
    let errorMessage = 'Failed to pre end class';
  
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null &&
      'data' in (error as any).response &&
      typeof (error as any).response.data === 'object' &&
      (error as any).response.data !== null &&
      'error' in (error as any).response.data &&
      typeof (error as any).response.data.error === 'string'
    ) {
      errorMessage = (error as any).response.data.error;
    }
  
    return rejectWithValue(errorMessage);
  }
  
});



// Fetch classes by userId
export const fetchClassesByUserId = createAsyncThunk<
  Class[],
  number, // userId as a number
  { rejectValue: string }
>('classes/fetchClassesByUserId', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/instructor/class/${userId}`, {
      withCredentials: true,
    });
    // Adjust this based on your API response structure
    return response.data.data ?? response.data.classes ?? [];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch classes by user ID';
    return rejectWithValue(message);
  }
});



const initialState: ClassState = {
  classes: [],
  classloading: false,
  error: null,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchClasses
      .addCase(fetchClasses.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
        state.classloading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to fetch classes';
      })

      // addClass
      .addCase(addClass.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(addClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.classloading = false;
        state.classes.push(action.payload);
      })
      .addCase(addClass.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to add class';
      })

      // updateClass
      .addCase(updateClass.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.classloading = false;
        const index = state.classes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to update class';
      })

      // softDeleteClass
      .addCase(softDeleteClass.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(softDeleteClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.classloading = false;
        const index = state.classes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          // Mark the class as deleted in state
          state.classes[index].isdeleted = action.payload.isdeleted;
        }
      })
      .addCase(softDeleteClass.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to delete class';
      })
      // preEndClass
      .addCase(preEndClass.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(preEndClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.classloading = false;
        const index = state.classes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      })
      .addCase(preEndClass.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to pre end class';
      })
      
      // fetchClassesByUserId
      .addCase(fetchClassesByUserId.pending, (state) => {
        state.classloading = true;
        state.error = null;
      })
      .addCase(fetchClassesByUserId.fulfilled, (state, action: PayloadAction<Class[]>) => {
        state.classloading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClassesByUserId.rejected, (state, action) => {
        state.classloading = false;
        state.error = action.payload ?? 'Failed to fetch classes by user ID';
      });
  },
});

export const { clearError } = classSlice.actions;
export default classSlice.reducer;
