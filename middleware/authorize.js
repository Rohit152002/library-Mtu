const jwt = require("jsonwebtoken");
const Student = require("../model/student");

require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.student = await Student.findById(decoded.studentId).select(
          "-password"
        );
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed.");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token.");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

module.exports = { authenticate, authorizeAdmin };
