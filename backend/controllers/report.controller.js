import Expense from "../models/Expense.js";
import Settlement from "../models/Settlement.js";
import Group from "../models/Group.js";

export const getGroupReport = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const expenses = await Expense.find({ groupId });
    const settlements = await Settlement.find({ groupId });

    // ===== TOTALS =====
    const totalExpenses = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const totalSettlements = settlements.reduce(
      (sum, s) => sum + Number(s.amount),
      0
    );

    // ===== SPENDING BY USER =====
    const userMap = {};

    expenses.forEach((e) => {
      const id = e.payerId.toString();
      userMap[id] = (userMap[id] || 0) + Number(e.amount);
    });

    const expensesByUser = Object.entries(userMap).map(
      ([userId, total]) => ({
        userId,
        total,
      })
    );

    // ===== MONTHLY SPENDING =====
    const monthlyMap = {};

    expenses.forEach((e) => {
      const d = new Date(e.createdAt);
      const key = `${d.getFullYear()}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}`;

      monthlyMap[key] =
        (monthlyMap[key] || 0) + Number(e.amount);
    });

    const monthlySpending = Object.entries(monthlyMap)
      .sort()
      .map(([month, amount]) => ({
        month,
        amount,
      }));

    // ===== BIGGEST EXPENSE =====
    const biggestExpense =
      expenses.length > 0
        ? Math.max(...expenses.map((e) => Number(e.amount)))
        : 0;

    // ===== AVERAGE EXPENSE =====
    const averageExpense =
      expenses.length > 0
        ? totalExpenses / expenses.length
        : 0;

        // ===== TRUE CONTRIBUTION (consumed) =====
const contributionMap = {};

expenses.forEach((e) => {
  e.splits?.forEach((s) => {
    const id = s.userId.toString();
    contributionMap[id] =
      (contributionMap[id] || 0) + Number(s.amount);
  });
});

const contributionByUser = Object.entries(
  contributionMap
).map(([userId, total]) => ({
  userId,
  total,
}));

    res.json({
      totalExpenses,
      totalSettlements,
      expensesByUser,
       contributionByUser,
      monthlySpending,
      biggestExpense,
      averageExpense,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Report failed" });
  }
};
