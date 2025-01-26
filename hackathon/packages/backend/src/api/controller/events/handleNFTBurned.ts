import repositoryManager from "../../../db/repository/repositoryManager";

async function handleNFTBurned(event: any){
    const {addressburned, tokenId} = event.returnValues;
    console.log("NFT created event",addressburned, tokenId);

    let nft = await repositoryManager.getNFT(addressburned);
    
    if(nft.id == null){
        console.log("NFT not found in the database");
        return;
    }
    
    repositoryManager.deleteNFT(nft.id);


}

export default handleNFTBurned