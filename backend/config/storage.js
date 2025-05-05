import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

// Define where and how to store files in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // which cloudinary account to use
  params: {
    folder: "uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // allowed file types
  },
});

export default storage;
