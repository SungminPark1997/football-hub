import express from "express";
import { getUclMatches } from "../controllers/matchController.js";
const matchRoutes = express.Router();
matchRoutes.get("/cl", getUclMatches);
export default matchRoutes;
