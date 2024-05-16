import express from "express";
import {
  AddRenewRequest,
  getRenewRequestsStudent,
  allRenewRequestStudent,
  acceptRenewRequest,
} from "../controller/renewController.js";
const router = express.Router();
import { authenticate } from "../middleware/authorize.js";
router.post("/", authenticate, AddRenewRequest);
router.get("/", authenticate, getRenewRequestsStudent);

router.route("/").post(AddRenewRequest).get(getRenewRequestsStudent);
router.get("/all", authenticate, allRenewRequestStudent);
router.put("/accept/:id", acceptRenewRequest);
export default router;
