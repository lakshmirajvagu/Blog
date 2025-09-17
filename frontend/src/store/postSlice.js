// src/store/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch all posts (public feed)
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await api.get("/posts");
  return res.data.data || []; // backend returns { data: [...] }
});

// Fetch my own posts
export const fetchMyPosts = createAsyncThunk("posts/fetchMyPosts", async (userId) => {
  const res = await api.get(`/users/${userId}/posts`);
  return res.data || []; // backend returns an array directly
});

// Create new post
export const createPost = createAsyncThunk("posts/createPost", async (postData) => {
  const res = await api.post("/posts", postData);
  return res.data;
});

// Update post
export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, postData }) => {
  const res = await api.put(`/posts/${id}`, postData);
  return res.data;
});

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await api.delete(`/posts/${id}`);
  return id; // return deleted id
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],   // public feed
    myPosts: [], // logged-in user’s posts
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== Public posts =====
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ===== My posts =====
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ===== Create =====
      .addCase(createPost.fulfilled, (state, action) => {
        state.myPosts.unshift(action.payload);
        state.posts.unshift(action.payload); // also add to public feed
      })

      // ===== Update =====
      .addCase(updatePost.fulfilled, (state, action) => {
        // update in myPosts
        const idxMy = state.myPosts.findIndex((p) => p._id === action.payload._id);
        if (idxMy !== -1) state.myPosts[idxMy] = action.payload;

        // update in public feed too
        const idxFeed = state.posts.findIndex((p) => p._id === action.payload._id);
        if (idxFeed !== -1) state.posts[idxFeed] = action.payload;
      })

      // ===== Delete =====
      .addCase(deletePost.fulfilled, (state, action) => {
        state.myPosts = state.myPosts.filter((p) => p._id !== action.payload);
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
