import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Expense } from "../../entities/Expense";

export const getExpenseController = async (req: Request, res: Response) => {
  const requestBody: {
    user: {
      id: number;
      email: string;
    };
    noOfEntries: number | null;
    offset: number | null;
  } = req.body;

  const expenseRepository = AppDataSource.getRepository(Expense);

  try {
    const expenses = await expenseRepository
      .createQueryBuilder("expense")
      .orderBy("expense.timestamp", "DESC") // Order by timestamp in descending order
      .skip(requestBody.offset || 0) // Skip the first `offset` entries
      .take(requestBody.noOfEntries || 9999999) // Limit to `noOfEntries` results
      .getMany();
    res.status(200).json(expenses);
  } catch (err) {
    console.dir(err, { depth: null });
    res.status(500).json({ errorMessage: "Internal server error." });
  }
};
