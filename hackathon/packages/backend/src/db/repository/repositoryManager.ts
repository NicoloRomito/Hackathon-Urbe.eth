import prisma from "../prismaClient";
import UserInfo from "../../models/userInfo"
import CompanyInfo from "../../models/companyInfo";
import { time } from "console";


let counter = Math.floor(Date.now() * 1000);
class RepositoryManager {

  areUserDataValid(userInfo: UserInfo): boolean {
    const existingUser = prisma.user.findFirst({
      where: {
        OR: [
          { address: userInfo.address },
          { email: userInfo.email },
          { codiceFiscale: userInfo.codiceFiscale }
        ]
      }
    });
    return existingUser === null;
  }

  areCompanyDataValid(companyInfo: CompanyInfo): boolean {
    const existingCompany = prisma.company.findFirst({
      where: {
        OR: [
          { address: companyInfo.address },
          { name: companyInfo.name },
          { pIva: companyInfo.pIva }
        ]
      }
    });
    return existingCompany === null;
  }

  isUserRegistred(userInfo: UserInfo): boolean {
    const user = prisma.user.findFirst({
      where: {
        OR: [
          { address: userInfo.address },
          { email: userInfo.email },
          { codiceFiscale: userInfo.codiceFiscale }
        ]
      }
    });
    return user !== null;
  }

  isCompanyRegistred(companyInfo: CompanyInfo) : boolean{
    const company =  prisma.company.findFirst({
      where: {
        OR: [
          { address: companyInfo.address },
          { name: companyInfo.name },
          { pIva: companyInfo.pIva }
        ]
      }
    });
    return company !== null;
  }

  // User Methods
  async  getUser(address: string, ): Promise<any> {
    return await prisma.user.findFirst({
      where: { address },
      
      include: { nfts: true }, 
    });
  }

  async setUser(
    userInfo: UserInfo
  ): Promise<any> {
    return await prisma.user.create({
      data: {
        address: userInfo.address,
        verified: userInfo.verified,
        verifiedBy: userInfo.verifiedBy,
        email: userInfo.email,
        codiceFiscale: userInfo.codiceFiscale,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      },
    });
  }

  async getAllUsers(): Promise<any[]> {
    return await prisma.user.findMany();
  }
  async getNFTsByUserAddress(userAddress: string): Promise<any[]> {
    const userWithNFTs = await prisma.user.findFirst({
      where: { address: userAddress },
      include: { nfts: true }, // Include related NFTs
    });
  
    if (!userWithNFTs) {
      throw new Error(`User with address ${userAddress} not found.`);
    }
  
    return userWithNFTs.nfts; 
  }

  async getNFTsByCompanyAddress(companyAddress: string): Promise<any[]> {
    const companyWithNFTs = await prisma.company.findFirst({
      where: { address: companyAddress },
      include: { nfts: true }, // Include related NFTs
    });
  
    if (!companyWithNFTs) {
      throw new Error(`Company with address ${companyAddress} not found.`);
    }
  
    return companyWithNFTs.nfts;
  }

  async getNFT(address: string): Promise<any> {
    return await prisma.nft.findFirst({
      where: { address },
    });
  }

  async setNFT(
    address: string,
    timestamp: Date,
    userId: number,
    companyId: number,
    title: string,
    tokenId?: number // Optional tokenId
  ): Promise<any> {
    // Create the data object dynamically
    const nftData: any = {
      address: address,
      timestamp: timestamp,
      title: title,
      userId: userId,
      companyId: companyId,
      tokenId: tokenId,
    };
  
    // Only add tokenId if it's defined
    if (tokenId !== undefined && tokenId !== null) {
      nftData.tokenId = tokenId;
    } else {
      // Generate a random tokenId if not provided
      nftData.tokenId = Math.floor(Math.random() * 1000);
    }
    // Create NFT record
    return await prisma.nft.create({
      data: nftData,
    });
  }

  async getNFTsByUser(userId: number): Promise<any[]> {
    return await prisma.nft.findMany({
      where: { userId },
    });
  }

  async getNFTsByCompany(companyId: number): Promise<any[]> {
    return await prisma.nft.findMany({
      where: { companyId },
    });
  }

  async deleteNFT(address: string): Promise<any> {
    return await prisma.nft.deleteMany({
      where: { address : address  },
    });
  }

  // Company Methods
  async getCompany(address: string): Promise<any> {
    let result = await prisma.company.findFirst({
      where: {
         address 
      },
      include: { nfts: true },
    });
    return result === null; 
  }

  async getCompanyInfo(companyAddress: string): Promise<any> {

    const companyWithNFTs = await prisma.company.findFirst({
      where: { address: companyAddress },
      include: { nfts: true }, // Include related NFTs
    });
  
    return companyWithNFTs;
  }

  async setCompany(
   companyInfo: CompanyInfo
  ): Promise<any> {
    return await prisma.company.create({
      data: {
        address : companyInfo.address,
        name : companyInfo.name,
        verified : companyInfo.verified,
        pIva : companyInfo.pIva + counter,
        createdAt : companyInfo.createdAt,
        updatedAt : companyInfo.updatedAt,
      },
    });
  }

  async getAllCompanies(): Promise<any[]> {
    return await prisma.company.findMany();
  }

  async deleteCompany(id: number): Promise<any> {
    return await prisma.company.delete({
      where: { id },
    });
  }

  // Relationship Management
  async assignNFTToUser(nftAddr: string, receiverAddr: string, nftId: number): Promise<any> {
    const nft =  await prisma.nft.update({
      where: { id: nftId },
      data: { user: await this.getUser(receiverAddr) },
    });
    if(this.isUserRegistred(await this.getUser(receiverAddr))){
      return nft;
    }
    else
      this.setUser({address: receiverAddr, name:"", lastName:"",  verified: false, verifiedBy: "", email: "", codiceFiscale: "", createdAt: new Date(), updatedAt: new Date()});
}

  async assignNFTToCompany(nftAddr: string, companyAddr: string, nftId: number): Promise<any> {
    if(this.isCompanyRegistred(await this.getCompany(companyAddr))){
      let result =  await prisma.nft.update({
        where: { id: nftId },
        data: { address: nftAddr, company: await this.getCompany(companyAddr) },
      });
      
        return result;
    }
    else
    {
      counter++;
      let string = "Company" + counter;
      this.setCompany({address: companyAddr, name:"", verified: false, pIva: string, createdAt: new Date(), updatedAt: new Date()});
    }
  }
}


const repositoryManager = new RepositoryManager;

export default repositoryManager;





// TODO : search by email, nome azienda

