import {
  addBook,
  getBook,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../services/book.service.js";
import Book from "../model/book.js";
import { uploadFile } from "../router/upload.routes.js";
import mongoose from "mongoose";
const allowedOrigins = [
  "https://librarymanagementweb.vercel.app",
  "http://localhost:5173",
];
const addBookController = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    res.setHeader("Content-Type", "application/json");
    console.log(req.body);
    const { files } = req;
    console.log(files);
    const { title, author, branch, publishDate } = req.body;
    if (!(title && author && branch && publishDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const bookExist = await Book.findOne({ title, author });
    if (bookExist) {
      return res
        .status(400)
        .json({ success: false, message: "Book already exist" });
    }
    const fileName = await uploadFile(files[0]);
    const book = await Book.create({
      title,
      author,
      branch,
      publishDate,
      copiesOwned: req.body.copiesOwned,
      image_url: fileName,
    });
    return res.status(201).json({ success: true, created: book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
const getBookController = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    const { skip, limit } = req.query;
    const limitCount = +limit || 0;
    const skipCount = +skip || 0;
    const book = await getBook(limitCount, skipCount);
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
const getBookByBranchId = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    const branch = req.params.id;
    const book = await Book.find({
      branch: new mongoose.Types.ObjectId(branch),
    });
    return res.status(200).json({ success: true, book });
  } catch (error) {
    return res.status(500).json({ success: false, err: error.message });
  }
};
const searchBook = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    const books = await Book.find({
      title: {
        $regex: req.query.book_title,
        $options: "i",
      },
      author: {
        $regex: req.query.author_name,
        $options: "i",
      },
    });
    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: "No book found" });
    }
    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
const getBookByIdController = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    res.setHeader("Content-Type", "application/json");
    const book = await getBookById(req.params.id);
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const updateBookByIdController = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    res.setHeader("Content-Type", "application/json");
    const { title, branch, publishDate } = req.body;
    if (!(title && branch && publishDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const book = await updateBookById(req.params.id, req.body);
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const deleteBookByIdController = async (req, res) => {
  try {
    // res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
    res.setHeader("Content-Type", "application/json");
    const book = await deleteBookById(req.params.id);
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

export {
  addBookController,
  getBookController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
  searchBook,
  getBookByBranchId,
};
