import { Request, Response } from "express";
import repositoryManager from "../../../db/repository/repositoryManager"
import CompanyInfo from "../../../models/companyInfo";
// import masterContract from "../../../models/contracts/masterContract";

export default function handleCompanyRegister(req: Request, res: Response) {
    try {
    let companyInfo: CompanyInfo = req.body;

    console.log(companyInfo);
    if(!repositoryManager.isCompanyRegistred(companyInfo))
    {
        res.status(400).send("Company is already registred");
        return;
    }
        
    companyInfo.createdAt = new Date();
    companyInfo.updatedAt = new Date();

    if(repositoryManager.areCompanyDataValid(companyInfo)){
        res.status(400).send("There is some duplicate data, request not valid");
        return;
    }

    repositoryManager.setCompany(companyInfo);

    // TODO: i need to inform the smart contract the it needs to update the mapping of the  
    //const txhash = masterContract.methods.setMinter(companyInfo.address, true).send({from: companyInfo.address});
    res.status(200).send("OK");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
    
}