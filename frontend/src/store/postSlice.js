import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async actions (placeholders)
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // TODO: implement API call
  return [{ id: 1, title: "First Post", content: "Hello World" }];
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  // TODO: implement API call
  return post;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default postSlice.reducer;
