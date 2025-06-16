const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "student-shelf/other";
      if (req.listingUpload) folder = "student-shelf/listings";
      if (req.profileUpload) folder = "student-shelf/profile";
      if (req.messageUpload) folder = "student-shelf/messages";
    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const uploader = multer({ storage });

module.exports = { uploader };











// const multer = require("multer");
// const path = require("path");

// // Define storage paths for profile and listing images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (req.listingUpload) {
//       cb(null, "uploads/listings/"); // Save listing images in 'uploads/listings'
//     } else {
//       cb(null, "uploads/profile/"); // Save profile images in 'uploads/profile'
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);

//   },
// });

// // File type validation
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extname && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only!"));
//   }
// };

// // Multer upload configurations
// const profileUpload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// });

// const listingUpload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 },  // 5MB limit for listings
// });

// module.exports = { profileUpload, listingUpload };
