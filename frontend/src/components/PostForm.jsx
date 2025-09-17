// src/components/PostForm.jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../store/postSlice";

export default function PostForm({ editingPost, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      dispatch(updatePost({ id: editingPost._id, postData: { title, content } }));
    } else {
      dispatch(createPost({ title, content }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingPost ? "Update" : "Create"} Post
      </button>
    </form>
  );
}
