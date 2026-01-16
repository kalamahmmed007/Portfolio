import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    description: String
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
