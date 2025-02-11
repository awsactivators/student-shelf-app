import React from "react";
import "./../styles/Footer.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faShoppingCart, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="custom-footer container-fluid d-flex flex-wrap align-items-center justify-content-between px-3 py-3">
  
      {/* Copyright Section for Larger Screens */}
      <div className="custom-footer-left text-center text-md-start">
        <p className="custom-footer-text">
          Copyright © 2024 studentshelf.com. All Rights Reserved.
        </p>
      </div>

      {/* Footer Icons for Mobile Screens */}
      <div className="custom-footer-icons d-flex justify-content-around">
        <Link to="/home" className="footer-icon">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/user-info" className="footer-icon">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/add-listing" className="footer-icon">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        <Link to="/message" className="footer-icon">
          <FontAwesomeIcon icon={faCommentDots} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
