import express from "express";
import {
  addLoanController,
  submitController,
  getAllLoanController,
  getLoanById,
  searchLoanBooks,
  renewLoanBooks,
  checkOverDueLoans,
} from "../controller/loanController.js";
const route = express.Router();

import { authenticate } from "../middleware/authorize.js";

route.post("/add", addLoanController);
route.post("/submit", submitController);
route.get("/", getAllLoanController);
route.get("/:id", authenticate, getLoanById);
route.get("/search/:id", searchLoanBooks);
route.get("/overdue", checkOverDueLoans);
route.put("/renew/:id", renewLoanBooks);
export default route;
