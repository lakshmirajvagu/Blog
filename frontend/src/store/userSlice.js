// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch current user
export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const res = await api.get("/users/me");
  return res.data;
});

// Update user profile
export const updateMe = createAsyncThunk("user/updateMe", async (formData) => {
  const res = await api.put("/users/me", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    me: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => { state.status = "loading"; })
      .addCase(fetchMe.fulfilled, (state, action) => { state.status = "succeeded"; state.me = action.payload; })
      .addCase(fetchMe.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(updateMe.pending, (state) => { state.status = "loading"; })
      .addCase(updateMe.fulfilled, (state, action) => { state.status = "succeeded"; state.me = action.payload; })
      .addCase(updateMe.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; });
  },
});

export default userSlice.reducer;
