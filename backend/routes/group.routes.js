import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createGroup,
  getGroupById,
  getGroups,
} from "../controllers/group.controller.js";
import { addMemberToGroup } from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createGroup);
router.get("/", authMiddleware, getGroups);
router.get("/:id", authMiddleware, getGroupById);

router.post("/:id/members", authMiddleware, addMemberToGroup);
export default router;
