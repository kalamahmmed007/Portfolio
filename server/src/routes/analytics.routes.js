import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const projects = await Project.countDocuments();
  const users = await User.countDocuments();
  const messages = await Contact.countDocuments();

  res.json({
    projects,
    users,
    messages
  });
});

export default router;
