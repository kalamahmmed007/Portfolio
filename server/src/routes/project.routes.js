import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// ADMIN
router.post("/", protect, async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

router.delete("/:id", protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

export default router;
