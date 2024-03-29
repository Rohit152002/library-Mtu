const express = require("express");
const {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  getCurrentUserProfile,
} = require("../controller/studentController");
const route = express.Router();

const { authenticate, authorizeAdmin } = require("../middleware/authorize.js");
// route.post("/add", addStudentController);
// route.get("/get", getStudentController);
// route.get("/:id", getStudentByIdController);
// route.put("/:id", updateStudentController);

route.route("/").post(addStudentController).get(getStudentController);
route.route("/profile").get(authenticate, getCurrentUserProfile);
route.route("/verify").post(authenticate, verifyStudentController);
module.exports = route;
