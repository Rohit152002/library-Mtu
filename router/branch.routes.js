import express from "express";
import {
  addBranchController,
  getBranchesController,
  updateBranchesController,
  deleteBranchController,
  getBranchByIdController,
} from "../controller/branchController.js";
const router = express.Router();

router.post("/add", addBranchController);
router.get("/", getBranchesController);
router
  .route("/:id")
  .put(updateBranchesController)
  .delete(deleteBranchController);

export default router;
