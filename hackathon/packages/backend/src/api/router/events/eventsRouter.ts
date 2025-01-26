import smartContractManager from "../../../db/repository/smartContractManager";
import handleNFTCreated from "../../controller/events/handleNFTCreated";
import handleNFTBurned from "../../controller/events/handleNFTBurned";
import manager from "../../../db/web3Client";

const nftCreatedEvent = manager.events.NFTCreated();
const burnEvent = manager.events.NFTBurned();

export default function eventsRouter() {
    nftCreatedEvent.on("data", (event) => {
        handleNFTCreated(event);
    });
    nftCreatedEvent.on("error", (error) => {
        console.log("Error in event emitter");
    });

    burnEvent.on("data", (event) => {
        handleNFTBurned(event);
    });
    burnEvent.on("error", (error) => {
        console.log("Error in event emitter");
    });
}