import { Request, Response } from "express";
import repositoryManager from "../../../db/repository/repositoryManager"
import UserInfo from "../../../models/userInfo";

// TODO: ricordarsi di hardcodare verifiedBy con "SPID" o backend o frontend 

export default function handleUserRegister(req: Request, res: Response) {

    try {
        console.log(req.body);
        let userInfo: UserInfo = req.body;

        console.log(userInfo);

        if(!repositoryManager.isUserRegistred(userInfo)){
            res.status(400).send("User is already registred");
            return;
        }
            
        userInfo.createdAt = new Date();
        userInfo.updatedAt = new Date();
    
        repositoryManager.setUser(userInfo);
    
         // TODO: i need to inform the smart contract the it needs to update the mapping of the USER  
    
        res.status(200).send("OK");
        return;     
    } catch (error) {
        res.status(500).send("Internal Server Error");
        return; 
    }
    
}