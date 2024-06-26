import { addLoan } from "../services/loan.service.js";
import Loan from "../model/loan.js";
import Student from "../model/student.js";
import Book from "../model/book.js";
import mongoose from "mongoose";
const addLoanController = async (req, res) => {
  try {
    const loan = req.body;
    if (req.body.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const student = await Student.findById(req.body.student_id).populate({
      path: "book_list.loan_id",
    });

    const unsubmittedBooksCount = student?.book_list.reduce((count, book) => {
      if (book.loan_id.remark === "Unsubmitted") {
        return count + 1;
      }
      return count;
    }, 0);

    if (unsubmittedBooksCount >= 4) {
      return res.status(400).json({
        success: false,
        message: "4 books are already unsubmitted",
      });
    }
    for (const item of loan.loans) {
      const book = await Book.findOne({
        title: item.book_title,
        author: item.book_author,
      });
      if (book) {
        if (book.copiesAvailable > 0) {
          book.copiesAvailable = book.copiesAvailable - 1;
          await book.save();
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Book not available" });
      }
    }
    const data = await addLoan(loan, student);
    return res.status(200).json({ success: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, err: err.message });
  }
};

const submitController = async (req, res) => {
  try {
    const { loan_id } = req.body;
    const loanBooks = await Loan.findById(loan_id);

    const increment = await Book.findOne({
      title: loanBooks.book_title,
      author: loanBooks.book_author,
    });
    increment.copiesAvailable = increment.copiesAvailable + 1;
    await increment.save();
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
    const loans = await Loan.find()
      .populate("student_id")
      .sort({ loanDate: -1 });
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
    console.log("overdue");
    const overdueloans = await Loan.find({
      returnDate: {
        $lt: new Date(),
      },
      $or: [{ remark: "Unsubmitted" }, { remark: "Due Fine" }],
    });

    for (const loan of overdueloans) {
      const today = new Date();
      const returnDate = new Date(loan.returnDate);
      const diffTime = Math.abs(today - returnDate);
      const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const finePerDay = 10;
      const totalFine = overdueDays * finePerDay;
      await Loan.findByIdAndUpdate(loan._id, {
        $set: {
          remark: "Due Fine",
          fine: totalFine,
        },
      });
    }
    console.log(overdueloans);
    return res.status(200).json({ success: true, updated: "updated" });
  } catch (error) {
    console.log(error);
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

const renewLoanBooks = async (req, res) => {
  try {
    const loan_id = req.params.id;
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
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  addLoanController,
  submitController,
  getAllLoanController,
  getLoanById,
  searchLoanBooks,
  checkOverDueLoans,
  renewLoanBooks,
};
