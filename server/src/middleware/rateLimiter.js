import rateLimit from "express-rate-limit";
import config from "../config/config.js";

const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, chill for a bit 😴"
  }
});

export default rateLimiter;
