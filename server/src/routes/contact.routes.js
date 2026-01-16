import express from "express";
import { sendMessage, getMessages } from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", protect, getMessages);

export default router;
