// features/rooms/roomSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';

export interface Branch {
  id: number;
  branch_name: string;
}

export interface Room {
  id: number;
  room_number: string;
  branch_id: number;
  branches?: Branch; // Optional nested branch
}

interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

// Thunk to fetch rooms with joined branches
export const fetchRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>('rooms/fetchRooms', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/rooms`, {
      withCredentials: true,
    });
    console.log('Fetched Rooms Response:', response.data);
    return response.data.rooms as Room[];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch rooms';
    return rejectWithValue(message);
  }
});

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch rooms';
      });
  },
});

export const { clearError } = roomSlice.actions;
export default roomSlice.reducer;
