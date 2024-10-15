import express from "express";
import {
  getEplMatches,
  getUclMatches,
} from "../controllers/matchController.js";
const matchRoutes = express.Router();
matchRoutes.get("/cl", getUclMatches);
matchRoutes.get("/pl", getEplMatches);
export default matchRoutes;
