import requestBook from "../model/requestBook.js";
import Book from "../model/book.js";
import { allowedOrigins } from "../index.js";
export const addRequestBook = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { title, author, details } = req.body;
    console.log(title, author, details);
    const alreadyAdded = await Book.find({ title, author });
    if (alreadyAdded.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Book already added" });
    }
    const student_id = req.student._id;
    const data = await requestBook.create({
      student_id,
      title,
      author,
      details,
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addedRequestBook = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    // enum: ["Added", "Request"],
    const { id } = req.params;
    const data = await requestBook.findByIdAndUpdate(
      id,
      {
        $set: {
          remark: "Added",
        },
      },
      { new: true }
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteRequestBook = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const { id } = req.params;
    const data = await requestBook.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getRequestBook = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", allowedOrigins.join(", "));
    const data = await requestBook.find({});
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(error.code)
      .json({ success: false, message: error.message });
  }
};
