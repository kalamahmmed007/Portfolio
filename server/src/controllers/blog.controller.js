import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  res.json(await Blog.find().sort({ createdAt: -1 }));
};

export const createBlog = async (req, res) => {
  res.json(await Blog.create(req.body));
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
