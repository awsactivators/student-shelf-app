const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, uploadProfileImage } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 

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
router.post("/upload-profile-image", protect, upload.single("profileImage"), uploadProfileImage);

module.exports = router;
