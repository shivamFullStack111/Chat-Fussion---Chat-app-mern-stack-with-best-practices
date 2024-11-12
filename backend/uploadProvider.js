const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.C_NAME,
  api_key: process.env.C_KEY,
  api_secret: process.env.C_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.C_NAME, // Specify a folder on Cloudinary to store the files
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Specify allowed file formats
  },
});

exports.upload = multer({ storage: storage });
