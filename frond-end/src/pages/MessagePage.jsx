import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from 'react-router-dom';
import "./../styles/MessagePage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";

function MessagePage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [userId, setUserId] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const bottomRef = useRef(null);
  // const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [hasUserScrolledUp, setHasUserScrolledUp] = useState(false);
  const messageContainerRef = useRef(null);

  const { receiverId: routeReceiverId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sellerId = queryParams.get("sellerId");
  const receiverId = routeReceiverId || sellerId;

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId));
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!userId) return;
      const res = await fetch(`${API_URL}/api/messages/chat-users?userId=${userId}`);
      const data = await res.json();
      setChatUsers(data);
    };
    fetchChatUsers();
  }, [userId]);

  useEffect(() => {
    const fetchUserIfMissing = async () => {
      if (receiverId) {
        let foundUser = chatUsers.find(u => u.id === Number(receiverId));
        if (!foundUser) {
          const res = await fetch(`${API_URL}/api/users/${receiverId}`);
          const user = await res.json();
          foundUser = user ? { id: user.id, name: user.name, image: user.image } : null;
          if (foundUser) {
            setChatUsers(prev => {
              const exists = prev.some(u => u.id === foundUser.id);
              return exists ? prev : [...prev, foundUser];
            });
          }
        }
        if (!selectedUser) setSelectedUser(foundUser || chatUsers[0] || null);
      } else if (!selectedUser && chatUsers.length > 0) {
        setSelectedUser(chatUsers[0]);
      }
    };
    fetchUserIfMissing();
  }, [receiverId, chatUsers]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      const res = await fetch(`${API_URL}/api/messages?userId=${userId}&otherUserId=${selectedUser.id}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    const updateActiveChat = async () => {
      if (selectedUser && userId) {
        await fetch(`${API_URL}/api/messages/active`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, chattingWith: selectedUser.id }),
        });
      }
    };
    updateActiveChat();
  }, [selectedUser]);


  useEffect(() => {
    const interval = setInterval(async () => {
      // Fetch chat users (to update red dots)
      const res = await fetch(`${API_URL}/api/messages/chat-users?userId=${userId}`);
      const data = await res.json();
      setChatUsers(data);
  
      // If selectedUser → fetch live messages
      if (selectedUser) {
        const msgRes = await fetch(`${API_URL}/api/messages?userId=${userId}&otherUserId=${selectedUser.id}`);
        const msgData = await msgRes.json();
        setMessages(Array.isArray(msgData) ? msgData : []);
      }
    }, 2000); // 5 sec
  
    return () => clearInterval(interval);
  }, [userId, selectedUser]);


  useEffect(() => {
    const markCurrentChatAsRead = async () => {
      if (selectedUser) {
        await fetch(`${API_URL}/api/messages/mark-read`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, otherUserId: selectedUser.id }),
        });

        const res = await fetch(`${API_URL}/api/messages/chat-users?userId=${userId}`);
        const data = await res.json();
        setChatUsers(data);
      }
    };
    markCurrentChatAsRead();
  }, [selectedUser, messages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };


  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;
  
    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
  
      setHasUserScrolledUp(!isNearBottom);
    };
  
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!messageContainerRef.current) return;
  
    // On first load or if user is near bottom, scroll down
    if (!hasUserScrolledUp) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!selectedUser) return;

    const formData = new FormData();
    formData.append("senderId", userId);
    formData.append("receiverId", selectedUser.id);
    formData.append("text", messageInput);
    if (imageFile) formData.append("image", imageFile);

    await fetch(`${API_URL}/api/messages`, {
      method: "POST",
      body: formData,
    });

    setMessageInput("");
    setImageFile(null);
    setImagePreview(null);

    const chatRes = await fetch(`${API_URL}/api/messages/chat-users?userId=${userId}`);
    const chatData = await chatRes.json();
    setChatUsers(chatData);

    const msgRes = await fetch(`${API_URL}/api/messages?userId=${userId}&otherUserId=${selectedUser.id}`);
    const msgData = await msgRes.json();
    setMessages(Array.isArray(msgData) ? msgData : []);
  };

  return (
    <div className="message-page-container main-content-header">
      <div className="chat-user-list">
        {chatUsers.length > 0 ? chatUsers.map((user) => (
          <div
            key={user.id}
            className={`chat-user-item ${selectedUser && selectedUser.id === user.id ? "active" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.image}
              alt={user.name}
              className="chat-user-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/default-profile.jpg";
              }}
            />
            <span>{user.name}</span>
            {user.hasUnread && selectedUser?.id !== user.id && <span className="red-dot"></span>}
          </div>
        )) : <p>No chat history</p>}
      </div>

      <div className="message-content-container">
        {selectedUser ? (
          <header className="message-header-container">
            <img src={selectedUser.image} alt="Seller" className="message-seller-img" />
            <div className="message-header-content">
              <h3>{selectedUser.name}</h3>
              <span>Active now</span>
            </div>
          </header>
        ) : (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        )}

        <div className="message-body-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.senderId == userId ? "sent" : "received"}`}>
              <p>{msg.messageText}</p>
              {msg.imageUrl && <img src={`${API_URL}/uploads/${msg.imageUrl}`} alt="msg-img" />}
              <span className="message-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
          {/* ✅ Place single ref here AFTER loop */}
          <div ref={bottomRef}></div>
        </div>

        <footer className="message-footer">
          <label className="message-attach-btn">
            <FontAwesomeIcon icon={faPaperclip} />
            <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
          </label>

          <div className="message-input-img">
            {imagePreview && <img src={imagePreview} alt="preview" style={{ maxHeight: 100 }} />}
            <input
              type="text"
              className="message-input"
              placeholder="Message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>
          <button className="message-send-btn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default MessagePage;