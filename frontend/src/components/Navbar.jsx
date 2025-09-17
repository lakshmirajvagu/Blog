// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/posts" className="font-bold text-lg">
        BlogApp
      </Link>
      <div className="flex space-x-6 items-center">
        <Link to="/posts" className="hover:underline">
          All Posts
        </Link>
        <Link to="/create" className="hover:underline">
          Create Post
        </Link>
        <Link to="/profile" className="hover:underline">
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
  );
}
