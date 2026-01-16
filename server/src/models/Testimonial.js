import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    company: String,
    message: { type: String, required: true },
    avatar: String
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
