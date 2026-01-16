import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  res.json(await Project.find().sort({ createdAt: -1 }));
};

export const createProject = async (req, res) => {
  res.json(await Project.create(req.body));
};

export const updateProject = async (req, res) => {
  res.json(
    await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
  );
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
