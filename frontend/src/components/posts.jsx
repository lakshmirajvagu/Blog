import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

import { Link } from "react-router-dom";
import PostCard from "./PostCard";

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded">
          <Link
            to={`/profile/${post.userId}`} // Navigate to user profile
            className="font-semibold text-blue-600 hover:underline"
          >
            {post.userName}
          </Link>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
