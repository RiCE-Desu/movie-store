import Transaction from "../models/transactionModel.js";

export const getUserTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Transaction.getByUserId(id);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
