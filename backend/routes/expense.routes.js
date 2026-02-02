import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createExpense,
  
} from "../controllers/expense.controller.js";
import { getExpenses } from "../controllers/expense.controller.js";
const router = express.Router();


router.post("/:groupId", auth, createExpense);
router.get("/:groupId", auth, getExpenses);

export default router;
