const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cors());

// Use user routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Static folder for profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);


// Listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
