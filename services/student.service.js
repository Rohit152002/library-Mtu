import Student from "../model/student.js";
import bcrypt from "bcryptjs";

const addStudent = async (body) => {
  const email = body.email;
  const userExists = await Student.findOne({ email });
  if (userExists) {
    throw new Error("Student already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  const data = new Student({
    fullName: body.fullName,
    registrationNo: body.registrationNo,
    email: body.email,
    branch: body.branch,
    password: hashedPassword,
  });
  await data.save();
  return data;
};

const getStudent = async () => {
  const data = await Student.find().populate("branch");
  return data;
};

const getStudentById = async (id) => {
  try {
    const data = await Student.findById(id)
      .populate({ path: "book_list.loan_id" })
      .populate({ path: "branch" });
    const filterData = data.book_list.filter((item) => {
      return item.loan_id?.remark === "Unsubmitted";
    });
    return [data, filterData];
  } catch (err) {
    return err;
  }
};

const updateStudentById = async (id, body) => {
  const data = await Student.findByIdAndUpdate(id, body);
  return data;
};

const deleteStudentById = async (id) => {
  const data = await Student.findByIdAndDelete(id);
  return data;
};

const loginVerification = async (email, password) => {
  const user = await Student.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

export {
  addStudent,
  getStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  loginVerification,
};
