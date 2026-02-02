import Expense from "../models/Expense.js";
import Group from "../models/Group.js";



export const createExpense = async (req, res) => {
  console.log("Incoming expense body:", req.body);
  try {
    const { description, amount, payerId, splits } = req.body;
    const groupId = req.params.groupId;

    if (!description || !amount || !payerId || !splits?.length) {
      return res.status(400).json({ message: "Invalid expense data" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const total = Number(amount);

    // ✅ Normalize splits
    const normalizedSplits = splits.map((s) => {
      const amt = Number(s.amount || 0);
      const pct =
        typeof s.percentage === "number"
          ? Number(s.percentage)
          : (amt / total) * 100;

      return {
        userId: s.userId,
        amount: amt,
        percentage: pct,
      };
    });

    // ✅ Validate totals
    const splitTotal = normalizedSplits.reduce(
      (sum, s) => sum + s.amount,
      0
    );

    if (Math.abs(splitTotal - total) > 0.01) {
      return res.status(400).json({
        message: "Split total does not match expense amount",
      });
    }

    const expense = await Expense.create({
      groupId,
      description,
      amount: total,
      payerId,
      splits: normalizedSplits,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create expense" });
  }
};

// controllers/expense.controller.js
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({
    groupId: req.params.groupId,
  }).sort({ createdAt: -1 });

  res.json(expenses);
};
