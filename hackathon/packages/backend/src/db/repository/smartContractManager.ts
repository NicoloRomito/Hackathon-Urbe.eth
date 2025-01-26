import web3 from '../web3Client';
import dotenv from "dotenv"
import managerAbi from '../../models/abi/smartContractManagerABI';
import powAbi from '../../models/abi/powContractABI';
import certicateAbi from '../../models/abi/certicateAbi';


dotenv.config();






class SmartContractManager {
    private managerContractAbi: any;
    private managerContract: any;

    private PoWorkContract: any;
    private PoWorkContractAbi: any;

    private PoCertificate: any;
    private PoCertificateAbi: any;
    
   // NFTCreated(minter, receiver, NFT, tokenId)
   // NFTBurned(NFTaddress, tokenID)
    public NFTCreatedEvent: any;
    public NFTBurnedEvent: any;


    constructor(
    managerContract: any, managerContractAbi: any,
    PoWorkContract: any, PoWorkContractAbi: any, 
    PoCertificate: any, PoCertificateAbi: any) 
    {
        this.managerContractAbi = managerContractAbi;
        this.managerContract = new web3.eth.Contract(managerContractAbi, managerContract);
        this.PoWorkContractAbi = PoWorkContractAbi;
        this.PoWorkContract = new web3.eth.Contract(PoWorkContractAbi, PoWorkContract);
        this.PoCertificateAbi = PoCertificateAbi;
        this.PoCertificate = new web3.eth.Contract(PoCertificateAbi, PoCertificate);

        this.NFTCreatedEvent = managerContract.events.NFTCreated();
        this.NFTBurnedEvent = managerContract.events.NFTBurned();
    }

}


const smartContractManager = new SmartContractManager(process.env.CONTRACT_MANAGER, managerAbi,
                                                      process.env.CONTRACT_POW , powAbi,
                                                      process.env.CONTRACT_CERTIFICATE, certicateAbi);


export default smartContractManager;