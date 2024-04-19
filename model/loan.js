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
  book_title: {
    type: "string",
    required: true,
  },
  book_author: {
    type: "string",
    required: true,
  },
  loanDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: function () {
      const fifteenDaysLater = new Date(this.loanDate);
      fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 15);
      return fifteenDaysLater.toISOString();
    },
  },
  submitDate: {
    type: Date,
  },
  remark: {
    type: String,
    enum: ["Unsubmitted", "Submitted", "Due Fine"],
    default: "Unsubmitted",
  },
});

const Loan = new mongoose.model("Loans", loanSchema);

export default Loan;
