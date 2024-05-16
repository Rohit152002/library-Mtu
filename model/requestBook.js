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
  details: {
    type: String,
  },
  dateOfRequest: {
    type: Date,
    default: Date.now,
  },
  remark: {
    type: String,
    enum: ["Added", "Request"],
    default: "Request",
  },
});

export default new mongoose.model("Request", requestSchema);
