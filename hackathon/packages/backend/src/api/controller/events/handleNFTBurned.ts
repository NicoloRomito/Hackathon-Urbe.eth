import repositoryManager from "../../../db/repository/repositoryManager";

async function handleNFTBurned(event: any){
    const {addressburned, tokenId} = event.returnValues;
    console.log("NFT created event",addressburned, tokenId);

    //TODO : Add the NFT to the database
    let nft = await repositoryManager.getNFT(addressburned);
    
    repositoryManager.deleteNFT(nft.id);


}

export default handleNFTBurned