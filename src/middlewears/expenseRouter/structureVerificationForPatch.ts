import { NextFunction, Request, Response } from "express";

export const structureVerificationForPatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof req.body == "object" &&
    typeof req.body.id == "number" &&
    (typeof req.body.name == "string" ||
      typeof req.body.amount == "number" ||
      typeof req.body.description == "string")
  ) {
    next();
  } else {
    console.log("Bad request object structure.");
    console.dir(req.body, { depth: null });
  }
};
