import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eyeService from "./eyeService";

const initialState = {
  myEntries: [],
  sharedEntries: [],
  loading: false,
  error: null,
};

// Fetch entries created by the logged-in user
export const fetchMyEntries = createAsyncThunk(
  "eye/my",
  async (_, thunkAPI) => {
    try {
      return await eyeService.getMyEntries();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch my entries"
      );
    }
  }
);

// Fetch entries shared with the user
export const fetchSharedEntries = createAsyncThunk(
  "eye/shared",
  async (_, thunkAPI) => {
    try {
      return await eyeService.getSharedEntries();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch shared entries"
      );
    }
  }
);

// Create a new entry
export const createEntry = createAsyncThunk(
  "eye/create",
  async (entryData, thunkAPI) => {
    try {
      return await eyeService.createEntry(entryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create entry"
      );
    }
  }
);

// Share an entry with emails
export const shareEntry = createAsyncThunk(
  "eye/share",
  async ({ entryId, emails }, thunkAPI) => {
    try {
      return await eyeService.shareEntry(entryId, emails);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to share entry"
      );
    }
  }
);

const eyeSlice = createSlice({
  name: "eye",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // My Entries
      .addCase(fetchMyEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.myEntries = action.payload;
      })
      .addCase(fetchMyEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Shared Entries
      .addCase(fetchSharedEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSharedEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.sharedEntries = action.payload;
      })
      .addCase(fetchSharedEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Entry
      .addCase(createEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.myEntries.push(action.payload);
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Share Entry
      .addCase(shareEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(shareEntry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(shareEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eyeSlice.reducer;
