import RenewRequest from "../model/renewRequest.js";
import Loan from "../model/loan.js";
import mongoose from "mongoose";

export const AddRenewRequest = async (req, res) => {
  try {
    const { loan_id } = req.body;
    const student_id = req.student._id;
    const objectId = new mongoose.Types.ObjectId(loan_id);
    const alreadyRenew = await RenewRequest.findOne({ loan_id });
    if (alreadyRenew) {
      return res
        .status(404)
        .json({ success: false, message: "already renewed" });
    }
    const data = await RenewRequest.create({
      loan_id: objectId,
      student_id,
    });
    return res
      .status(200)
      .json({ success: true, data, message: "created renew" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getRenewRequestsStudent = async (req, res) => {
  try {
    const data = await RenewRequest.find({
      student_id: req.student._id,
    }).populate("loan_id");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const allRenewRequestStudent = async (req, res) => {
  try {
    const data = await RenewRequest.find();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const acceptRenewRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RenewRequest.findByIdAndUpdate(
      id,
      {
        $set: {
          remark: "accept",
        },
      },
      { new: true }
    );
    const loan_id = data.loan_id;
    const loan = await Loan.findById(loan_id);
    if (loan) {
      const previousReturnDate = new Date(loan.returnDate);
      const newReturnDate = new Date(previousReturnDate);
      newReturnDate.setDate(newReturnDate.getDate() + 15);
      const dateUpdate = await Loan.findByIdAndUpdate(
        loan_id,
        {
          $set: {
            returnDate: newReturnDate.toISOString(), // Convert back to ISO string
          },
        },
        { new: true }
      );
      return res.status(200).json({ success: true, dateUpdate });
    }
    return res
      .status(404)
      .json({ success: true, message: "no loan available" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const rejectRenewRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RenewRequest.findByIdAndUpdate(
      id,
      {
        $set: {
          remark: "reject",
        },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
