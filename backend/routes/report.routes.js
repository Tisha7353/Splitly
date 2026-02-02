import express from "express";
import authMiddleware  from "../middleware/auth.middleware.js";
import { getGroupReport } from "../controllers/report.controller.js";

const router = express.Router();

router.get("/:groupId/report", authMiddleware, getGroupReport);

export default router;
