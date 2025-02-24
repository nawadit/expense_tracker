import express, { Request, Response } from "express";
import { verifyJWT } from "../middlewears/shared/verifyJWT";
import { requestBodyStructureVerification as structureVerificationForGet } from "../middlewears/expenseRouter/requestBodyStructureVerification";
import { postExpenseRouterController } from "../controllers/expenseRouter/postExpense";
import { structureVerificationForPatch } from "../middlewears/expenseRouter/structureVerificationForPatch";
import { pathExpenseController } from "../controllers/expenseRouter/patchExpense";
import { structureVerificationForDelete } from "../middlewears/expenseRouter/structureVerificationForDelete";
import { accessVerification } from "../middlewears/expenseRouter/accessVerification";
import { deleteExpenseController } from "../controllers/expenseRouter/deleteExpense";
import { getExpenseController } from "../controllers/expenseRouter/getExpense";

export const expenseRouter = express.Router();

expenseRouter.post("/",verifyJWT, structureVerificationForGet, postExpenseRouterController)
expenseRouter.patch("/",verifyJWT,  structureVerificationForPatch,accessVerification, pathExpenseController)
expenseRouter.delete("/", verifyJWT, structureVerificationForDelete,deleteExpenseController )
expenseRouter.get("/", verifyJWT,getExpenseController )