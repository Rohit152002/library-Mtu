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
const addBookController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { files } = req;
    console.log(req.files);
    const { title, author, branch, publishDate } = req.body;
    console.log(req.body);
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
    const bookTitle = String(req.query.book_title || '');
    const authorName = String(req.query.author_name || '');

    // Log the regex patterns

    const books = await Book.find({
      title: {
        $regex: bookTitle,
        $options: 'i',
      },
      author: {
        $regex: authorName,
        $options: 'i',
      },
    });

    // Log the search results

    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, message: 'No book found' });
    }

    return res.status(200).json({ success: true, books });
  } catch (error) {
    console.error('Error during book search:', error);
    return res.status(500).json({ success: false, err: error.message });
  }
};

const getBookByIdController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const book = await getBookById(req.params.id);
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const updateBookByIdController = async (req, res) => {
  try {
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
