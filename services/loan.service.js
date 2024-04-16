import Loan from "../model/loan.js";

const addLoan = async (body) => {
  try {
    const data = await Loan.create(body);
    return data;
  } catch (err) {
    return err;
  }
};

export { addLoan };
