import express from "express";
import { requestBodyStructureVerification as bodyStructureVerification } from "../middlewears/signupRouter/requestBodyStructureVerification";
import { signupRouterController } from "../controllers/signupRouterController";

export const signupRouter = express.Router();

signupRouter.post("/", bodyStructureVerification, (req, res) => {
    console.log("Request was here")
  signupRouterController(req, res);
});
