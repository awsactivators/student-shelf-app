import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/NotificationsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faUserPlus, faHeart, faGears, faBell } from "@fortawesome/free-solid-svg-icons";

function NotificationsPage() {
  // Full list of notifications
  const allNotifications = [
    { id: 1, title: "Item Sold", message: "Congratulations! An item has been sold", time: "21 mins ago", icon: faCirclePlay },
    { id: 2, title: "V2.1 Release", message: "New Release", time: "21 mins ago", icon: faGears },
    { id: 3, title: "Account Update", message: "Your profile has been successfully updated", time: "21 mins ago", icon: faBell },
    { id: 4, title: "New Listing Alert", message: "James just added a new item", time: "21 mins ago", icon: faCirclePlay },
    { id: 5, title: "Review Received", message: "Jane left a review on your profile", time: "21 mins ago", icon: faHeart },
    { id: 6, title: "New Follower", message: "You have a new follower: Sarah M.", time: "21 mins ago", icon: faUserPlus },
    { id: 7, title: "System Alert", message: "Password was successfully changed", time: "1 day ago", icon: faGears },
    { id: 8, title: "Expired Listing", message: "Your listing has expired.", time: "2 days ago", icon: faBell },
  ];

  // State for visible notifications
  const [visibleNotifications, setVisibleNotifications] = useState(allNotifications.slice(0, 5));
  const [hasMore, setHasMore] = useState(allNotifications.length > visibleNotifications.length);

  const menuItems = [
    {
      label: "Profile",
      submenu: [
        { label: "User Info", path: "/user-info" },
        { label: "Password", path: "/password" },
        { label: "Listings", path: "/listings" },
        { label: "Settings", submenu: [], path: "/settings" },
        { label: "Notifications", path: "/notifications", hasNew: true },
      ],
    },
  ];

  // Handle "View More" functionality
  const handleViewMore = () => {
    const nextNotifications = allNotifications.slice(
      visibleNotifications.length,
      visibleNotifications.length + 6
    ); // Load 6 more notifications
    setVisibleNotifications((prev) => [...prev, ...nextNotifications]);

    // If no more notifications to show, hide "View More" button
    if (visibleNotifications.length + nextNotifications.length >= allNotifications.length) {
      setHasMore(false);
    }
  };

  return (
    <div className="notifications-page">
      <Sidebar menuItems={menuItems} activeMenu="Notifications" />
      <main className="notifications-content">
        <h1 className="notifications-title">Notifications</h1>
        <ul className="notifications-list">
          {visibleNotifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-icon">
                <FontAwesomeIcon icon={notification.icon} />
              </div>
              <div className="notification-details">
                <h2 className="notification-title">{notification.title}</h2>
                <p className="notification-message">{notification.message}</p>
              </div>
              <span className="notification-time">{notification.time}</span>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button className="view-more-btn" onClick={handleViewMore}>
            <FontAwesomeIcon icon={faCirclePlay} /> View more
          </button>
        )}
      </main>
    </div>
  );
}

export default NotificationsPage;
