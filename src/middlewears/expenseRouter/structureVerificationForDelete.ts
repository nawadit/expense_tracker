import { NextFunction, Request, Response } from "express";

export const structureVerificationForDelete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.body == "object" && typeof req.body.id == "number") {
    next();
  }else{
    res.status(401).json({errorMessage:"Invalid request body"})
  }
};
