import express, { Express, Request, Response } from "express";


const loginRouter = express.Router();


loginRouter.get("/users", (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send(`Login request received for user: ${username}`);
});

loginRouter.get("/companies", (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send(`Login request received for user: ${username}`);
});


export default loginRouter;