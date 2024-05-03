import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  remark: {
    type: boolean,
    default: false,
  },
});

export default new mongoose.model("Request", requestSchema);
