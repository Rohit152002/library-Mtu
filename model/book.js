import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter a titles"],
  },
  author: {
    type: String,
    required: [true, "Enter an author"],
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  publishDate: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  copiesOwned: {
    type: Number,
    default: 0,
  },
  copiesAvailable: {
    type: Number,
    default: function () {
      return this.copiesOwned;
    },
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
