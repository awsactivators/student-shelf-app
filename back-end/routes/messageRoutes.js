const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getChatUsers, markMessagesAsRead } = require('../controllers/messageController');
const multer = require('multer');
const path = require('path');

// Updated multer config to save files inside uploads/messages
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/messages'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  
  }
});
const upload = multer({ storage: storage }); 

// Fetch messages
router.get('/', getMessages);

// Send message with optional image
router.post('/', upload.single('image'), sendMessage);

// Fetch chat users
router.get('/chat-users', getChatUsers);

// Mark messages as read
router.post('/mark-read', markMessagesAsRead);

module.exports = router;