import "./db.js";
import express from "express";
import cors from "cors";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.post("/api/register", async (req, res) => {
  const { id, password } = req.body;
  console.log(id, password);
  try {
    const user = new User({ id, password });
    console.log(user);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ message: "idFail" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "passwordFail" });
    }

    // JWT 발급
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/post", (req, res) => {
  const { title, content } = req.body;
  console.log("Received data:", { title, content });

  // 데이터 처리 후 응답
  res.status(200).json({ message: "Post received successfully!" });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
