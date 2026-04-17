import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import settlementRoutes from "./routes/settlement.routes.js"
import inviteRoutes from "./routes/invite.routes.js";
import expenseRoutes from "./routes/expense.routes.js"
import reportRoutes from "./routes/report.routes.js"
dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/groups", settlementRoutes);
app.use("/groups", reportRoutes);
app.use("/api/invite", inviteRoutes)
app.listen(5000, () => {
  console.log("🚀 Auth server running on port 5000");
});
