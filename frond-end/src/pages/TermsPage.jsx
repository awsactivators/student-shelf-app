import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/TermsPage.css";
import "./../styles/HeaderGlobal.css";
import { userMenuItems } from "../constants/menuItems";
import { useLocation } from "react-router-dom";

function TermsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="terms-page-container main-layout-sidebar main-content-header">
      <Sidebar menuItems={userMenuItems} activeMenu="Terms & Conditions" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="terms-main-content">
        <h1 className="terms-title">Terms and Conditions</h1>
        <section className="terms-content">
          <h2>Introduction</h2>
          <p>
            Welcome to Student Shelf! By accessing or using our platform, you
            agree to be bound by these terms and conditions.
          </p>
          <h2>Eligibility</h2>
          <p>
            To use Student Shelf, you must be at least 18 years old or have
            parental consent.
          </p>
          <h2>User Responsibilities</h2>
          <p>
            Users are responsible for providing accurate information and adhering
            to all platform policies.
          </p>
          <h2>Content Ownership</h2>
          <p>
            All content uploaded remains the property of the user. However, by
            uploading, you grant us a license to display it on the platform.
          </p>
          <h2>Transactions</h2>
          <p>
            Payments are processed securely, and refunds are subject to our refund
            policy.
          </p>
          <h2>Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the platform
            constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsPage;
