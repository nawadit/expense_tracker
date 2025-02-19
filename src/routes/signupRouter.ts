import express from "express";
import { requestBodyStructureVerification as bodyStructureVerification} from "../middlewears/signupRouter/requestBodyStructureVerification";

export const signupRouter = express.Router();

signupRouter.post("/", bodyStructureVerification, (req, res)=>{
    //get a controller
    res.send("working on a controller")
})