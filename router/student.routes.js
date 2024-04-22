import express from "express";
import {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  getCurrentUserProfile,
  loginStudentController,
  searchByRegistration,
} from "../controller/studentController.js";
const route = express.Router();

import { authenticate, authorizeAdmin } from "../middleware/authorize.js";
route.post("/login", loginStudentController);
route.route("/").post(addStudentController).get(getStudentController);
route.route("/profile").get(authenticate, getCurrentUserProfile);
route.route("/verify").post(authenticate, verifyStudentController);
route
  .route("/get/:id")
  .get(getStudentByIdController)
  .put(updateStudentController);
route.get("/search", searchByRegistration);
route.delete("/:id", deleteBystudentId);
export default route;
