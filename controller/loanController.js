import { addLoan } from "../services/loan.service.js";

const addLoanController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const loan = req.body;
    if (!loan) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const data = await addLoan(loan);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

export { addLoanController };
