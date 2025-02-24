import { NextFunction, Request, Response } from "express";

export const requestBodyStructureVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof req.body == "object" &&
    typeof req.body.name == "string" &&
    typeof req.body.description == "string" &&
    typeof req.body.amount == "number"
  ) {
    next();
  }else{
    console.dir(req.body , {depth:null})
    res.status(401).json({errorMessage:"Bad request object."})
  }
};
