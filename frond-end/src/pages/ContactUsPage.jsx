import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/ContactUsPage.css";

function ContactUsPage() {
  const menuItems = [
    {
      label: "Support",
      submenu: [
        { label: "FAQs", path: "/support/faqs" },
        { label: "Contact", path: "/support/contact" }
      ],
    },
  ];


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Add logic to handle form submission (e.g., API call)
    console.log("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-us-page">
      <Sidebar menuItems={menuItems} activeMenu="Contact" />
      <div className="contact-main-content">
        <h1 className="contact-us-title">Contact Us</h1>
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
              onChange={handleInputChange}
              required
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
          <button type="submit" className="contact-us-submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
