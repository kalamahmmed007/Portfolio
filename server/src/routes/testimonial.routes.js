import express from "express";
import { getTestimonials, addTestimonial, deleteTestimonial } from "../controllers/testimonial.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, addTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;
