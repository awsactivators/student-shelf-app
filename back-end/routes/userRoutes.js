const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, uploadProfileImage, updateUserPassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { profileUpload } = require("../middleware/uploadMiddleware"); 

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Fetch user profile
router.get("/me", protect, getUserProfile);

// Update user profile
router.put("/update", protect, updateUserProfile);

// Upload profile image
router.post("/upload-profile-image", protect, profileUpload.single("profileImage"), uploadProfileImage);

// Update user password
router.put("/update-password", protect, updateUserPassword);

module.exports = router;
