const { User, Listing, Flag, Contact, ActivityLog, Notification } = require("../models");

const getAllUsers = async (req, res) => {
  const users = await User.findAll({ where: { isAdmin: false } });
  res.json(users);
};


const suspendUser = async (req, res) => {
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


const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
};


const getAllListings = async (req, res) => {
  const listings = await Listing.findAll({ include: ["user"] });
  res.json(listings);
};


const deleteListing = async (req, res) => {
  await Listing.destroy({ where: { id: req.params.id } });
  res.json({ message: "Listing deleted" });
};


const getAllFlags = async (req, res) => {
  const flags = await Flag.findAll({
    include: ["listing", "user"],
  });
  res.json(flags);
};


const dismissFlag = async (req, res) => {
  await Flag.destroy({ where: { id: req.params.id } });
  res.json({ message: "Flag dismissed" });
};


const getAllContacts = async (req, res) => {
  const contacts = await Contact.findAll({
    order: [['createdAt', 'DESC']]
  });
  res.json(contacts);
};


const resolveContact = async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return res.status(404).json({ message: "Issue not found" });

  const resolvedDate = new Date(contact.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  contact.status = "resolved";
  await contact.save();

  let userId = contact.userId;

  if (!userId && contact.email) {
    const user = await User.findOne({ where: { email: contact.email } });
    if (user) userId = user.id;
  }

  // Send notification to the logged in user who submitted it
  if (userId) {
    await Notification.create({
      userId,
      title: "Support Request Resolved",
      message: `Issue raised (“${contact.subject}”) on ${resolvedDate} has been resolved.`,
      type: "support",
      link: "/support/contact",
      isRead: false,
    });
  }

  res.json({ message: "Issue marked as resolved" });
};



const getActivityLogs = async (req, res) => {
  try {
    console.log("Fetching activity logs...");
    const logs = await ActivityLog.findAll({
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    console.log("Logs fetched:", logs);
    res.json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ message: "Error fetching logs" });
  }
};


const getDashboardStats = async (req, res) => {
  const [users, listings, flags, contacts] = await Promise.all([
    User.count({ where: { isAdmin: false } }),
    Listing.count(),
    Flag.count(),
    // Contact.count({ where: { status: null } }),
    Contact.count({ where: { status: "pending" } }),
  ]);

  res.json({
    totalUsers: users,
    totalListings: listings,
    flaggedListings: flags,
    supportIssues: contacts,
  });
};


const reactivateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isVerified = true;
  await user.save();

  await ActivityLog.create({
    userId: req.user.id,
    action: "Reactivate User",
    description: `Reactivated user ${user.id}`,
  });

  res.json({ message: "User reactivated" });
};




module.exports = { 
  reactivateUser, 
  getDashboardStats,
  getActivityLogs,
  resolveContact,
  getAllContacts,
  dismissFlag,
  getAllFlags,
  deleteListing,
  getAllListings,
  deleteUser,
  suspendUser,
  getAllUsers
};