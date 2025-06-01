import React from "react";
import "./../styles/Footer.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faShoppingCart, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <footer className="custom-footer container-fluid d-flex flex-wrap align-items-center justify-content-between px-3 py-3">
  
      {/* Copyright Section for Larger Screens */}
      <div className="custom-footer-left text-center text-md-start">
        <p className="custom-footer-text">
          Copyright © 2024 studentshelf.com. All Rights Reserved.
        </p>

        <div className="custom-footer-links">
          <div>
            <Link to="/agreement/privacy" className="custom-footer-link">Privacy Policy</Link>
            <Link to="/agreement/terms" className="custom-footer-link">Terms of Service</Link>
            <Link to="/support/faqs" className="custom-footer-link">FAQs</Link>
            <Link to="/support/contact" className="custom-footer-link">Contact</Link>
          </div>
        </div>
      </div>

      {/* Footer Icons for Mobile Screens */}
      <div className="custom-footer-icons d-flex justify-content-around">
        <Link to="/home" className={`footer-icon ${location.pathname === "/home" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/user-info" className={`footer-icon ${location.pathname === "/user-info" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/add-listing" className={`footer-icon ${location.pathname === "/add-listing" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <Link to="/message" className={`footer-icon ${location.pathname === "/message" ? "active" : ""}`}>
          <FontAwesomeIcon icon={faCommentDots} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
