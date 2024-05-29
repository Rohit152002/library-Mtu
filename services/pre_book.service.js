import PreBook from "../model/preBook.js";

export const addPreBook = async (book, student) => {
  try {
    let preBook = await PreBook.findOne({ student_id: student });
    if (!preBook) {
      preBook = new PreBook({
        student_id: student,
        books: [{ book_id: book }],
      });
    } else {
      if (preBook.books.length >= 4) {
        throw new Error("Pre Book Limit exceeded");
      }
      preBook.books.push({ book_id: book });
    }
    await preBook.save();
    return preBook;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getPreBookByStudentId = async (id) => {
  try {
    const preBook = await PreBook.findOne({ student_id: id });
    return preBook;
  } catch (error) {
    return error;
  }
};

export const deletePreBookByStudentId = async (id, bookId) => {
  try {
    const preBook = await PreBook.findOne({ student_id: id });
    const books = preBook.books.findIndex((book) => {
      return String(book.book_id) === String(bookId);
    });
    preBook.books.splice(books, 1);
    await preBook.save();
    return preBook;
  } catch (error) {
    return error;
  }
};
