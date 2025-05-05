import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/NotificationsPage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faUserPlus, faHeart, faGears, faBell } from "@fortawesome/free-solid-svg-icons";
import { userMenuItems } from "../constants/menuItems";
import { useNavigate } from "react-router-dom";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);

  const navigate = useNavigate();

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
      case "Favorite":
        return faHeart;
      case "Review":
        return faBell;
      case "Sale":
        return faCirclePlay;
      case "Message":
        return faUserPlus;
      case "System":
        return faGears;
      default:
        return faBell;
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      const token = localStorage.getItem("userToken");
      const currentCount = parseInt(localStorage.getItem("unreadCount")) || 0;
      localStorage.setItem("unreadCount", Math.max(currentCount - 1, 0));
  
      // Mark notification as read in backend
      await fetch(`${API_URL}/api/notifications/${notification.id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const countRes = await fetch(`${API_URL}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const countData = await countRes.json();
      localStorage.setItem("unreadCount", countData.count);

      window.dispatchEvent(new Event("storage"));
  
      // Remove notification from frontend list
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));

      console.log("Clicked notification ID:", notification.id);
      console.log("Current list IDs:", notifications.map(n => n.id));
  
      // Navigate to appropriate page
      if (notification.type === "favorite") {
        // Go to the profile of the user who favorited you
        navigate(notification.link);
      } else {
        // Use existing link or default to notifications page
        navigate(notification.link || "/notifications");
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  return (
    <div className="notifications-page main-layout-sidebar main-content-header">
      <Sidebar menuItems={userMenuItems} activeMenu="Notifications" onToggle={handleSidebarToggle} />
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="notifications-content">
        <h1 className="notifications-title">Notifications</h1>
        {notifications.length > 0 ? (
          <div className="notifications-list-container">
            <ul className="notifications-list">
              {notifications.map((notification) => (
                <li key={notification.id} className={`notification-item ${notification.isRead ? "" : "unread"}`} onClick={() => handleNotificationClick(notification)} style={{ cursor: "pointer" }}>
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