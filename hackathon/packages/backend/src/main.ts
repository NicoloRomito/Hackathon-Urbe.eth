
import dotenv from "dotenv";
import app from "./api/router/router";
import handleNFTCreated from "./api/controller/events/handleNFTCreated";

import manager from "./db/web3Client";

dotenv.config();

let nftCreatedEvent = manager.events.NFTCreated()

async function main(): Promise<void> {

    const port = process.env.PORT;
    
    nftCreatedEvent.on("data", (event) => {
        handleNFTCreated(event);
    });
    nftCreatedEvent.on("error", (error) => {
        console.log("Error in event emitter", error);
    });


    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}



main();



