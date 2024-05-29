import Loan from "../model/loan.js";
const addLoan = async (body, student) => {
  try {
    const todayDate = new Date();
    const returnDate = new Date(todayDate);
    let dateAdded;
    if (student.role === "Student") {
      dateAdded = 15;
    } else {
      dateAdded = 30;
    }
    returnDate.setDate(returnDate.getDate() + dateAdded);
    if (body.loans.length === 1) {
      const loan = body.loans[0]; // Assuming there's only one loan document in body.loans

      const data = await Loan.create({
        book_id: loan.book_id,
        book_title: loan.book_title,
        book_author: loan.book_author,
        student_id: body.student_id,
        branch_id: body.branch_id,
        returnDate: returnDate.toISOString(), // Convert back to ISO string
      });

      // // const student = await Student.findById(body.student_id);
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
        returnDate: returnDate.toISOString(), // Convert back to ISO string
      });
      // const student = await Student.findById(body.student_id);
      student.book_list.push({ loan_id: data._id });
      await student.save();
    }
    return "created";
  } catch (err) {
    return err;
  }
};

export { addLoan };
