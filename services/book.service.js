const book = require("../model/book");

const addBook = async (body) => {
  try {
    console.log("Book is ADDED");
    const data = await book.create(body);
    return data;
  } catch (err) {
    throw err;
  }
};

const getBook = async () => {
  try {
    const data = await book.find();
    return data;
  } catch (err) {
    throw err;
  }
};
const getBookById = async (id) => {
  try {
    const data = await book.findById(id);
    return data;
  } catch (err) {
    throw err;
  }
};

const updateBookById = async (id, body) => {
  try {
    const data = await book.findByIdAndUpdate(id, body);
    console.log("run update");
    return data;
  } catch (err) {
    throw err;
  }
};

const deleteBookById = async (id) => {
  try {
    const data = await book.findByIdAndDelete(id);
    return data;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  addBook,
  getBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
