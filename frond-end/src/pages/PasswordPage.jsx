import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/PasswordPage.css";
import { userMenuItems } from "../constants/menuItems";

function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Simulate successful password update
      setSuccessMessage("Your password has been successfully updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="password-page">
      <Sidebar menuItems={userMenuItems} activeMenu="Password" />
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
          <button type="submit" className="btn update-password-btn">
            Update Password
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
