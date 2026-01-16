import express from "express";
import { getSkills, addSkill, deleteSkill } from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", protect, addSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
