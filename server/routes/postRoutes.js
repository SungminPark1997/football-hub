import express from "express";
import {
  deleteComments,
  getCommentsByPostId,
  getTexts,
  registerComment,
  registerText,
} from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.post("/", registerText);

postRoutes.get("/getText", getTexts);
postRoutes.post("/comments/:postId", registerComment);
postRoutes.get("/comments/:postId", getCommentsByPostId);
postRoutes.delete("/comments/:commentId", deleteComments);
export default postRoutes;
