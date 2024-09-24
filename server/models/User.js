import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // 유저 ID
  password: { type: String, required: true }, // 비밀번호
  email: { type: String, required: true, unique: true }, // 이메일 (중복 허용 안 함)
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // 계정 생성일
  photoUrl: { type: String },
});

// 비밀번호 해싱 (저장 전 비밀번호를 암호화)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // 비밀번호가 수정된 경우에만 해싱
  this.password = await bcrypt.hash(this.password, 10); // 비밀번호를 해싱
  next();
});

// 비밀번호 비교 메서드 (로그인 시 입력된 비밀번호를 검증)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
