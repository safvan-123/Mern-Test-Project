import express from "express";
import multer from "multer";
// import storage from "../config/storage"; // make sure to add .js if needed in your project

const router = express.Router();

// Tell multer to use cloudinary storage
const upload = multer({ storage });

// Create POST route to upload image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    console.log(req.file); // show file info in terminal
    res.json({ url: req.file.path }); // send cloudinary URL back to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
