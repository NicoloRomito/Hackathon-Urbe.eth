import express, { Request, Response } from "express";
import handleCompanyRegister from "../../controller/register/handleCompanyRegister";
import handleUserRegister from "../../controller/register/handleUserRegister";
import { createRequire } from "module";

let registerRouter = express.Router()

registerRouter.post("/user", handleUserRegister);

registerRouter.post("/company", handleCompanyRegister);

export default registerRouter;