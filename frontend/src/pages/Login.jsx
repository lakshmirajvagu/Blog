import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { auth, googleProvider } from "../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      dispatch(setToken(idToken));
      dispatch(setUser({ uid: user.uid, email: user.email, name: user.displayName, photoURL: user.photoURL }));
      localStorage.setItem("idToken", idToken);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      dispatch(setToken(idToken));
      dispatch(setUser({ uid: user.uid, email: user.email, name: user.displayName, photoURL: user.photoURL }));
      localStorage.setItem("idToken", idToken);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <AuthForm onSubmit={handleSubmit} onGoogle={handleGoogle} loading={loading} />
    </div>
  );
}
