// src/components/PostCard.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux"; // <-- import this
import { useNavigate } from "react-router-dom";
import EditPostForm from "./EditPostForm";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  // <-- get logged-in user
  const currentUser = useSelector((state) => state.user.me); 

  // check if logged-in user is the owner
  const isOwner = currentUser?._id === post.author?._id;

  if (!post) return null;

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
      {editing ? (
        <EditPostForm post={post} onClose={() => setEditing(false)} />
      ) : (
        <>
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

          {isOwner && (
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setEditing(true)}
                style={{ background: "orange", color: "white", padding: "0.3rem 0.7rem", borderRadius: "4px" }}
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
