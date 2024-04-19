import express from "express";
import {
  AddRenewRequest,
  getRenewRequestsStudent,
} from "../controller/renewController.js";
const router = express.Router();
import { authenticate } from "../middleware/authorize.js";
router.post("/", authenticate, AddRenewRequest);
router.get("/", authenticate, getRenewRequestsStudent);

export default router;
