import React, { useState } from "react";
import "../styles/ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [flash, setFlash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlash("");

    const res = await fetch(`${API_URL}/api/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setFlash(data.message || "Check your email for reset instructions.");
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      {flash && <p className="flash-message">{flash}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;