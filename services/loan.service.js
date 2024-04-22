import Loan from "../model/loan.js";

const addLoan = async (body) => {
  try {
    for (const loan of body.loans) {
      await Loan.create({
        book_id: loan.book_id,
        book_title: loan.book_title,
        book_author: loan.book_author,
        student_id: body.student_id,
        branch_id: body.branch_id,
        loanDate: body.loanDate,
      });
    }
    return data;
  } catch (err) {
    return err;
  }
};

export { addLoan };
