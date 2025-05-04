const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Listing, Review } = require("../models");
const asyncHandler = require("express-async-handler");
// const { profileUpload } = require("../middleware/uploadMiddleware");


// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, campus, password } = req.body;

    // Validate required fields
    if (!name || !email || !campus || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      campus,
      password: hashedPassword,
      rating: 0.0, 
      activeListings: 0, 
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        campus: newUser.campus,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8760h" } // Token expires in 365 days
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
    include: [
      { model: Listing, as: "userListings", attributes: ["id", "title", "coverImage", "price"] }
    ]
  });

  const reviews = await Review.findAll({
    where: { sellerId: req.user.id },
    attributes: ["id", "rating", "comment", "createdAt"],
    include: [{ model: User, as: "buyer", attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
  });
  console.log("Fetched reviews at backend:", JSON.stringify(reviews, null, 2));

  if (user) {
    // Default profile image path
    const DEFAULT_PROFILE_IMAGE = "/assets/default-profile.jpg"; 
    
    // Set profile image, ensuring full URL
    const fullProfileImage = user.profileImage
      ? user.profileImage.startsWith("http") // use full URL later
        ? user.profileImage
        : `${req.protocol}://${req.get("host")}${user.profileImage}`
      : `${req.protocol}://${req.get("host")}${DEFAULT_PROFILE_IMAGE}`; 

    res.json({ ...user.toJSON(), profileImage: fullProfileImage, reviews: reviews });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
      res.status(404);
      throw new Error("User not found");
  }

  // Update fields (email should not be updated)
  user.name = req.body.name || user.name;
  user.campus = req.body.campus || user.campus;
  user.bio = req.body.bio || user.bio;
  user.policy = req.body.policy || user.policy;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

  await user.save();

  res.json({ message: "Profile updated successfully", user });
});


// @desc    Upload profile image
// @route   POST /api/users/upload-profile-image
// @access  Private
const uploadProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (req.file) {
    const API_URL = process.env.API_URL || "http://localhost:5500"; 
    const imageUrl = `${API_URL}/uploads/profile/${req.file.filename}`;

    user.profileImage = imageUrl;
    await user.save();

    res.json({ message: "Profile image uploaded successfully", imageUrl });
  } else {
    res.status(400);
    throw new Error("No image uploaded");
  }
});



module.exports = { 
  registerUser, 
  loginUser,
  getUserProfile,
  updateUserProfile,
  uploadProfileImage
};
