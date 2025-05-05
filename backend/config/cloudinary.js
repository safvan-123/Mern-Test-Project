import { v2 as cloudinary } from "cloudinary";

// Connect to your Cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // from .env file
  api_key: process.env.CLOUDINARY_API_KEY, // from .env file
  api_secret: process.env.CLOUDINARY_API_SECRET, // from .env file
});

export default cloudinary;
