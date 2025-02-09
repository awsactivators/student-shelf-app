// const multer = require("multer");
// const path = require("path");
// // const fs = require("fs");

// // Configure storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/"); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// // File type validation
// const fileFilter = (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (extname && mimeType) {
//         return cb(null, true);
//     } else {
//         cb(new Error("Images only!"));
//     }
// };

// // Multer upload settings
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// });

// module.exports = upload;


const multer = require("multer");
const path = require("path");

// Define storage paths for profile and listing images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.listingUpload) {
      cb(null, "uploads/listings/"); // Save listing images in 'uploads/listings'
    } else {
      cb(null, "uploads/profile/"); // Save profile images in 'uploads/profile'
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
};

// Multer upload configurations
const profileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

const listingUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for listings
});

// Middleware for setting listing upload flag
const setListingUpload = (req, res, next) => {
  req.listingUpload = true;
  next();
};

module.exports = { profileUpload, listingUpload, setListingUpload };
