const bcrypt = require("bcryptjs");
const { User } = require("../models"); // Import the User model

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
      rating: 0.0, // Default rating
      activeListings: 0, // Default number of listings
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

module.exports = { registerUser };
