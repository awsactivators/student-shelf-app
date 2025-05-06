import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./../styles/MessagePage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";


function MessagePage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId));
    } else {
      console.error("No userId found in localStorage. Redirecting to login.");
      window.location.href = "/login";
    }
  }, []);
  
  const [chatUsers, setChatUsers] = useState([]);
  const { receiverId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
      if (receiverId && chatUsers.length > 0) {
        let foundUser = chatUsers.find(u => u.id === Number(receiverId));
        if (!foundUser) {
          // fetch user by ID if not in chatUsers
          const res = await fetch(`${API_URL}/api/users/${receiverId}`);
          const user = await res.json();
          foundUser = user ? { id: user.id, name: user.name, image: user.image } : null;
          if (foundUser) {
            setChatUsers(prev => [...prev, foundUser]);
            setSelectedUser(foundUser); 
          }
        }
        if (foundUser) setSelectedUser(foundUser);
      }
    };
  
    fetchUserIfMissing();
  }, [receiverId, chatUsers]);

  // Always select user after chatUsers is loaded
  useEffect(() => {
    if (chatUsers.length > 0) {
      if (receiverId) {
        const foundUser = chatUsers.find(u => u.id === Number(receiverId));
        if (foundUser) {
          setSelectedUser(foundUser);
        } else {
          setSelectedUser(chatUsers[0]); 
        }
      } else {
        setSelectedUser(chatUsers[0]); 
      }
    }
    console.log("chatUsers loaded:", chatUsers);
  }, [chatUsers, receiverId]);
  
  // Load messages when selectedUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${API_URL}/api/messages?userId=${userId}&otherUserId=${selectedUser.id}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    };
    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const sendMessage = async () => {
    if (!selectedUser) {
      console.error("No user selected to send message to!");
      return;
    }
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

    // Reload messages
    const res = await fetch(`${API_URL}/api/messages?userId=${userId}&otherUserId=${selectedUser.id}`);
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div className="message-page-container main-content-header">
      {/* Left chat user list */}
      <div className="chat-user-list">
        {chatUsers.length > 0 ? chatUsers.map((user) => (
          <div key={user.id} className={`chat-user-item ${selectedUser && selectedUser.id === user.id ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}>
            <img src={user.image} alt={user.name} className="chat-user-img" />
            <span>{user.name}</span>
          </div>
        )) : <p>No chat history</p>}
      </div>

      {/* Main Chat */}
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