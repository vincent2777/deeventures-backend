"use strict";

import { Router } from 'express';
import CurrencyNetworkController from "../controllers/currencyNetwork_controller";
import TokenValidation from "../utils/token_validation";

//  Set up Express Router.
const cryptoNetworkRouter = Router();


//  Get all Crypto Networks.
cryptoNetworkRouter.post(
    "/create_network",
    TokenValidation.userTokenValidation,
    CurrencyNetworkController.createCryptoNetwork
);

//  Get all Crypto Networks.
cryptoNetworkRouter.get(
    "/all_networks",
    TokenValidation.userTokenValidation,
    CurrencyNetworkController.getCryptoNetworks
);

//  Get a single Crypto Network.
cryptoNetworkRouter.get(
    "/single_network/:id",
    TokenValidation.userTokenValidation,
    CurrencyNetworkController.getCryptoNetwork
);

//  Update a Crypto Network.
cryptoNetworkRouter.put(
    "/update_network/:id",
    TokenValidation.userTokenValidation,
    CurrencyNetworkController.updateCryptoNetwork
);

//  Delete a Crypto Network.
cryptoNetworkRouter.delete(
    "/delete_network/:id",
    TokenValidation.userTokenValidation,
    CurrencyNetworkController.deleteCryptoNetwork
);

export default cryptoNetworkRouter;