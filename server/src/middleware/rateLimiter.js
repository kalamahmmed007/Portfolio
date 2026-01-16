import rateLimit from "express-rate-limit";
import config from "../config/config.js";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, chill for a bit 😴"
  }
});

export default rateLimiter;
