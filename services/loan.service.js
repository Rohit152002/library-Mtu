import Loan from "../model/loan.js";
import Student from "../model/student.js";
const addLoan = async (body) => {
  try {
    if (body.loans.length === 1) {
      const loan = body.loans[0]; // Assuming there's only one loan document in body.loans

      const data = await Loan.create({
        book_id: loan.book_id,
        book_title: loan.book_title,
        book_author: loan.book_author,
        student_id: body.student_id,
        branch_id: body.branch_id,
      });

      const student = await Student.findById(body.student_id);
      student.book_list.push({ loan_id: data._id });
      await student.save();
      return "created one doc";
    }
    for (const loan of body.loans) {
      const data = await Loan.create({
        book_id: loan.book_id,
        book_title: loan.book_title,
        book_author: loan.book_author,
        student_id: body.student_id,
        branch_id: body.branch_id,
      });
      const student = await Student.findById(body.student_id);
      student.book_list.push({ loan_id: data._id });
      await student.save();
    }
    return "created";
  } catch (err) {
    return err;
  }
};

export { addLoan };
