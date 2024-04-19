import { addLoan } from "../services/loan.service.js";
import Loan from "../model/loan.js";
import Student from "../model/student.js";

const addLoanController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const loan = req.body;
    if (!loan) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const student = await Student.findById(req.body.student_id);
    const data = await addLoan(loan);
    if (data) {
      student.book_list.push({ loan_id: data._id });
      await student.save();
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const submitController = async (req, res) => {
  try {
    const { loan_id } = req.body;
    const updateValue = await Loan.findByIdAndUpdate(
      loan_id,
      {
        $set: {
          remark: "Submitted",
        },
      },
      { new: true }
    );
    if (!updateValue) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }
    return res.status(201).json({ success: true, updatedLoan: updateValue });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const getAllLoanController = async (req, res) => {
  try {
    const loans = await Loan.find().populate("student_id");
    return res.status(200).json({ success: true, loans });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Loan.findById(id).populate("student_id");
    return res.status(200).json({ succes: true, data });
  } catch (err) {
    return res.status(500).json({ success: true, err: err.message });
  }
};
export {
  addLoanController,
  submitController,
  getAllLoanController,
  getLoanById,
};
