import requestBook from "../model/requestBook.js";

export const addRequestBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const student_id = req.student._id;
    const data = await requestBook.create({
      student_id,
      title,
      author,
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addedRequestBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await requestBook.findByIdAndUpdate(id, {
      $set: {
        remark: true,
      },
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteRequestBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await requestBook.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
