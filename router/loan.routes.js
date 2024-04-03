import express from "express";
import { addLoanController } from "../controller/loanController.js";
const route = express.Router();

route.post("/add", addLoanController);

export default route;
