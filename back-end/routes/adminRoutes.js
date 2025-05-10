const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect, adminOnly);

router.get("/users", adminCtrl.getAllUsers);
router.put("/users/:id/suspend", adminCtrl.suspendUser);
router.delete("/users/:id", adminCtrl.deleteUser);

router.get("/listings", adminCtrl.getAllListings);
router.delete("/listings/:id", adminCtrl.deleteListing);

router.get("/flags", adminCtrl.getAllFlags);
router.delete("/flags/:id", adminCtrl.dismissFlag);

router.get("/contacts", adminCtrl.getAllContacts);
router.put("/contacts/:id/resolve", adminCtrl.resolveContact);

router.get("/logs", adminCtrl.getActivityLogs);

module.exports = router;