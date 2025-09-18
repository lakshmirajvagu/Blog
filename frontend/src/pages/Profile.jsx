// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../store/userSlice";
import { fetchMyPosts, deletePost } from "../store/postSlice";
import ProfileView from "../components/ProfileView";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { me, status } = useSelector((state) => state.user);
  const { myPosts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (me?._id) {
      dispatch(fetchMyPosts(me._id));
    }
  }, [me, dispatch]);

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!me) return <p>User not found</p>;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className="page profile-page">
      <Navbar />
      <ProfileView />

      <h3>My Posts</h3>
      {myPosts.length === 0 && <p>No posts yet.</p>}
      {myPosts.map((post) => (
        <div key={post._id} style={{ marginBottom: "1rem" }}>
          <PostCard post={post} />
          <button onClick={() => handleDelete(post._id)}>Delete</button>
          {/* later you can add an Edit button to open a form */}
        </div>
      ))}
    </div>
  );
}
