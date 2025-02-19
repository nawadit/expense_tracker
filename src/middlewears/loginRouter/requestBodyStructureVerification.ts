import { log } from "console";
import { NextFunction, Request, Response } from "express";

export const requestBodyStructureVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof req.body == "object" &&
    typeof req.body.email == "string" &&
    typeof req.body.password == "string"
  ) {
    
    next();
  } else {
    log("Unexpected request body. req.body " + JSON.stringify(req.body));
    res.status(402).json({ errorMessage: "Bad request" });
    return;
  }
};
