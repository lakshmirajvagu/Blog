// src/components/PostCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  if (!post) return null;

  // Use author instead of user
  const authorName = post.author?.name || "Unknown User";
  const authorId = post.author?._id;

  const goToUserProfile = () => {
    if (authorId) navigate(`/profile/${authorId}`);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem" }}>{post.title}</h3>
      <p style={{ marginBottom: "0.5rem" }}>{post.content}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{ color: "blue", cursor: authorId ? "pointer" : "default" }}
          onClick={goToUserProfile}
        >
          {authorName}
        </span>
        {post.tags && <span>{post.tags.join(", ")}</span>}
      </div>
    </div>
  );
}
