import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js"; // 데이터베이스 연결
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // React 클라이언트의 주소로 변경
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      secure: false, // HTTPS 환경에서 true로 설정
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  })
);
// 라우터 적용
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/match", matchRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
