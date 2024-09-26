import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // 텍스트 저장
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String }, // 이미지 URL 저장
  createdAt: { type: Date, default: Date.now },
});
const Text = mongoose.model("Text", textSchema);

export default Text;
