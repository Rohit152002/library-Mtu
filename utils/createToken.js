import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (res, studentId) => {
  const token = jwt.sign({ studentId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true only in production
    sameSite: "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
