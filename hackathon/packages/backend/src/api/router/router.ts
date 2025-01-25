import express, { Express, Request, Response } from "express";
import loginRouter from "./login/loginRouter";
import registerRouter from "./register/registerRouter";
import searchRouter from "./search/searchRouter";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3001;


app.use(express.json());


app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/search", searchRouter);

export default app;
