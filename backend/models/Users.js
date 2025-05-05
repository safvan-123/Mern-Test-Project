import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    role: String,
    image: {
      type: String, // This will store the Cloudinary URL
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
