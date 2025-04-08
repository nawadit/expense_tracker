import { Request, Response, Router } from "express";

import { requestBodyStructureVerification } from "../middlewears/loginRouter/requestBodyStructureVerification";
import { loginRouterController } from "../controllers/loginRouterController";

export const loginRouter = Router();

loginRouter.post("/", requestBodyStructureVerification, loginRouterController);
