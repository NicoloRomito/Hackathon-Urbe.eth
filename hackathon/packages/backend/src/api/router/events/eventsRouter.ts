import smartContractManager from "../../../db/repository/smartContractManager";
import handleNFTCreated from "../../controller/events/handleNFTCreated";

smartContractManager.NFTCreatedEvent.on('data', (data: any) => handleNFTCreated(data));