import { Expense } from "../../entities/Expense";
import { User } from "../../entities/User";
import { AppDataSource } from "./../../config/data-source";
import { Request, Response } from "express";

export const postExpenseRouterController = async (
  req: Request,
  res: Response
) => {
  const requestBody: {
    name: string;
    description: string;
    amount: number;
    user: { email: string; id: number };
  } = req.body;
  const expenseRepository = AppDataSource.getRepository(Expense);
  const userRepository = AppDataSource.getRepository(User);
  const currentUser = await userRepository.findOne({
    where: { id: requestBody.user.id },
  });
  const newExpense = new Expense();
  newExpense.name = requestBody.name;
  newExpense.description = requestBody.description;
  newExpense.amount = requestBody.amount;
  newExpense.timestamp = new Date();
  if (currentUser != null) {
    newExpense.owner = currentUser;
  } else {
    console.log("User not found on db. ");
    res.status(500).json({ errorMessage: "Internal server error" });
  }
  try {
    const sqlQuery = await expenseRepository.save(newExpense);
    console.log(sqlQuery);
    res.status(200).json({ message: "Expense saved sucessfully." });
  } catch (err) {
    console.log("Couldn't save expense to database.");
    console.dir(err, { depth: null });
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
