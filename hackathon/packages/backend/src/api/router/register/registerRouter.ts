import express, { Express, Request, Response } from "express";



let registerRouter = express.Router()

registerRouter.post("/", (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    res.send(`Register request received for user: ${username}`);
});


export default registerRouter;