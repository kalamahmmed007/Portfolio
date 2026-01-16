import express from "express";
import { getExperience, addExperience, deleteExperience } from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getExperience);
router.post("/", protect, addExperience);
router.delete("/:id", protect, deleteExperience);

export default router;
