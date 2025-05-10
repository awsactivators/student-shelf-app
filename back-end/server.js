const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");


// Route imports
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
const flagRoutes = require("./routes/flagRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;
const server = http.createServer(app); 

// Initialize Socket.IO
const io = socketio(server, {
  cors: {
    origin: '*', // Allow frontend dev server
  }
});
global.io = io;
global.activeChats = {};

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/flags", flagRoutes);
app.use("/api/admin", adminRoutes);

// Serve static files
app.use("/uploads/profile", express.static(path.join(__dirname, "uploads/profile")));
app.use("/uploads/listings", express.static(path.join(__dirname, "uploads/listings")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static("public/assets"));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
