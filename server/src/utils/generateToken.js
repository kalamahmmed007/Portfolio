import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export default generateToken;
