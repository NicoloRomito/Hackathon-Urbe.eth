import prisma from "../prismaClient";
import UserInfo from "../../models/userInfo"
import CompanyInfo from "../../models/companyInfo";

class RepositoryManager {

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
    getUser(address: string): Promise<any>{
    return  prisma.user.findFirst({
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
    title: string
  ): Promise<any> {
    return await prisma.nft.create({
      data: {
        address,
        timestamp,
        userId,
        companyId,
        title,
      },
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

  async deleteNFT(id: number): Promise<any> {
    return await prisma.nft.delete({
      where: { id },
    });
  }

  // Company Methods
  async getCompany(address: string): Promise<any> {
    return await prisma.company.findFirst({
      where: { address },
      include: { nfts: true }, // Include related NFTs
    });
  }

  async setCompany(
   companyInfo: CompanyInfo
  ): Promise<any> {
    return await prisma.company.create({
      data: {
        address : companyInfo.address,
        name : companyInfo.name,
        verified : companyInfo.verified,
        pIva : companyInfo.pIva,
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
  async assignNFTToUser(nftId: number, userId: number): Promise<any> {
    return await prisma.nft.update({
      where: { id: nftId },
      data: { userId },
    });
  }

  async assignNFTToCompany(nftId: number, companyId: number): Promise<any> {
    return await prisma.nft.update({
      where: { id: nftId },
      data: { companyId },
    });
  }
}


const repositoryManager = new RepositoryManager;

export default repositoryManager;





// TODO : search by email, nome azienda

