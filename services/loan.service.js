import loan from "../model/loan.js";

const addLoan = async (body) => {
  try {
    const data = await loan.create(body);
    return data;
  } catch (err) {
    throw err;
  }
};

export { addLoan };
