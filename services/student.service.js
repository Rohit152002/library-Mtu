import student from "../model/student.js";
import bcrypt from "bcryptjs";

const addStudent = async (body) => {
  try {
    console.log("Student is ADDED");
    const email = body.email;
    const userExists = await student.findOne({ email });
    if (userExists) {
      throw new Error("Student already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const data = new student({
      fullName: body.fullName,
      registrationNo: body.registrationNo,
      email: body.email,
      branch: body.branch,
      password: hashedPassword,
    });
    await data.save();
    return data;
  } catch (err) {
    throw err;
  }
};

const getStudent = async () => {
  try {
    console.log("GET Student");
    const data = await student.find();
    return data;
  } catch (err) {
    throw err;
  }
};

const getStudentById = async (id) => {
  try {
    console.log("Get Student ID");
    const data = await student.findById(id);
    return data;
  } catch (err) {
    throw err;
  }
};

const updateStudentById = async (id, body) => {
  try {
    console.log("Update Student ID");
    const data = await student.findByIdAndUpdate(id, body);
    return data;
  } catch (err) {
    throw err;
  }
};

const deleteStudentById = async (id) => {
  try {
    console.log("Delete Student ID");
    const data = await student.findByIdAndDelete(id);
    return data;
  } catch (err) {
    throw err;
  }
};

const loginVerification = async (email, password) => {
  try {
    const user = await student.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export {
  addStudent,
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  loginVerification,
};
