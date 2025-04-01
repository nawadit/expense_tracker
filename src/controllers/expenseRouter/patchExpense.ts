import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Expense } from "../../entities/Expense";
import { User } from "../../entities/User";

export const pathExpenseController = async (req: Request, res: Response) => {
  const requestBody: {
    id: number;
    user: { email: string; id: number };
    name: string | null;
    amount: number | null;
    description: string | null;
  } = req.body;
  const expenseRepository = AppDataSource.getRepository(Expense);
  const expenseFromDB = await expenseRepository.findOne({
    where: { id: requestBody.id },
    // relations: ["owner"],
  });
  if (expenseFromDB) {
    (expenseFromDB.name = requestBody.name ?? expenseFromDB.name),
      (expenseFromDB.amount = requestBody.amount ?? expenseFromDB.amount),
      (expenseFromDB.description =
        requestBody.description ?? expenseFromDB.description);

    try {
      await expenseRepository.update({ id: expenseFromDB.id }, expenseFromDB);
      res.status(200).json({ message: "Expense updated sucessfully." });
    } catch (err) {
      console.log("Error saving updated expense to database.");
      console.dir(err, { depth: null });
      res.status(500).json({ errorMessage: "Internal server error. " });
    }
  } else {
    console.log("No expense entry of given id found in database.");
    console.dir(req.body, { depth: null });
    res.status(402).json({ errorMessage: "Expense not found." });
  }
};
