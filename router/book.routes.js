import express from "express";
import {
  addBookController,
  getBookController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
} from "../controller/bookController.js";
const route = express.Router();

route.post("/add", addBookController);
route.get("/get", getBookController);
route.get("/get/:id", getBookByIdController);
route.put("/update/:id", updateBookByIdController);
route.delete("/delete/:id", deleteBookByIdController);

export default route;
