import express from "express";
import { getEducation, addEducation, deleteEducation } from "../controllers/education.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getEducation);
router.post("/", protect, addEducation);
router.delete("/:id", protect, deleteEducation);

export default router;
