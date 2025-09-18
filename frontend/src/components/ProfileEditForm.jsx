import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMe } from "../store/userSlice";
import "../styles/ProfileEditForm.scss"; // Import styles

export default function ProfileEditForm({ onClose }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [name, setName] = useState(me?.name || "");
  const [bio, setBio] = useState(me?.bio || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      if (photoFile) {
        formData.append("photo", photoFile);
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
      <div className="form-group">
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Profile Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
