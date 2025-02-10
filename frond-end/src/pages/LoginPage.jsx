import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "./../styles/LoginPage.css"; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("userToken", data.token); // Store token for authentication
        navigate("/home"); 
      } else {
        setErrorMessage(data.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-page vh-100 d-flex align-items-center justify-content-center">
      <div className="card bg-dark text-white p-4 card-container">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 title login-title">Login</h2>

          {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-3 cus-input-field">
              <label htmlFor="email" className="form-label cus-form-label">Student Email:</label>
              <input
                type="email"
                className="form-control form-input-control"
                id="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3 cus-input-field">
              <label htmlFor="password" className="form-label cus-form-label">Password:</label>
              <input
                type="password"
                className="form-control form-input-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-end mt-2 forgot-password-content">
                <a href="/forgot-password" className="text-reset">
                  Forgot Password? <span className="text-info reset-link">Reset</span>
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg login-submit-btn" >
                Login
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-3">
              <p className="account-register">
                You don’t have an account?{" "}
                <a href="/register" className="text-info register-link">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
