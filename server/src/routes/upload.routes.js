import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);

export default router;
