import express, { Express, Request, Response } from "express";

const searchRouter = express.Router();

searchRouter.get("/", (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    res.send(`Register request received for user: ${username}`);
})

searchRouter.get("/minted", (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    res.send(`Register request received for user: ${username}`);
})

searchRouter.get("/created", (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    res.send(`Register request received for user: ${username}`);
})


searchRouter.get("/minted", (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    res.send(`Register request received for user: ${username}`);
})

export default searchRouter