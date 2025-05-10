const { User, Listing, Flag, Contact, ActivityLog } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ where: { isAdmin: false } });
  res.json(users);
};

exports.suspendUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isVerified = false;
  await user.save();

  await ActivityLog.create({
    userId: req.user.id,
    action: "Suspend User",
    description: `Suspended user ${user.id}`,
  });

  res.json({ message: "User suspended" });
};

exports.deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
};

exports.getAllListings = async (req, res) => {
  const listings = await Listing.findAll({ include: ["user"] });
  res.json(listings);
};

exports.deleteListing = async (req, res) => {
  await Listing.destroy({ where: { id: req.params.id } });
  res.json({ message: "Listing deleted" });
};

exports.getAllFlags = async (req, res) => {
  const flags = await Flag.findAll({
    include: ["listing", "user"],
  });
  res.json(flags);
};

exports.dismissFlag = async (req, res) => {
  await Flag.destroy({ where: { id: req.params.id } });
  res.json({ message: "Flag dismissed" });
};

exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
};

exports.resolveContact = async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return res.status(404).json({ message: "Issue not found" });

  contact.status = "resolved";
  await contact.save();

  res.json({ message: "Issue resolved" });
};

exports.getActivityLogs = async (req, res) => {
  const logs = await ActivityLog.findAll({
    include: ["user"],
    order: [["createdAt", "DESC"]],
  });
  res.json(logs);
};