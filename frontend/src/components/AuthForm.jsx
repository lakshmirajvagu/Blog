import React, { useState } from "react";

export default function AuthForm({ onSubmit, loading, onGoogle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
    >
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit" disabled={loading}>
        Login
      </button>

      <hr />
      <button type="button" onClick={onGoogle} disabled={loading}>
        Continue with Google
      </button>
    </form>
  );
}
