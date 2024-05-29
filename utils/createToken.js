import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (studentId) => {
  const token = jwt.sign({ studentId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token
};

export default generateToken;
