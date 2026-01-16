import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("📩 Contact message:", req.body);
  res.json({ success: true, msg: "Message received" });
});

export default router;
