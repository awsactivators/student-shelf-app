import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/PrivacyPolicyPage.css";
import "./../styles/HeaderGlobal.css";
import { userMenuItems } from "../constants/menuItems";

function PrivacyPolicyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="privacy-policy-page main-layout-sidebar main-content-header">
      <Sidebar menuItems={userMenuItems} activeMenu="Privacy Policy" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="privacy-main-content">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <section className="privacy-policy-content">
          <h2>Introduction</h2>
          <p>
            At Student Shelf, we value your privacy. This policy outlines how we
            collect, use, and protect your information.
          </p>
          <h2>Information Collection</h2>
          <p>
            We collect personal information such as your name, email address, and
            activity on the platform.
          </p>
          <h2>Use of Information</h2>
          <p>
            Your data is used to enhance your experience, process transactions,
            and improve our services.
          </p>
          <h2>Data Sharing</h2>
          <p>
            We do not sell your data. It may be shared with third-party payment
            processors for transactions.
          </p>
          <h2>Data Security</h2>
          <p>
            We implement secure protocols to protect your data from unauthorized
            access.
          </p>
          <h2>Cookies</h2>
          <p>
            Cookies are used to improve your browsing experience. You can manage
            your cookie preferences in your browser settings.
          </p>
          <h2>Changes to Policy</h2>
          <p>
            We may update this policy. We will notify users of significant
            changes.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
