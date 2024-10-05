import mongoose from "mongoose";
const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Text",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // 댓글 작성자
    required: true,
  },
  content: {
    type: String, // 댓글 내용
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // 댓글 작성 시간
  },
});

// Comment 모델 생성
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
