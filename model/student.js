import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Teacher", "Student"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  book_list: [
    {
      loan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loans",
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
