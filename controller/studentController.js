const {
  addStudent,
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../services/student.service");
const createToken = require("../utils/createToken.js");
const { sendEmail, otp } = require("../utils/mail.js");
const addStudentController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { fullName, registrationNo, email, password } = req.body;
    if (!(fullName && registrationNo && email && password)) {
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
    // console.log(otp, typeof otp);
    // return res.send("helo");
    if (req.body.otp === otp) {
      return res.status(200).json({ success: true, message: "OTP Verified" });
    } else {
      await deleteStudentById(req.student._id);
      return res
        .status(400)
        .json({ success: false, message: "OTP Not Verified" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
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

module.exports = {
  addStudentController,
  getStudentController,
  getStudentByIdController,
  updateStudentController,
  verifyStudentController,
  getCurrentUserProfile,
};
