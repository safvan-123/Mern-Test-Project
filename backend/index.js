import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import UserModel from "./models/Users.js";
import passport from "./config/passport.js";
import session from "express-session";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Important for allowing cookies/session data
  })
);
// app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      sameSite: "lax", // Use 'strict' or 'lax' based on your use case
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/createuser", (req, res) => {
  try {
    const { name, age, email, role, image } = req.body;
    console.log(req.body);

    if (!name || !age || !email || !role || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new UserModel({
      name,
      age: Number(age),
      email,
      role,
      image,
    });

    newUser
      .save()
      .then((user) =>
        res.status(201).then((user) =>
          res.status(201).json({
            _id: user._id,
            name: user.name,
            age: user.age,
            email: user.email,
            role: user.role,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          })
        )
      ) // Use status 201 for successful creation
      .catch((error) => res.status(400).json(error));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
