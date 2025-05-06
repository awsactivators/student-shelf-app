const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const listingsRoutes = require("./routes/listingsRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const searchRoutes = require("./routes/searchRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Serve images for profile and listing uploads
app.use("/uploads/profile", express.static(path.join(__dirname, "uploads/profile")));
app.use("/uploads/listings", express.static(path.join(__dirname, "uploads/listings")));
app.use("/assets", express.static("public/assets")); // Serve images from public folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// User Routes
app.use("/api/users", userRoutes);

// Listing route
app.use("/api/listings", listingsRoutes);

// Seller route
app.use("/api/sellers", sellerRoutes);

// Add Search Route
app.use("/api/search", searchRoutes);

// Add Review
app.use("/api/reviews", reviewRoutes);

// Add Favorite
app.use("/api/favorites", favoriteRoutes);

// Add Notification
app.use("/api/notifications", notificationRoutes);

// Contact Us Route
app.use("/api/contact", contactRoutes);

// Message Route
app.use('/api/messages', messageRoutes);


app.use(errorHandler);


// Listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
