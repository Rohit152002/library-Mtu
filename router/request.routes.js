import express from "express";
import {
  addedRequestBook,
  addRequestBook,
  deleteRequestBook,
  getRequestBook,
} from "../controller/requestController.js";
const router = express.Router();

import { authenticate } from "../middleware/authorize.js";

router.post("/", authenticate, addRequestBook);
router.get("/", getRequestBook);
router.put("/:id", authenticate, addedRequestBook);
router.delete("/:id", authenticate, deleteRequestBook);
export default router;
