import express, { Express} from "express";

import hanldeAddressSearch from "../../controller/search/handleAddressSearch"

const searchRouter = express.Router();

searchRouter.get("/address", hanldeAddressSearch);

// searchRouter.get("/owned", handleOwnedNFT);

// searchRouter.get("/created", handleCreatedNFT)


export default searchRouter