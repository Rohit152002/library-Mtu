const express = require("express");
const { addLoanController } = require("../controller/loanController");
const route = express.Router();

route.post("/add", addLoanController);

module.exports = route;
