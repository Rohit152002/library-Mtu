const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const loanRoute = require("./router/loan.routes");
const bookRoute = require("./router/book.routes");
const studentRoute = require("./router/student.routes");

require("dotenv").config();
const mongodb = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/loan", loanRoute);
app.use("/api/book", bookRoute);
app.use("/api/student", studentRoute);

app.get("/", (req, res) => {
  res.send("Server Running");
});
mongodb();
app.listen(PORT, () => {
  console.log("Server Running");
});
