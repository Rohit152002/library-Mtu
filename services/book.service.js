import Book from "../model/book.js";

const addBook = async (body) => {
  try {
    console.log("Book is ADDED");

    const data = await Book.create(body);
    return data;
  } catch (err) {
    return err;
  }
};

const getBook = async () => {
  try {
    const data = await Book.find().populate("branch");
    return data;
  } catch (err) {
    return err;
  }
};
const getBookById = async (id) => {
  try {
    const data = await Book.findById(id);
    return data;
  } catch (err) {
    throw err;
  }
};

const updateBookById = async (id, body) => {
  try {
    const data = await Book.findByIdAndUpdate(id, body);
    console.log("run update");
    return data;
  } catch (err) {
    throw err;
  }
};

const deleteBookById = async (id) => {
  try {
    const data = await Book.findByIdAndDelete(id);
    return data;
  } catch (err) {
    throw err;
  }
};
export { addBook, getBook, getBookById, updateBookById, deleteBookById };
