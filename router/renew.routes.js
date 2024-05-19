import express from "express";
import {
  AddRenewRequest,
  getRenewRequestsStudent,
  allRenewRequestStudent,
  acceptRenewRequest,
  rejectRenewRequest,
} from "../controller/renewController.js";
const router = express.Router();
import { authenticate } from "../middleware/authorize.js";
// router.post("/", authenticate, AddRenewRequest);
// router.get("/", authenticate, getRenewRequestsStudent);

router
  .route("/")
  .post(authenticate, AddRenewRequest)
  .get(authenticate, getRenewRequestsStudent);
router.get("/all", allRenewRequestStudent);
router.put("/accept/:id", acceptRenewRequest);
router.put("/reject/:id", rejectRenewRequest);
export default router;
