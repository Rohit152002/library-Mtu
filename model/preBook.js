import mongoose from "mongoose";

const preBookSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  books: [
    {
      book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      pre_book: {
        type: Date,
        default: Date.now(),
      },
      till: {
        type: Date,
        default: function () {
          const twoDaysLater = new Date(this.pre_book);
          twoDaysLater.setDate(twoDaysLater.getDate() + 2);
          return twoDaysLater.toISOString();
        },
      },
      taken: {
        type: Date,
        default: null,
      },
      remark: {
        type: String,
        default: "Booked",
      },
    },
  ],
});

const PreBook = mongoose.model("pre_book", preBookSchema);

export default PreBook;
