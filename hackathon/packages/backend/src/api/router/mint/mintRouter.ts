import express, { Request, Response } from "express";
import handleMint from "../../controller/mint/handleMintNFT";

let mintRouter = express.Router()

mintRouter.post("/nft", handleMint);


export default mintRouter;