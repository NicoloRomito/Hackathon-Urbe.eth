import { Request, Response } from "express";
import repositoryManager from "../../../db/repository/repositoryManager"
import manager from "../../../db/web3Client";

export default async function handleMint(req: Request, res: Response){
    let minterReciver : {addressMinter: string, addressReciver: string, isCertificate: boolean} = req.body;


    if(!repositoryManager.getCompany(minterReciver.addressMinter)){
        res.status(400).send("Minter is not registred");
        return;
    }
    if(!repositoryManager.getUser(minterReciver.addressReciver)){
        res.status(400).send("Reciver is not registred");
        return;
    }

    if(!minterReciver.isCertificate){
        manager.methods.mintWorkExperience(minterReciver.addressMinter, minterReciver.addressReciver).send({from: minterReciver.addressMinter})
        res.status(200).send("Minted");
        return; 
    }else{
        manager.methods.mintDegree(minterReciver.addressMinter, minterReciver.addressReciver).send({from: minterReciver.addressMinter})
        res.status(200).send("Minted");
        return; 
    }
}