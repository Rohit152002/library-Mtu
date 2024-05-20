//import library
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import path from "node:path";
import cookieParser from "cookie-parser";

//routes
import loanRoute from "./router/loan.routes.js";
import bookRoute from "./router/book.routes.js";
import studentRoute from "./router/student.routes.js";
import branchRoute from "./router/branch.routes.js";
import prebookRoute from "./router/pre_book.routes.js";
import RenewRoute from "./router/renew.routes.js";
import RequestRoute from "./router/request.routes.js";
import { checkOverDueLoans } from "./controller/loanController.js";

import mongodb from "./config/db.js";
const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://127.0.0.1:5173",
//       "http://localhost:5174",
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://librarymanagmentweb.vercel.app",

    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/loan", loanRoute); //http:localhost:8080/api/loan
app.use("/api/book", bookRoute); //http:localhost:8080/api/book
app.use("/api/branch", branchRoute); //http:localhost:8080/api/branch
app.use("/api/student", studentRoute); //http:localhost:8080/api/student
app.use("/api/prebook", prebookRoute); //http:localhost:8080/api/prebook
app.use("/api/renew", RenewRoute); //http:localhost:8080/api/renew
app.use("/api/request", RequestRoute); //http:localhost:8080/api/request

cron.schedule("0 0 * * *", () => {
  checkOverDueLoans();
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(`${__dirname}/uploads`)));

//testing server
app.get("/", (req, res) => {
  res.send("Server Running");
});

mongodb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
