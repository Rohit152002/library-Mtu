import express from "express";
import {
  addLoanController,
  submitController,
  getAllLoanController,
  getLoanById,
} from "../controller/loanController.js";
const route = express.Router();

import { authenticate } from "../middleware/authorize.js";

route.post("/add", addLoanController);
route.post("/submit", submitController);
route.get("/", getAllLoanController);
route.get("/:id", authenticate, getLoanById);
export default route;
