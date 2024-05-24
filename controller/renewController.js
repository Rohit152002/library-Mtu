import RenewRequest from "../model/renewRequest.js";
import Loan from "../model/loan.js";
import mongoose from "mongoose";
const allowedOrigins = [
  "https://librarymanagementweb.vercel.app",
  "http://localhost:5173",
];
export const AddRenewRequest = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { loan_id } = req.body;
    const student_id = req.student._id;
    const objectId = new mongoose.Types.ObjectId(loan_id);
    const loanData = await Loan.findById(objectId);
    if (!loanData) {
      return res
        .status(404)
        .json({ success: false, message: "loan not found" });
    }

    // const today = new Date();
    // const todayDateOnly = new Date(
    //   today.getFullYear(),
    //   today.getMonth(),
    //   today.getDate()
    // );

    // const submitDate = new Date(loanData.submitDate);
    // const submitDateOnly = new Date(
    //   submitDate.getFullYear(),
    //   submitDate.getMonth(),
    //   submitDate.getDate()
    // );

    // if (todayDateOnly.getTime() !== submitDateOnly.getTime()) {
    //   return res
    //     .status(400) // Status 400 is more appropriate for bad requests than 404
    //     .json({ success: false, message: "can renew only on submit date" });
    // }

    // Proceed with the renewal process here

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
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
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
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const data = await RenewRequest.find({ remark: "request" })
      .populate("loan_id")
      .populate("student_id");
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

export const acceptRenewRequest = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
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
      const previousReturnDate = new Date();
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
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
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
