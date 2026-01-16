import Education from "../models/Education.js";

export const getEducation = async (req, res) => {
  res.json(await Education.find());
};

export const addEducation = async (req, res) => {
  res.json(await Education.create(req.body));
};

export const deleteEducation = async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: "Education deleted" });
};
