// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    navigate("/login");
  };

  return (
    <div className="nav-links">
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/posts" className="font-bold text-lg">
        BlogApp
      </Link>
      <div className="flex items-center">
        <Link to="/posts" className="hover:underline" style={{ marginRight: '10px' }}>
          All Posts
        </Link>
        <Link to="/create" className="hover:underline" style={{ marginRight: '10px' }}>
          Create Post
        </Link>
        <Link to="/profile" className="hover:underline" style={{marginRight: '10px' }}>
          My Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
    </div>
  );
}
