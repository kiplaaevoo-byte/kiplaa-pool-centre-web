import express from "express";

import {
  createMatch,
  declareWinner
} from "../controllers/matchController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createMatch
);

router.post(
  "/winner",
  authMiddleware,
  declareWinner
);

export default router;