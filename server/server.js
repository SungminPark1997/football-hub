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
app.post("/api/check-id", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ id });
    if (user) {
      return res.status(400).json({ message: "ID already exists" });
    }
    res.status(200).json({ message: "ID is available" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/register", async (req, res) => {
  const { id, password, email, name } = req.body;

  try {
    // 새로운 사용자 생성
    const user = new User({ id, password, email, name });
    await user.save(); // 사용자 저장

    // 회원가입 후 JWT 발급
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // 성공 응답, 사용자 정보와 토큰을 함께 전송
    res.status(201).json({
      message: "Registration and login successful",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // 오류 발생 시 오류 메시지 응답
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    // 사용자를 ID로 찾기
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ message: "idFail" });
    }

    // 비밀번호 비교
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "passwordFail" });
    }

    // JWT 발급
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // 사용자 정보와 토큰을 함께 전달
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email, // 여기서 'name'은 User 모델에서 추가된 이름 필드
      },
    });
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
