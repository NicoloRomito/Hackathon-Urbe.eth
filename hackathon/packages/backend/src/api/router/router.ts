import express, { Express, Request, Response } from "express";
import registerRouter from "./register/registerRouter";
import searchRouter from "./search/searchRouter";
import dotenv from "dotenv";



dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3002;


app.use(express.json());


app.use("/register", registerRouter);
app.use("/search", searchRouter);
//app.use("/spid", spidRouter);



export default app;
