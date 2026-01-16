import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  await Contact.create(req.body);
  res.json({ success: true, message: "Message sent" });
};

export const getMessages = async (req, res) => {
  res.json(await Contact.find().sort({ createdAt: -1 }));
};
