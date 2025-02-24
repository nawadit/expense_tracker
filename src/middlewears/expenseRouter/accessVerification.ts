import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Expense } from "../../entities/Expense";
import { User } from "../../entities/User";

export const accessVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestBody = req.body;
  const expenseRepository = AppDataSource.getRepository(Expense);
  const userRepository = AppDataSource.getRepository(User);
  const expenseFromDB = await expenseRepository.findOne({
    where: { id: requestBody.id },
    relations: ["owner"],
  });
  const userFromDB = await userRepository.findOne({
    where: {
      id: requestBody.user.id,
    },
  });
  if (expenseFromDB?.owner.id != userFromDB?.id) {
    console.log(
      "Tried to access someone else's expense entry using own's token."
    );
    console.log(
      `The token belongs to ${JSON.stringify(
        userFromDB
      )} and the expense being tried to update belongs to ${JSON.stringify(
        expenseFromDB
      )}`
    );
    res.status(402).json({ errorMessage: "Bad request." });
    return;
  } else {
    next();
  }
};
