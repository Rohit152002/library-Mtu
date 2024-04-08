import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter a titles"],
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
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

const book = mongoose.model("Book", bookSchema);

export default book;
