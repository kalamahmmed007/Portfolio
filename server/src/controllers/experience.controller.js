import Experience from "../models/Experience.js";

export const getExperience = async (req, res) => {
  res.json(await Experience.find().sort({ startDate: -1 }));
};

export const addExperience = async (req, res) => {
  res.json(await Experience.create(req.body));
};

export const deleteExperience = async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: "Experience deleted" });
};
