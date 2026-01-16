import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimiter from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/error.js";
import config from "./config/config.js";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import educationRoutes from "./routes/education.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

// Initialize app
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimiter);

// Base route
app.get("/", (req, res) => res.send("🚀 Portfolio API running"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/messages", contactRoutes);
app.use("/api/upload", uploadRoutes);

// Error handler
app.use(errorHandler);

export default app;
