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
        console.log(preBook.books.length);
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
    console.log("search for student ID", id);
    const preBook = await PreBook.findOne({ student_id: id });
    return preBook;
  } catch (error) {
    return error;
  }
};

export const deletePreBookByStudentId = async (id, bookId) => {
  try {
    console.log(bookId);
    const preBook = await PreBook.findOne({ student_id: id });
    const books = preBook.books.findIndex((book) => {
      return String(book.book_id) === String(bookId);
    });
    console.log(books);
    preBook.books.splice(books, 1);
    await preBook.save();
    return preBook;
  } catch (error) {
    return error;
  }
};
