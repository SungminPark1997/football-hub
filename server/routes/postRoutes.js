import express from "express";
import {
  deleteComments,
  deleteTexts,
  getCommentsByPostId,
  getLatestTexts,
  getTexts,
  registerComment,
  registerText,
} from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.post("/", registerText);

postRoutes.get("/getText", getTexts);
postRoutes.delete("/deleteText/:postId", deleteTexts);
postRoutes.post("/comments/:postId", registerComment);
postRoutes.get("/comments/:postId", getCommentsByPostId);
postRoutes.get("/latest", getLatestTexts);
postRoutes.delete("/comments/:commentId", deleteComments);
export default postRoutes;
