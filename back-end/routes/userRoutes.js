const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, uploadProfileImage, updateUserPassword, getUserById, forgotPassword, resetPassword  } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { uploader } = require("../middleware/uploadMiddleware"); 

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Fetch user profile
router.get("/me", protect, getUserProfile);

// Update user profile
router.put("/update", protect, updateUserProfile);

// Upload profile image
// router.post("/upload-profile-image", protect, profileUpload.single("profileImage"), uploadProfileImage);
router.post(
  "/upload-profile-image",
  protect,
  (req, res, next) => {
    req.profileUpload = true;
    next();
  },
  uploader.single("profileImage"),
  uploadProfileImage
);

// Update user password
router.put("/update-password", protect, updateUserPassword);

// Fetch user by ID
router.get("/:id", getUserById);

module.exports = router;
