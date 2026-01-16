import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/database.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// middlewares
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* =========================
   Database Connection
========================= */
connectDB();

/* =========================
   Global Middlewares
========================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* =========================
   API Routes
========================= */
app.get("/", (req, res) => {
  res.send("🔥 Portfolio Backend API is live");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);

/* =========================
   Error Handler
========================= */
app.use(errorHandler);

export default app;
