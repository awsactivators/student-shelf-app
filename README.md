# student-shelf-app


create update migration of db table
npx sequelize-cli migration:generate --name update-user-table

create new model migration
npx sequelize-cli model:generate --name Listing --attributes title:string,description:text,category:string,price:decimal,image:string,userId:integer


migrate update
npx sequelize-cli db:migrate

verify table schema
DESC Users;

re-track .env
git rm --cached .env
git commit -m "Stop tracking .env file"





<!-- 

the next page is the message page, I dont have a model table for it yet, I want when a user goes to the seller page and clicks send a message it routes them to the sellers chat section where they can exchange chat and images, when they click on file icon to add image the image should preview above the text box with option of adding a message before sending (let the image styling be small like 80x80).

also let the seller (other user on the chat end) profile image, name, and last seen (if is is online, or when last seen), with also an arrow back to go back to a chat history (if the user have been chatting with other peopl) le it go to that page if not let it go to that page and say no chats yet or show list of chats available for them to slect which to continue with.

also, let the mesage sent/received be persistent on refresh of the screen, since the message will be in the database let is always show in the chat box even after re-login.

lastly, i dont want any modification to affect my curret working code like user data, listing etc.

I already have a structure for the chat page but you can modify where necessary, make sure to use font awesome icons and any variable declared should be used too.

also provide files that needs updating or creating like routes, controller, app.jsx, server.js etc

my user.js model
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Listing, { foreignKey: "userId", as: "activeListings" });
      User.hasMany(models.Review, { foreignKey: "sellerId", as: "reviews" });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    campus: DataTypes.STRING,
    bio: DataTypes.TEXT,
    policy: DataTypes.TEXT,
    phoneNumber: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    activeListings: DataTypes.INTEGER,
    isVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

my sample message page
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/MessagePage.css";
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
    <div className="message-page-container">
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

css
.message-page-container {
  display: flex;
  min-height: 100vh;
}

.message-content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f4f4f4;
  margin: 60px;
  background-color: black;
  border-radius: 8px;
  max-width: 1200px;
  margin-left: 100px;
}

.message-header-content {
  /* color: white; */
  margin-left: 20px;
  margin-top: 50px;
}

.message-header-content h3 {
  color: white;
}

.message-header-content span {
  color: var(--color-success);
}

.message-header-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.message-seller-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 10px;
}


.message-body-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background: white;
  border-radius: 10px;
}

.message-date-p {
  text-align: center;
  margin: 20px 0;
  color: gray;
  font-size: 0.9em;
  margin-bottom: 240px;
}

.message-bubble {
  margin: 10px 0;
  display: flex;
  align-items: flex-end;
}

.message-bubble.sent {
  justify-content: flex-end;
  
}

.message-bubble.sent p {
  background-color: #20A090;
  padding: 15px;
  width: 350px;
  border-radius: 20px 0 20px 20px;
}

.message-bubble.received {
  justify-content: flex-start;
}

.message-bubble.received p{
  justify-content: flex-start;
  background-color: #e4eef6; 
  padding: 15px;
  width: 350px;
  border-radius: 20px 20px 20px 0px;
}


.message-seller-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.message-product-image {
  position: absolute;
  top: 400px;
  right: 195px;
}

.message-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.message-input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.message-attach-btn,
.message-mic-btn,
.message-send-btn {
  background: #eee;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.message-unread-dot {
  color: red;
  font-size: 1.2em;
  margin-left: 5px;
  vertical-align: middle;
}


/* Media Query for max-width 768px */
@media (max-width: 768px) {
  .message-content-container {
    padding: 15px;
    margin: 20px;
    max-width: 100%;
    /* margin-left: 20p; */
  }

  .message-header-container {
    flex-direction: column;
    text-align: center;
    margin-bottom: 15px;
  }

  .message-seller-img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

  .message-header-content {
    margin-left: 0;
    margin-top: 0;
  }

  .message-body-container {
    padding: 5px;
  }

  .message-bubble.sent p,
  .message-bubble.received p {
    width: 250px;
    font-size: 0.9rem;
  }

  .message-product-image {
    width: 100px;
    height: auto;
    position: relative;
    top: auto;
    right: auto;
    margin: 10px 0;
  }

  .message-footer {
    gap: 5px;
    flex-wrap: wrap;
  }

  .message-input {
    width: 50%;
    margin-bottom: 10px;
  }

  .message-attach-btn,
  .message-mic-btn,
  .message-send-btn {
    padding: 8px;
  }

  .message-date-p {
    margin-bottom: 40px;
  }
}

/* Media Query for max-width 576px */
@media (max-width: 576px) {
  .message-content-container {
    padding: 10px;
    margin: 10px;
    width: 100%;
  }

  .message-seller-img {
    width: 60px;
    height: 60px;
  }

  .message-header-content h3 {
    font-size: 1.2rem;
  }

  .message-header-content span {
    font-size: 1rem;
  }

  .message-bubble.sent p,
  .message-bubble.received p {
    width: 200px;
    font-size: 0.8rem;
  }

  .message-footer {
    align-items: stretch;
  }

  .message-input {
    margin-bottom: 10px;
  }

  .message-attach-btn,
  .message-mic-btn,
  .message-send-btn {
    width: 40px;
    height: 40px;
    padding: 5px;
    font-size: 0.8rem;
  }
}



/* Media Query for max-width 420px */
@media (max-width: 420px) {
  .message-content-container {
    width: 100%;
    overflow-x: hidden;
  }
}
 -->