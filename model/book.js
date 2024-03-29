const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter a titles"],
  },
  branch: {
    type: String,
  },
  publishDate: {
    type: String,
  },
  copiesOwned: {
    type: Number,
    default: 0,
  },
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;
