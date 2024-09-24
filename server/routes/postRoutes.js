import express from "express";
import { createPost } from "../controllers/postController.js";

const router = express.Router();

//router.post("/", createPost); // 게시글 생성 라우트
router.post("/");
export default router;
