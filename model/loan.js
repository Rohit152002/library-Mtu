import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  book_id: {
    type: String,
    required: true,
  },
  book_title: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  loanDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
  submitDate: {
    type: Date,
    default: null,
  },
  remark: {
    type: String,
    enum: ["Unsubmitted", "Submitted", "Due Fine"],
    default: "Unsubmitted",
  },
  fine: {
    type: Number,
    default: 0,
  },
});

const Loan = new mongoose.model("Loans", loanSchema);

export default Loan;
