import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: String,
    startDate: Date,
    endDate: Date,
    description: String
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
