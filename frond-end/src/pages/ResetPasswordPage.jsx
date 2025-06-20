import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [flash, setFlash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash("");

    const res = await fetch(`${API_URL}/api/users/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setFlash(data.message);
    if (res.ok) setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      {flash && <p className="flash-message">{flash}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;