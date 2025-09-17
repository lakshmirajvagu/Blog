// src/components/EditPostForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../store/postSlice";

export default function EditPostForm({ post, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        updatePost({
          id: post._id,
          postData: { title, content, tags: tags.split(",").map(t => t.trim()) }
        })
      ).unwrap(); // unwrap to catch errors
      onClose(); // close form only after successful save
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags, comma separated" />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" disabled={loading} style={{ background: "green", color: "white" }}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
