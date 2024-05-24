import {
  addPreBook,
  getPreBookByStudentId,
  deletePreBookByStudentId,
} from "../services/pre_book.service.js";
import PreBook from "../model/preBook.js";
import mongoose from "mongoose";
const allowedOrigins = [
  "https://librarymanagementweb.vercel.app",
  "http://localhost:5173",
];
export const addPreBookController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { bookId } = req.body;
    const book = new mongoose.Types.ObjectId(bookId);
    // const student = new mongoose.Types.ObjectId(req.student_id);

    if (!book) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const data = await addPreBook(book, req.student._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPreBookByStudentIdController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const studentId = new mongoose.Types.ObjectId(id);
    console.log(studentId);
    const data = await getPreBookByStudentId(studentId);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "failed", error: error.message });
  }
};

export const getPreBookforStudentController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    console.log(req.student);
    const data = await getPreBookByStudentId(req.student._id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "failed", error: error.message });
  }
};

export const deletePreBookController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const bookId = new mongoose.Types.ObjectId(id);
    const data = await deletePreBookByStudentId(req.student._id, bookId);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "failed", error: error.message });
  }
};

export const takenPrebookController = async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    console.log(req.student._id);
    const bookId = new mongoose.Types.ObjectId(id);
    const result = await PreBook.updateOne(
      {
        student_id: req.student._id,
        "books._id": bookId,
      },
      { $set: { "books.$.remark": "Taken" } },
      { replace: true }
    );

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "failed", error: error.message });
  }
};
