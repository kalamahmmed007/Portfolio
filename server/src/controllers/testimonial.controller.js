import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  res.json(await Testimonial.find());
};

export const addTestimonial = async (req, res) => {
  res.json(await Testimonial.create(req.body));
};

export const deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Testimonial deleted" });
};
