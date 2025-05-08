const { Message, User, Notification } = require('../models');
const { Op } = require('sequelize');

const getMessages = async (req, res) => {
  const userId = parseInt(req.query.userId);
  const otherUserId = parseInt(req.query.otherUserId);
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId }
        ]
      },
      order: [['createdAt', 'ASC']]
    });


    const messagesWithFullImagePath = messages.map(msg => ({
      ...msg.toJSON(),
      imageUrl: msg.imageUrl
        ? `${req.protocol}://${req.get('host')}/uploads/messages/${msg.imageUrl}`
        : null
    }));

    res.json(messagesWithFullImagePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const sendMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const imageFile = req.file ? req.file.filename : null;

  try {
    const sender = await User.findByPk(senderId);

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const newMsg = await Message.create({
      senderId,
      receiverId,
      messageText: text,
      imageUrl: imageFile,
      read: false
    });

    const receiverOnline = global.activeChats?.[receiverId] === senderId;

    if (!receiverOnline) {
      await Notification.create({
        userId: receiverId,
        message: `You have a new message from ${sender.name}`,
        type: 'message',
        isRead: false,
        link: `/messages/${senderId}`,
      });
    }
    
    res.json(newMsg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getChatUsers = async (req, res) => {
  const userId = parseInt(req.query.userId);
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      attributes: ['senderId', 'receiverId', 'read'],
    });

    const userIds = new Set();
    const unreadMap = {};

    messages.forEach(msg => {
      const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      userIds.add(otherUserId);

      if (msg.receiverId === userId && !msg.read) {
        unreadMap[otherUserId] = true;
      }
    });

    if (userIds.size === 0) return res.json([]);

    const users = await User.findAll({
      where: { id: { [Op.in]: Array.from(userIds) } },
      attributes: ['id', 'name', 'profileImage'],
    });

    const usersWithImage = users.map(user => ({
      id: user.id,
      name: user.name,
      image: user.profileImage?.startsWith("http")
        ? user.profileImage
        : `${req.protocol}://${req.get("host")}${user.profileImage || "/assets/default-profile.jpg"}`,
      hasUnread: !!unreadMap[user.id],
    }));

    res.json(usersWithImage);
  } catch (err) {
    console.error("Error in getChatUsers:", err);
    res.status(500).json({ error: err.message });
  }
};

const markMessagesAsRead = async (req, res) => {
  const userId = parseInt(req.body.userId);
  const otherUserId = parseInt(req.body.otherUserId);

  try {
    await Message.update(
      { read: true },
      {
        where: {
          senderId: otherUserId,
          receiverId: userId,
          read: false,
        },
      }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    console.error('Error in markMessagesAsRead:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMessages, sendMessage, getChatUsers, markMessagesAsRead };
