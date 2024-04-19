import RenewRequest from "../model/renewRequest.js";
import mongoose from "mongoose";

export const AddRenewRequest = async (req, res) => {
  try {
    const { loan_id } = req.body;
    const student_id = req.student._id;
    const objectId = new mongoose.Types.ObjectId(loan_id);
    const data = await RenewRequest.create({
      loan_id: objectId,
      student_id,
    });
    console.log("helo");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getRenewRequestsStudent = async (req, res) => {
  try {
    const data = await RenewRequest.find({
      student_id: req.student._id,
    }).populate({
      path: "student_id",
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
