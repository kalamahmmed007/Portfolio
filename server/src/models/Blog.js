import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String,
    author: String,
    coverImage: String,
    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
