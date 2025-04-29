import mongoose from "mongoose";

const AuthuserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  googleId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AuthUser = mongoose.model("AuthUser", AuthuserSchema);

export default AuthUser;
