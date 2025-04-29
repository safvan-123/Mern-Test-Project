import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debugging

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the app if connection fails
  }
};

export default connectDB;
