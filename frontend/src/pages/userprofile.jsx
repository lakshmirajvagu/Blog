// src/pages/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function UserProfile() {
  const { id } = useParams(); // user ID from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userRes = await api.get(`/users/${id}`); // get user info
        setUser(userRes.data);

        const postsRes = await api.get(`users/${id}/posts`); // get user's posts
        setPosts(postsRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div style={{ margin: "2rem auto" }}>
      <Navbar />
      <div style={{ marginBottom: "1px" }}>
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt={user.name}
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <h2>{user.name}</h2>
        <p>{user.bio || "No bio available."}</p>
      </div>

      <h3>User's Posts</h3>
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
