import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/PasswordPage.css";
import "./../styles/HeaderGlobal.css";
import { userMenuItems } from "../constants/menuItems";

function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();


  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return false;
    }
    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(newPassword)) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[0-9]/.test(newPassword)) {
      setErrorMessage("Password must contain at least one number.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  
  // Handle form submission
  // This function will be called when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsLoading(true);
  
    try {
      const token = localStorage.getItem("userToken");
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage("Password updated successfully. You will be logged out to re-login.");
  
        // Clear token and force logout
        localStorage.removeItem("userToken");
  
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setErrorMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="password-page main-layout-sidebar main-content-header">
      {/* <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar menuItems={userMenuItems} activeMenu="Password" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )} */}

      {isSidebarOpen && window.innerWidth <= 576 && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div
        className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <Sidebar
          menuItems={userMenuItems}
          activeMenu="Terms & Conditions"
          onToggle={handleSidebarToggle}
          onLinkClick={() => setIsSidebarOpen(false)}
        />
      </div>
      <main className="password-content">
        <h1>Password Settings</h1>

        {/* Success or Error Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Password Update Section */}
        <form className="password-form" onSubmit={handleSubmit}>
          <div className="password-form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="password-form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="password-form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn update-password-btn" disabled={isLoading}>
            {isLoading ? <span className="spinner-border spinner-border-sm loading-spinner" role="status" aria-hidden="true"></span> : "Update Password"}
          </button>
        </form>

        {/* Two-Factor Authentication Section */}
        <div className="two-factor-section">
          <h2>Two-Factor Authentication</h2>
          <p>Enhance your security by enabling two-factor authentication (2FA).</p>
          <button className="btn enable-2fa-btn">Enable 2FA</button>
        </div>

        {/* Password Security Tips */}
        <div className="security-tips">
          <h2>Password Security Tips</h2>
          <ul className="password-security-tips">
            <li>Use a combination of uppercase and lowercase letters.</li>
            <li>Include numbers and special characters.</li>
            <li>Avoid using easily guessable information like your name or birthdate.</li>
            <li>Change your password regularly.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default PasswordPage;
