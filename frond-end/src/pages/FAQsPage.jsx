import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/FAQsPage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { userMenuItems } from "../constants/menuItems";
import { useLocation } from "react-router-dom";

function FAQsPage() {

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const location = useLocation();

  const faqs = [
    {
      question: "How is the payment handled?",
      answer: "When payment is made to a product/services, it is held in the app until the buyer/client provides a confirmation of successful transaction before the payment is released to the seller.",
    },
    {
      question: "What can I buy or sell on Student Shelf?",
      answer: "You can buy or sell various products and services including books, handmade items, and tutoring services.",
    },
    {
      question: "What happens after I make an offer on an item?",
      answer: "The seller will be notified and can choose to accept or reject your offer. Once accepted, further communication can be handled via messages.",
    },
    {
      question: "How do I know if a seller is trustworthy?",
      answer: "You can check the seller's ratings, reviews, and their active listings. Verified sellers have a badge for added trust.",
    },
    {
      question: "How is the payment handled?",
      answer: "When payment is made to a product/services, it is held in the app until the buyer/client provides a confirmation of successful transaction before the payment is released to the seller.",
    },
    {
      question: "What can I buy or sell on Student Shelf?",
      answer: "You can buy or sell various products and services including books, handmade items, and tutoring services.",
    },
    {
      question: "What happens after I make an offer on an item?",
      answer: "The seller will be notified and can choose to accept or reject your offer. Once accepted, further communication can be handled via messages.",
    },
    {
      question: "How do I know if a seller is trustworthy?",
      answer: "You can check the seller's ratings, reviews, and their active listings. Verified sellers have a badge for added trust.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="faqs-page main-layout-sidebar main-content-header">
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar menuItems={userMenuItems} activeMenu="FAQs" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      </div>
      {/* {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )} */}
      <div className="faqs-main-content">
        <h1 className="faqs-title">FAQs</h1>
        <div className="faqs-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <FontAwesomeIcon
                  icon={expandedIndex === index ? faMinus : faPlus}
                  className="faq-icon"
                />
              </div>
              {expandedIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQsPage;
