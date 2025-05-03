import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import defaultProfileImage from "./../assets/images/avatar.png";

function Sidebar({ menuItems = [], userData, onToggle }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Automatically collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setIsCollapsed(true); // Auto-collapse
      } else {
        setIsCollapsed(false); // Expand for larger screens
      }
    };

    // Set initial state and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (window.innerWidth <= 576 && onToggle) onToggle(!newState);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Collapse Button */}
      <button className="collapse-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </button>

      {/* Menu */}
      <ul className="menu">
        {menuItems.map((menu, index) => (
          <li key={index} className={`menu-item ${isActive(menu.path) ? "active" : ""}`}>
            <Link to={menu.path}>{menu.label}</Link>
            {menu.submenu && (
              <ul className="sub-menu">
                {menu.submenu.map((subMenu, idx) => (
                  <li
                    key={idx}
                    className={`sub-menu-item ${isActive(subMenu.path) ? "active" : ""}`}
                  >
                    <Link to={subMenu.path}>{subMenu.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Profile Image - Uses Default if No Image is Set */}
      {/* <div className="profile-image">
        <Link to={"/user-info"}>
          <img
            src={userData?.profileImage || defaultProfileImage}
            alt="User Profile"
            className="custom-profile-img"
          />
        </Link>
      </div> */}
    </div>
  );
}

export default Sidebar;
