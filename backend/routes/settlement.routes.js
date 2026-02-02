import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createSettlement,
  getSettlements,
} from "../controllers/settlement.controller.js";

const router = express.Router();

router.post("/:groupId/settlements", authMiddleware, createSettlement);
router.get("/:groupId/settlements", authMiddleware, getSettlements);

export default router;
