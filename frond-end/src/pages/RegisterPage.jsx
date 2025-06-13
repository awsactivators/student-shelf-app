import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/RegisterPage.css"; 

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrengthError, setPasswordStrengthError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // React Router hook for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Validate email format
    const emailRegex = /^[nN]\d{8}@humber\.ca$/;
    if (!emailRegex.test(email)) {
      setEmailError("Input your Humber student email!");
      setIsLoading(false);
      return;
    } else {
      setEmailError("");
    }
  
    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordStrengthError(
        "Password must be at least 8 characters long and include a capital letter, a small letter, a number, and a special character."
      );
      setIsLoading(false);
      return;
    } else {
      setPasswordStrengthError("");
    }
  
    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      setIsLoading(false);
      return;
    } else {
      setPasswordError("");
    }
  
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          campus,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after 3 seconds
        }, 3000);
      } else {
        setSuccessMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setSuccessMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="custom-register-page container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="custom-card card p-4 bg-dark">
        <div className="custom-card-body">
          <h2 className="custom-title text-center mb-4">Create an Account</h2>

          {/* Success message */}
          {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="custom-form-group mb-3">
              <label htmlFor="name" className="custom-label">Name:</label>
              <input
                type="text"
                className="custom-input"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="custom-form-group mb-3">
              <label htmlFor="email" className="custom-label">Student Email:</label>
              <input
                type="email"
                className="custom-input"
                id="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
            </div>

            {/* Campus Input */}
            <div className="custom-form-group mb-3">
              <label htmlFor="campus" className="custom-label">Campus:</label>
              <input
                type="text"
                className="custom-input"
                id="campus"
                placeholder="Enter your campus"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="custom-form-group mb-3">
              <label htmlFor="password" className="custom-label">Password:</label>
              <input
                type="password"
                className="custom-input"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordStrengthError && <small className="text-danger">{passwordStrengthError}</small>}
            </div>

            {/* Confirm Password Input */}
            <div className="custom-form-group mb-3">
              <label htmlFor="confirmPassword" className="custom-label">Confirm Password:</label>
              <input
                type="password"
                className="custom-input"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <small className="text-danger">{passwordError}</small>}
            </div>

            {/* Terms & Conditions */}
            <div className="custom-checkbox mb-3">
              <input type="checkbox" className="custom-checkbox-input" id="terms" required />
              <label className="custom-checkbox-label" htmlFor="terms">
                Terms and Conditions <span className="agreement-link"><a href="https://drive.google.com/file/d/1PG9QrkkF5YpniopmHUlWzIZMkby-j-gH/view?usp=sharing" target="_blank">Agreement</a></span> Confirmation
              </label>
            </div>

            {/* Register Button */}
            <div className="d-grid">
              <button type="submit" className="custom-btn">
                {isLoading && <span className="spinner-border spinner-border-sm loading-spinner" role="status" aria-hidden="true"></span>}
                Register
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-3">
              <p>
                Already Registered?{" "}
                <a href="/login" className="custom-link">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
