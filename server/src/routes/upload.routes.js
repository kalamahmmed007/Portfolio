import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/upload.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/image", protect, upload.single("image"), uploadImage);

export default router;
