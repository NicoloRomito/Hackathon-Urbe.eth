import prisma from "../../../db/prismaClient";


// NFTCreated(minter, receiver, NFT, tokenId)

function handleNFTCreated(data: any){
    const { minter, receiver, NFT,  tokenId} = data.returnValues;
    console.log("minter:", minter, "receiver:", receiver, "NFT addr", NFT, "tokenID:", tokenId);
}


export default handleNFTCreated