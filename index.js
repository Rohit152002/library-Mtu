import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import loanRoute from "./router/loan.routes.js";
import bookRoute from "./router/book.routes.js";
import studentRoute from "./router/student.routes.js";
import dotenv from "dotenv";

dotenv.config();
import mongodb from "./config/db.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
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
  console.log(`Server is running on port ${PORT}`);
});
