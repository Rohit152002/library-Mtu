const loan = require("../model/loan");

const addLoan = async (body) => {
  try {
    const data = await loan.create(body);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = { addLoan };
