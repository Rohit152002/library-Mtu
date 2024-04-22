import { addLoan } from "../services/loan.service.js";
import Loan from "../model/loan.js";
import Student from "../model/student.js";
import Book from "../model/book.js";
import mongoose from "mongoose";

const addLoanController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const loan = req.body;
    if (!loan) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const { book_title, book_author } = req.body;
    const student = await Student.findById(req.body.student_id);
    const book = await Book.findOne({ title: book_title, author: book_author });
    if (book) {
      if (book.copiesAvailable > 0) {
        book.copiesAvailable = book.copiesAvailable - 1;
        await book.save();
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Book not available" });
      }
    }
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
          submitDate: new Date().toISOString(),
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
const checkOverDueLoans = async (req, res) => {
  try {
    const overdueloans = await Loan.find({
      returnDate: {
        $lt: new Date(),
      },
      remark: "Unsubmitted",
    });

    for (const loan of overdueloans) {
      await Loan.findByIdAndUpdate(loan._id, {
        $set: {
          remark: "Due Fine",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const searchLoanBooks = async (req, res) => {
  try {
    const branch = req.params.id;
    const book = await Loan.find({
      branch_id: new mongoose.Types.ObjectId(branch),
    });
    if (book.length > 0) {
      return res.status(200).json({ success: true, book });
    }
    return res.status(404).json({ success: false, message: "Book not found" });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
export {
  addLoanController,
  submitController,
  getAllLoanController,
  getLoanById,
  searchLoanBooks,
  checkOverDueLoans,
};
