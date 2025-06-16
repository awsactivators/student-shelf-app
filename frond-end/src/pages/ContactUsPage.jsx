import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/ContactUsPage.css";
import "./../styles/HeaderGlobal.css";
import { userMenuItems } from "../constants/menuItems";
import { useLocation } from "react-router-dom";

function ContactUsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser?.email) {
      setFormData((prev) => ({
        ...prev,
        email: storedUser.email,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage("Message sent successfully! Redirecting to home...");
  
        setTimeout(() => {
          window.location.href = "/home"; 
        }, 3000);
  
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage("Failed to send message. Please try again.");
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setErrorMessage("An error occurred. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="contact-us-page main-layout-sidebar main-content-header">
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar menuItems={userMenuItems} activeMenu="Contact" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="contact-main-content">
        <h1 className="contact-us-title">Contact Us</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="contact-us-form" onSubmit={handleSubmit}>
          <div className="contact-us-form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="contact-us-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              disabled
              className="read-only-input"
              // onChange={handleInputChange}
              // required
            />
          </div>
          <div className="contact-us-form-group">
            <label htmlFor="name">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="contact-us-form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-us-submit-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
