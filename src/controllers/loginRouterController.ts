import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { loginRouterBody } from "../interfaces/routes/loginRouterBody.interface";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export const loginRouterController = async (req: Request, res: Response) => {

  const reqBody: loginRouterBody = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const jwtSecretKey = process.env.JWT_KEY;

  if (!jwtSecretKey) {

    res
      .status(500)
      .json({ errorMessage: "Internal server error: Missing JWT_SECRET." });
    return;
  }

  try {
    const user = await userRepository.findOneBy({ email: reqBody.email });

    if (user == null) {

      res.status(401).json({ errorMessage: "User doesn't exist." });
      return;
    } else if (jwtSecretKey) {

      const isPasswordValid = bcrypt.compareSync(reqBody.password, user.hash);
      if (!isPasswordValid) {

        res.status(401).json({ errorMessage: "Incorrect password." });
        return;
      }

      const token = jwt.sign({ email: user.email, id: user.id }, jwtSecretKey, {
        expiresIn: "7d",
      });

      res.status(200).json({ token });
      return;
    }
  } catch (err) {
    console.error("Error getting user from database:", err);
    res.status(500).json({ errorMessage: "Internal server error." });
    return;
  }
};
