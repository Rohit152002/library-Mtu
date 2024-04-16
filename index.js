import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";
import cookieParser from "cookie-parser";
import loanRoute from "./router/loan.routes.js";
import bookRoute from "./router/book.routes.js";
import studentRoute from "./router/student.routes.js";
import branchRoute from "./router/branch.routes.js";
import prebookRoute from "./router/pre_book.routes.js";
import uploadRoute from "./router/upload.routes.js";
import dotenv from "dotenv";

dotenv.config();
import mongodb from "./config/db.js";
const app = express();
console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/loan", loanRoute);
app.use("/api/book", bookRoute);
app.use("/api/student", studentRoute);
app.use("/api/branch", branchRoute);
app.use("/api/prebook", prebookRoute);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(`${__dirname}/uploads`)));

//testing server
app.get("/", (req, res) => {
  res.send("Server Running");
});

mongodb();
app.listen(PORT, () => {
  console.log("Server Running");
  console.log(`Server is running on port ${PORT}`);
});
