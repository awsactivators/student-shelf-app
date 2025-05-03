import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/SettingsPage.css";
import { userMenuItems } from "../constants/menuItems";

function SettingsPage() {
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("Light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log("Settings have been updated successfully!");
  };

  return (
    <div className="settings-page main-layout-sidebar">
      <Sidebar menuItems={userMenuItems} activeMenu="Settings" onToggle={handleSidebarToggle} />
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="settings-content">
        <h1 className="settings-title">Settings</h1>
        <form className="settings-form" onSubmit={handleSaveSettings}>
          {/* Language Setting */}
          <div className="settings-form-group">
            <label htmlFor="language" className="settings-label">
              Language
            </label>
            <select
              id="language"
              className="form-control settings-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          {/* Notifications Setting */}
          <div className="settings-form-group">
            <label className="settings-label">Notifications</label>
            <div className="settings-checkbox-group">
              <input
                type="checkbox"
                id="notifications"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <label htmlFor="notifications" className="settings-checkbox-label">
                Enable Notifications
              </label>
            </div>
          </div>

          {/* Theme Setting */}
          <div className="settings-form-group">
            <label htmlFor="theme" className="settings-label">
              Theme
            </label>
            <select
              id="theme"
              className="form-control settings-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Save Settings Button */}
          <button type="submit" className="btn settings-save-btn">
            Save Settings
          </button>
        </form>
      </main>
    </div>
  );
}

export default SettingsPage;
