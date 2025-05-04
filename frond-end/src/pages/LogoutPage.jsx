import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem("userToken");

    // clear other stored user data
    localStorage.removeItem("userData");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default LogoutPage;