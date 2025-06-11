const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getChatUsers, markMessagesAsRead } = require('../controllers/messageController');
const { uploader } = require("../middleware/uploadMiddleware");

// const multer = require('multer');
// const path = require('path');

// Updated multer config to save files inside uploads/messages
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/messages'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));  
//   }
// });
// const upload = multer({ storage: storage }); 

// Fetch messages
router.get('/', getMessages);

// Send message with optional image
// router.post('/', upload.single('image'), sendMessage);
router.post('/', (req, res, next) => {
  req.messageUpload = true;
  next();
}, uploader.single('image'), sendMessage);

// Fetch chat users
router.get('/chat-users', getChatUsers);

// Mark messages as read
router.post('/mark-read', markMessagesAsRead);

// Fetch active chat
router.post('/active', (req, res) => {
  const { userId, chattingWith } = req.body;
  global.activeChats[userId] = chattingWith;
  res.json({ message: 'Active chat updated' });
});

module.exports = router;