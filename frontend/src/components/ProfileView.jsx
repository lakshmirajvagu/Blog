// src/components/ProfileView.jsx
import React, { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { useSelector } from "react-redux";

export default function ProfileView() {
  const { me } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);

  if (!me) return <p>Loading...</p>;

  return (
    <div className="profile-view" style={{ marginBottom: "2rem" }}>
      <img src={me.photoURL} alt="Profile" width={150} />
      <h2>{me.name}</h2>
      <p>{me.email}</p>
      <p>{me.bio}</p>
      <button onClick={() => setEditing(true)}>Edit Profile</button>

      {editing && <ProfileEditForm onClose={() => setEditing(false)} />}
    </div>
  );
}
