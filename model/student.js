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
    ref: "Branches",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
