import { NextFunction, Request, Response } from "express";

export const requestBodyStructureVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    typeof req.body == "object" &&
    typeof req.body.first_name == "string" &&
    typeof req.body.last_name == "string" &&
    typeof req.body.email == "string" &&
    typeof req.body.password == "string"
  ){
    next();
  }else{
    console.log(`req.body isn't the expected structure. req.body: ${JSON.stringify(req.body)}`)
    res.status(400).json({errorMessage:"Bad request"})
  }
};
