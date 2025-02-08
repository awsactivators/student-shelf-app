require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
