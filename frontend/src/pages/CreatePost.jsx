// src/pages/CreatePost.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/CreatePost.scss"; // Optional: for custom styles

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 👇 FIXED: match your store key (check store/index.js)
  const { loading, error } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    try {
      await dispatch(createPost({ title, content })).unwrap();
      navigate("/posts"); // redirect after success
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="create-post">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="5"
            placeholder="Write your post content..."
          ></textarea>
        </div>

        {error && <p className="text-red-500">Error: {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
