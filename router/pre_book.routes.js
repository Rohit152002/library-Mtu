import express from "express";
import {
  addPreBookController,
  getPreBookByStudentIdController,
  getPreBookforStudentController,
  deletePreBookController,
  takenPrebookController,
} from "../controller/preBookController.js";

import { authenticate } from "../middleware/authorize.js";
const router = express.Router();

router.post("/", authenticate, addPreBookController);
// router.get("/all", getAllPrebookController);
router.get("/:id", getPreBookByStudentIdController);
router.get("/", authenticate, getPreBookforStudentController);
router.post("/taken/:id", authenticate, takenPrebookController);
router.delete("/:id", authenticate, deletePreBookController);

export default router;
