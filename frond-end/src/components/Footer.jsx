import React from "react";
import "./../styles/Footer.css"; 

function Footer() {
  return (
    <footer className="custom-footer container-fluid d-flex flex-wrap align-items-center justify-content-between px-3 py-3">
      {/* Footer Links */}
      <div className="custom-footer-links d-flex flex-wrap justify-content-center justify-content-md-start">
        <a href="/agreement/terms" className="custom-footer-link">Terms</a>
        <a href="/agreement/privacy" className="custom-footer-link">Privacy Policy</a>
        <a href="/support/faqs" className="custom-footer-link">Support</a>
      </div>

      {/* Copyright Section */}
      <div className="custom-footer-left text-center text-md-start">
        <p className="custom-footer-text">
          Copyright © 2024 studentshelf.com. All Rights Reserved.
        </p>
      </div>
    </footer>

  );
}

export default Footer;
