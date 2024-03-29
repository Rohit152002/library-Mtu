const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  book_id: {
    type: "string",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  loanDate: {
    type: Date,
    default: Date.now(),
  },
  returnDate: {
    type: Date,
    default: function () {
      let returnDate = new Date(this.loanDate);
      returnDate.setDate(returnDate.getDate() + 15);
      return returnDate;
    },
  },
});

const loan = new mongoose.model("loan", loanSchema);

module.exports = loan;
