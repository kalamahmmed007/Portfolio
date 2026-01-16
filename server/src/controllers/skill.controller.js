import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  res.json(await Skill.find());
};

export const addSkill = async (req, res) => {
  res.json(await Skill.create(req.body));
};

export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Skill removed" });
};
