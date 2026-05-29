import express from "express";

import {
  depositFunds,
  getWallet
} from "../controllers/walletController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/deposit",
  authMiddleware,
  depositFunds
);

router.get(
  "/",
  authMiddleware,
  getWallet
);

export default router;