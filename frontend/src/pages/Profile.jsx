// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "../store/userSlice";
import ProfileView from "../components/ProfileView";

export default function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="page profile-page">
      <ProfileView />
    </div>
  );
}
