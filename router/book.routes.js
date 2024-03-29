const express = require("express");
const {
  addBookController,
  getBookController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
} = require("../controller/bookController");
const route = express.Router();

route.post("/add", addBookController);
route.get("/get", getBookController);
route.get("/get/:id", getBookByIdController);
route.put("/update/:id", updateBookByIdController);
route.delete("/delete/:id", deleteBookByIdController);

module.exports = route;
