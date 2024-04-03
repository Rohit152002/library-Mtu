import express from "express";
import {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  getCurrentUserProfile,
} from "../controller/studentController.js";
const route = express.Router();

import { authenticate, authorizeAdmin } from "../middleware/authorize.js";
// route.post("/add", addStudentController);
// route.get("/get", getStudentController);
// route.get("/:id", getStudentByIdController);
// route.put("/:id", updateStudentController);

route.route("/").post(addStudentController).get(getStudentController);
route.route("/profile").get(authenticate, getCurrentUserProfile);
route.route("/verify").post(authenticate, verifyStudentController);
export default route;
