import {
  addStudent,
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  loginVerification,
} from "../services/student.service.js";
import mongoose from "mongoose";
import Otp from "../model/otp.js";
import Student from "../model/student.js";
import createToken from "../utils/createToken.js";
import { sendEmail, otp } from "../utils/mail.js";
const addStudentController = async (req, res) => {
  try {
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
    const student = await getStudentById(req.student._id);
    const email = student.email;
    const { otp } = req.body;

    const verified = await Otp.findOne({ otp: otp, email: email });
    if (verified) {
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
    const { email, password } = req.body;
    const student = await loginVerification(email, password);
    createToken(res, student._id);
    return res.status(200).json({ success: student });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
    console.log(req.student);
    const data = await getStudentById(req.student._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getStudentController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const student = await getStudent();
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const updateStudentController = async (req, res) => {
  try {
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
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const student = await getStudentById(id);
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

export {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  loginStudentController,
  getCurrentUserProfile,
};
