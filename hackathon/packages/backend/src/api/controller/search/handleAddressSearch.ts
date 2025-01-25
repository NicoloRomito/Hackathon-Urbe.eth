import { Request, Response } from "express";
import repositoryManager from "../../../db/repository/repositoryManager"
// TODO creare un interfaccia che contenga le informazioni da displayare nella pagina di DISPLAY
//USER(user address, verified, veriefiedBy, listofNFTs) 
interface UserInfoDisplay{
    address: string
    verified: boolean
    verifiedBy: string
    listofNFTs: string[]
}



//COMPANY(user address, verified, NFTminted) 
interface CompanyInfoDisplay{
    isUser: boolean
    address: string
    verified: boolean
    name: string
    NFTminted: string[]
}

export default async function hanldeAddressSearch(req: Request, res: Response){
    let address : string
    let response;
    address = req.query.address as string;
    let companyInfo: CompanyInfoDisplay = await repositoryManager.getCompany(address);
   // res.setHeader("Access-Control-Allow-Origin", "*");
    if(companyInfo){
        response = {
            isUser: false,
            address: companyInfo.address,
            verified: companyInfo.verified,
            name: companyInfo.name,
            listofNFTs: companyInfo.NFTminted
        }
        res.status(200).json(response);
        return;
    }

    let userInfo: UserInfoDisplay = await repositoryManager.getUser(address);

    if(userInfo){
        response = {
            isUser: true,
            address: userInfo.address,
            verified: userInfo.verified,
            verifiedBy: userInfo.verifiedBy,
            listofNFTs: userInfo.listofNFTs
        }
        res.status(200).json(response);
        return;     
    }

    res.status(400).send("Cannot find address you were looking for!");
}