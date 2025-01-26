import repositoryManager from "../../../db/repository/repositoryManager";



async function handleNFTCreated(event: any){
    const { minter, receiver, addressNFT,  tokenIdUint256} = event.returnValues;
    console.log("NFT created event", minter, receiver, addressNFT, tokenIdUint256);

    let user = await repositoryManager.getUser(receiver);
    let company = await repositoryManager.getCompany(minter);
    let nft;
    //TODO: atm if somebodymints an NFT and he is not in the company table, the company id will be null and crash the app
    try{
    const tokenId = Number(tokenIdUint256);
    if(user){
        console.log("Assigning NFT to user");
        let companyTMP = await repositoryManager.getCompany(minter)
        if((companyTMP) && (nft = await repositoryManager.setNFT(addressNFT, new Date(), user.id, company.id, "NFT", tokenId))){
            console.log("ERROR: NFT already assigned to user");
            return;
        }
        if(nft && nft.id){
            await repositoryManager.assignNFTToUser(addressNFT, receiver, nft.id);
        }
        }else{
        const newUser = {
            address: receiver,
            name: "",
            lastName: "",
            verified: false,
            verifiedBy: "",
            email: "",
            codiceFiscale: "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log("Creating new user", newUser);
        await repositoryManager.setUser(newUser);
    }
    if(company){
        console.log("Assigning NFT to company");
        let userTMP = await repositoryManager.getUser(receiver)
        if(userTMP && (nft = await repositoryManager.setNFT(addressNFT, new Date(), user.id, company.id, "NFT", tokenId))){
            console.log("User not registered");
            return;
        }
        await repositoryManager.assignNFTToCompany(addressNFT, minter, nft.id);
    } else {
        const newCompany = {
            address: minter,
            name: "",
            verified: false,
            pIva: "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log("Creating new company", newCompany);
            if(!await repositoryManager.getCompany(minter)){
            await repositoryManager.setCompany(newCompany);
        }
    }
}catch(e){
    console.log("Error", e);
}
    //TODO check if i need to call the setter function from nft to user and company tables
}


export default handleNFTCreated