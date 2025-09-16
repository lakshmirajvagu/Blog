// src/components/ProfileEditForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMe } from "../store/userSlice";

export default function ProfileEditForm({ onClose }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [name, setName] = useState(me?.name || "");
  const [bio, setBio] = useState(me?.bio || "");
  const [photoFile, setPhotoFile] = useState(null); // store actual File
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      // Only append file if user selected one
      if (photoFile) {
        formData.append("photo", photoFile); // MUST match backend upload.single('photo')
      }

      await dispatch(updateMe(formData)).unwrap();
      alert("Profile updated!");
      onClose();
    } catch (err) {
      alert("Update failed: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-edit-form">
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <div>
        <label>Profile Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
