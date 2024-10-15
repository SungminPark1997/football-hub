import express from "express";
import cors from "cors";
import "./db.js"; // 데이터베이스 연결
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
//import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 라우터 적용
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/match", matchRoutes);
//app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
