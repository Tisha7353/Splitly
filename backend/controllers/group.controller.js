import Group from "../models/Group.js";


import User from "../models/User.js";

export const addMemberToGroup = async (req, res) => {
  try {
    const { email } = req.body;
    const groupId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Only members can add other members
    if (!group.members.some(m => m.toString() === req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prevent duplicate members
    if (group.members.includes(userToAdd._id)) {
      return res.status(400).json({ message: "User already in group" });
    }

    group.members.push(userToAdd._id);
    await group.save();

    res.json({ message: "Member added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add member" });
  }
};


export const createGroup = async (req, res) => {
  try {
    const { name, description, currency } = req.body;

    if (!name || name.length < 3) {
      return res.status(400).json({ message: "Group name too short" });
    }

    const group = await Group.create({
      name,
      description,
      currency,
      createdBy: req.userId,
      members: [req.userId],
    });

    res.status(201).json(group);
  } catch {
    res.status(500).json({ message: "Failed to create group" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.userId,
    }).sort({ createdAt: -1 });

    res.json(groups);
  } catch {
    res.status(500).json({ message: "Failed to fetch groups" });
  }
};
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "firstName email");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.some(m => m._id.toString() === req.userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(group);
  } catch {
    res.status(500).json({ message: "Failed to load group" });
  }
};
