import {
  addStudent,
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  loginVerification,
} from "../services/student.service.js";
import Otp from "../model/otp.js";
import Student from "../model/student.js";
import createToken from "../utils/createToken.js";
import { sendEmail } from "../utils/mail.js";
const allowedOrigins = [
  "https://librarymanagementweb.vercel.app",
  // "http://localhost:5173",
];
const addStudentController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { fullName, registrationNo, email, password, branch } = req.body;
    if (!(fullName && registrationNo && email && password && branch)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const student = await addStudent(req.body);
    createToken(res, student._id);
    await sendEmail(student.email);
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const verifyStudentController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const [data] = await getStudentById(req.student._id);
    const email = data.email;
    const { otp } = req.body;
    const verified = await Otp.findOne({ otp: otp, email: email });
    if (verified) {
      data.verify = true;
      await data.save();
      await Otp.deleteOne({ email: email });
      return res.status(200).json({ success: verified });
    }
    await deleteStudentById(req.student._id);
    return res
      .status(400)
      .json({ success: false, message: "OTP Not Verified" });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const loginStudentController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { email, password } = req.body;
    console.log(email, password);
    const student = await loginVerification(email, password);
    createToken(res, student._id);
    return res.status(200).json({ success: true, err: student });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const searchByRegistration = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { registrationNo } = req.query;
    const student = await Student.findOne({ registrationNo });
    const [data, filterData] = await getStudentById(student._id);
    return res
      .status(200)
      .json({ success: true, student: data, unsubmitted: filterData });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const [data, filterData] = await getStudentById(req.student._id);
    return res
      .status(200)
      .json({ success: true, student: data, unsubmitted: filterData });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getStudentController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    res.setHeader("Content-Type", "application/json");
    const student = await getStudent();
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const updateStudentController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const { fullName, registrationNo, semester, branch } = req.body;
    if (!(fullName && registrationNo && semester && branch)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const student = await updateStudentById(id, req.body);
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const getStudentByIdController = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const [data, filterData] = await getStudentById(id);
    return res
      .status(200)
      .json({ success: true, student: data, unsubmitted: filterData });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const logoutCurrentUser = async (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  loginStudentController,
  getCurrentUserProfile,
  searchByRegistration,
  deleteStudentById,
  logoutCurrentUser,
};
