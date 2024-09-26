import express from "express";
import { getTexts, registerText } from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.post("/", registerText);

postRoutes.get("/getText", getTexts);
export default postRoutes;
