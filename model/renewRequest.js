import mongoose from "mongoose";

const renewRequestSchema = new mongoose.Schema({
  loan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loans",
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  renew_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  remark: {
    type: String,
    required: true,
    enum: ["request", "accept", "reject"],
    default: "request",
  },
});

const RenewRequest = mongoose.model("RenewRequest", renewRequestSchema);
export default RenewRequest;
