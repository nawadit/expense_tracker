import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Expense } from "../../entities/Expense";

export const deleteExpenseController = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const expenseRepository = AppDataSource.getRepository(Expense);
  try {
    const deletedExpense = await expenseRepository.delete({
      id: requestBody.id,
    });
    if (!deletedExpense.affected) {
      console.log("No expense of id: " + requestBody.id);
      res.status(402).json({ errorMessage: "Bad request" });
      return;
    }
    res
      .status(200)
      .json({ message: "Entry deleted sucessfully." });
  } catch (err) {
    console.log("Error in deleting expense.");
    console.dir(err, { depth: null });
    res.status(500).json({ errorMessage: "Internal server error." });
  }
};
