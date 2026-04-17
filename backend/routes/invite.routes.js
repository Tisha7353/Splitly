import express from "express";
import Invite from "../models/Invite.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ================= SEND INVITE =================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { groupId, email } = req.body;

    const receiver = await User.findOne({ email });
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent duplicate invite
    const exists = await Invite.findOne({
      groupId,
      receiverId: receiver._id,
      status: "pending",
    });

    if (exists) {
      return res.status(400).json({ message: "Invite already sent" });
    }

    const invite = await Invite.create({
      groupId,
      senderId: req.userId, // ✅ FIXED
      receiverId: receiver._id,
    });

    res.json(invite);

  } catch (err) {
    console.error("SEND INVITE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET INVITES =================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const invites = await Invite.find({
      receiverId: req.userId, // ✅ FIXED
      status: "pending",
    }).populate("groupId senderId");

    res.json(invites);

  } catch (err) {
    console.error("GET INVITES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ACCEPT =================
router.post("/:id/accept", authMiddleware, async (req, res) => {
  try {
    const invite = await Invite.findById(req.params.id);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    invite.status = "accepted";
    await invite.save();

    await Group.findByIdAndUpdate(invite.groupId, {
      $addToSet: { members: invite.receiverId },
    });

    res.json({ success: true });

  } catch (err) {
    console.error("ACCEPT INVITE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REJECT =================
router.post("/:id/reject", authMiddleware, async (req, res) => {
  try {
    const invite = await Invite.findById(req.params.id);

    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    invite.status = "rejected";
    await invite.save();

    res.json({ success: true });

  } catch (err) {
    console.error("REJECT INVITE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;