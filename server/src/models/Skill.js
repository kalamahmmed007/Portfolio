import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" },
    icon: String
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
