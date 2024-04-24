import express from "express";
import {
  addBookController,
  getBookController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
  getBookByBranchId,
  searchBook,
} from "../controller/bookController.js";
import multer from "multer";

const upload = multer();
const route = express.Router();

route.post("/add", upload.any(), addBookController);
route.get("/search", searchBook);
route.get("/get", getBookController);
route.get("/get/:id", getBookByIdController);
route.get("/get/branch/:id", getBookByBranchId);
route.put("/update/:id", updateBookByIdController);
route.delete("/delete/:id", deleteBookByIdController);

export default route;
