import React from "react";
import "./../styles/MobileSidebar.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MobileSidebar({ isOpen, onClose }) {
  return (
    <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar" onClick={onClose} aria-label="Close Sidebar">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <nav className="mobile-sidebar-nav">
        <Link to="/home" onClick={onClose} className="mobile-sidebar-link">Home</Link>
        <Link to="/user-info" onClick={onClose} className="mobile-sidebar-link">Profile</Link>
        <Link to="/add-listing" onClick={onClose} className="mobile-sidebar-link">Sell</Link>
        <Link to="/message" onClick={onClose} className="mobile-sidebar-link">Messages</Link>
      </nav>
    </div>
  );
}

export default MobileSidebar;
