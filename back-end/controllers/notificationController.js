const { Notification } = require("../models");

// GET all notifications for user
const getNotifications = async (req, res) => {
  const userId = req.user.id;
  const notifications = await Notification.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
  res.json(notifications);
};

// GET unread count
const getUnreadCount = async (req, res) => {
  const userId = req.user.id;
  const count = await Notification.count({ where: { userId, isRead: false } });
  res.json({ count });
};

// Mark notification as read
const markAsRead = async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findByPk(notificationId);

  if (!notification) return res.status(404).json({ message: "Notification not found" });

  notification.isRead = true;
  await notification.save();

  res.json({ message: "Notification marked as read" });
};

module.exports = { getNotifications, getUnreadCount, markAsRead };