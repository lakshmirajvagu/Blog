// src/components/Posts.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import Navbar from "./Navbar";

export default function Posts() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post) || { posts: [], loading: false };
  const { posts = [], loading } = postState;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.userName?.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="p-4 space-y-4">
      <Navbar />
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post._id} className="border p-4 rounded">
            <Link
              to={`/profile/${post.userId}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {post.userName}
            </Link>
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
