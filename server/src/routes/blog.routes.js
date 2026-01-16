import express from "express";
import { getBlogs, createBlog, deleteBlog } from "../controllers/blog.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", protect, createBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
