import Settlement from "../models/Settlement.js";
import Group from "../models/Group.js";

export const createSettlement = async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const groupId = req.params.groupId;

    if (!from || !to || !amount) {
      return res.status(400).json({
        message: "Invalid settlement data",
      });
    }

    // Validate group exists
    const group = await Group.findById(groupId);
    if (!group)
      return res.status(404).json({ message: "Group not found" });
console.log("req.userId:", req.userId);
console.log("group.members:", group.members);
    // Validate member access
    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const settlement = await Settlement.create({
      groupId,
      from,
      to,
      amount: Number(amount),
    });

    res.status(201).json(settlement);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create settlement",
    });
  }
};

export const getSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.find({
      groupId: req.params.groupId,
    }).sort({ createdAt: -1 });

    res.json(settlements);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch settlements",
    });
  }
};
