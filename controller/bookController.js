import {
  addBook,
  getBook,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../services/book.service.js";

const addBookController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { title, branch, publishDate } = req.body;
    if (!(title && branch && publishDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const book = await addBook(req.body);
    return res.status(201).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
const getBookController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const book = await getBook();
    return res.status(200).json({ success: true, book });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
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
};
