import { SaveOptions } from './../../node_modules/typeorm/browser/repository/SaveOptions.d';
import { signupRouterBody } from "../interfaces/routes/signupRouterBody.interface";
import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { AppDataSource } from '../config/data-source';
import { log } from 'console';

export const signupRouterController = async (req: Request, res: Response) => {
  // Check if BCRYPT_SALTROUNDS is defined
  if (!process.env.BCRYPT_SALTROUNDS) {
    console.error("Unable to load process.env.BCRYPT_SALTROUNDS");
    return res.status(500).json({ errorMessage: "Internal server error." });
  }

  // Convert saltRounds to a number and validate
  const saltRounds = Number(process.env.BCRYPT_SALTROUNDS);
  if (isNaN(saltRounds)) {
    console.error("BCRYPT_SALTROUNDS is not a valid number.");
    return res.status(500).json({ errorMessage: "Internal server error." });
  }

  // Extract request body
  const reqBody: signupRouterBody = req.body;

  let hash: string;
  try {
    hash = await bcrypt.hash(reqBody.password, saltRounds);
  } catch (err) {
    console.error("Error hashing password:", err);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }


  // Create new user
  const userRepository = AppDataSource.getRepository(User);
  const newUser = new User();
  newUser.first_name = reqBody.first_name;
  newUser.last_name = reqBody.last_name;
  newUser.email = reqBody.email;
  newUser.hash = hash;

  //Try to save the new user to the database
  try {
    await userRepository.save(newUser)
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error saving user:", err);
    return res.status(500).json({ errorMessage: "Failed to create user" });
  }
};
