import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/NotificationsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faUserPlus, faHeart, faGears, faBell } from "@fortawesome/free-solid-svg-icons";
import { userMenuItems } from "../constants/menuItems";
import { Link } from "react-router-dom";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [API_URL]);

  // Helper to choose icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case "favorite":
        return faHeart;
      case "review":
        return faBell;
      case "sale":
        return faCirclePlay;
      case "message":
        return faUserPlus;
      case "system":
        return faGears;
      default:
        return faBell;
    }
  };

  return (
    <div className="notifications-page">
      <Sidebar menuItems={userMenuItems} activeMenu="Notifications" />
      <main className="notifications-content">
        <h1 className="notifications-title">Notifications</h1>
        {notifications.length > 0 ? (
          <div className="notifications-list-container">
            <ul className="notifications-list">
              {notifications.map((notification) => (
                <li key={notification.id} className={`notification-item ${notification.isRead ? "" : "unread"}`}>
                  <div className="notification-icon">
                    <FontAwesomeIcon icon={getIcon(notification.type)} />
                  </div>
                  <div className="notification-details">
                    <h2 className="notification-title">{notification.type}</h2>
                    <p className="notification-message">{notification.message}</p>
                  </div>
                  <span className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  <Link to={notification.link || "#"} className="notification-overlay-link"></Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-notifications">No notifications available.</p>
        )}
      </main>
    </div>
  );
}

export default NotificationsPage;