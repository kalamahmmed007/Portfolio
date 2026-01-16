import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
