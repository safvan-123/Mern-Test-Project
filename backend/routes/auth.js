// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import cookieParser from "cookie-parser";
import AuthUser from "../models/AuthUser.js";

const router = express.Router();
router.use(cookieParser());

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthUser.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ msg: "Server error during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required." });
    const user = await AuthUser.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Email not found. Please register first." });
    if (!user.password)
      return res
        .status(400)
        .json({ msg: "Google login required for this account." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error during login." });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:3000/users");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect("http://localhost:3000");
  });
});

router.get("/users", (req, res) => {
  res.json(req.user || null);
});

export default router;
