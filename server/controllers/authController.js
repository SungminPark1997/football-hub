import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ID 중복 확인
export const checkIdAvailability = async (req, res) => {
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
};

// 회원가입
export const registerUser = async (req, res) => {
  const { id, password, email, name } = req.body;

  try {
    const user = new User({ id, password, email, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

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
    res.status(400).json({ error: error.message });
  }
};

// 로그인
export const loginUser = async (req, res) => {
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

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.body; // 사용자 ID를 body에서 가져옴
    const file = req.file; // multer를 통해 업로드된 파일

    // 파일이 있으면 파일 URL을 저장, 없으면 기존 이미지 유지
    const photoUrl = file ? file.location : req.body.existingAvatarUrl;
    console.log("야야 여기 확인좀", id, file);
    // 사용자 정보 업데이트
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { photoUrl }, // 프로필 이미지 URL을 업데이트
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
