import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (SECRET_KEY != undefined) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.body.user = decoded;
        next();
    } catch (err) {
      console.log("Couldn't decode jwt" + "error: "+ JSON.stringify(err) +"token: " + token);
      res.status(500).json({
        errorMessage: "Internal server error.",
      });
      return;
    }
  }
};
