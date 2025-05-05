import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/MessagePage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import profileImage from "./../assets/images/seller-avatar.png";
import braceletImage from "./../assets/images/bracelet1.png";

function MessagePage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "Hello James, I like this item, is it still available?", time: "09:25 AM" },
    { id: 2, sender: "them", text: "Hi Lucie, yes it is, do you want to place an order?", time: "09:28 AM" },
    { id: 3, sender: "me", text: "Yes please, do you have it in gold color?", time: "09:29 AM" },
    { id: 4, sender: "them", text: "Not at the moment but I can make it available by next week, is that ok with you?", time: "09:29 AM" },
    { id: 5, sender: "me", text: "HYes, that is ok, so should I go ahead and pay for it?", time: "09:31 AM" },
    { id: 6, sender: "them", text: "Yes you can, I will notify you when it is ready so that we can meet for the pickup?", time: "09:32 AM" },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const menuItems = [
    {
      label: "Message",
      submenu: [
        { label: "James", path: "/message/james", unread: false },
        { label: "Lola", path: "/message/lola", unread: false },
        { label: "Jane", path: "/message/jane", unread: true },
        { label: "Dan", path: "/message/dan", unread: false },
        { label: "Racheal", path: "/message/racheal", unread: false },
        { label: "Louis", path: "/message/louis", unread: true },
      ],
    },
  ];

  return (
    <div className="message-page-container main-content-header">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems.map((item) => ({
          ...item,
          submenu: item.submenu.map((subItem) => ({
            ...subItem,
            label: (
              <>
                {subItem.label} {subItem.unread && <span className="message-unread-dot">•</span>}
              </>
            ),
          })),
        }))}
        activeMenu="James"
      />



      {/* Main Chat Section */}
      <main className="message-content-container">
        <header className="message-header-container">
          <img src={profileImage} alt="Seller" className="message-seller-img" />
          <div className="message-header-content">
            <h3>James James</h3>
            <span className="-message-active-status">Active Now</span>
          </div>
        </header>
        <div className="message-body-container">
          <p className="message-date-p">December 1, 2024</p>
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender === "me" ? "sent" : "received"}`}>
              {msg.sender === "me" ? null : <img src={profileImage} alt="Seller-img" className="message-seller-image" />}
              {messages.findIndex((m) => m.sender === "me") === msg.id - 1 && (
                <img src={braceletImage} alt="product" className="message-product-image" />
              )}
              <p>{msg.text}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          ))}
        </div>
        <footer className="message-footer">
          <button className="message-attach-btn">
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <input
            type="text"
            className="message-input"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button className="message-mic-btn">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <button className="message-send-btn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default MessagePage;
