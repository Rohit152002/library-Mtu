import {
  addPreBook,
  getPreBookByStudentId,
  deletePreBookByStudentId,
} from "../services/pre_book.service.js";
import mongoose from "mongoose";
import { ObjectId } from "bson";
export const addPreBookController = async (req, res) => {
  try {
    const { bookId, studentId } = req.body;
    const book = new mongoose.Types.ObjectId(bookId);
    const student = new mongoose.Types.ObjectId(studentId);

    if (!book || !student) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const data = await addPreBook(book, student);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPreBookByStudentIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = new ObjectId(id);
    const data = await getPreBookByStudentId(studentId);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "failed", error: error.message });
  }
};

export const getPreBookforStudentController = async (req, res) => {
  try {
    const data = await getPreBookByStudentId(req.student._id);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(404).json({ message: "failed", error: error.message });
  }
};

export const deletePreBookController = async (req, res) => {
  try {
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
    const { id } = req.params;
    const bookId = new mongoose.Types.ObjectId(id);
  } catch (error) {
    return res.status(500).json({ message: "failed", error: error.message });
  }
};
