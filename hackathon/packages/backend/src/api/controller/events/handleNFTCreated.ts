import repositoryManager from "../../../db/repository/repositoryManager";



async function handleNFTCreated(event: any){
    const { minter, receiver, addressNFT,  tokenId} = event.returnValues;
    console.log("NFT created event", minter, receiver, addressNFT, tokenId);

    let user = await repositoryManager.getUser(receiver);


    let company = await repositoryManager.getCompany(minter);
    //TODO: atm if somebodymints an NFT and he is not in the company table, the company id will be null and crash the app
    repositoryManager.setNFT(addressNFT, new Date(), user.id , company.id, "NFT Funny Title: " + user.id, tokenId);
    //TODO check if i need to call the setter function from nft to user and company tables
}


export default handleNFTCreated