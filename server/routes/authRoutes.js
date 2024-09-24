import express from "express";
import {
  registerUser,
  loginUser,
  checkIdAvailability,
  updateProfile,
} from "../controllers/authcontroller.js";
import { avatarUpload } from "../middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser); // 회원가입
authRoutes.post("/login", loginUser); // 로그인
authRoutes.post("/check-id", checkIdAvailability); // ID 중복 확인
authRoutes.post(
  "/update-profile",
  avatarUpload.single("avatar"),
  updateProfile
);

export default authRoutes;
