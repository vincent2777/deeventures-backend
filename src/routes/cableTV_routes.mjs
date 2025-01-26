"use strict";

import { Router } from "express";
import CableTVController from "../controllers/cableTV_controller";
import TokenValidation from "../utils/token_validation";

//  Set up Express Router.
const cableTVRouter = Router();


//  Create cable tv.
cableTVRouter.post(
    "/create_cable_tv",
    TokenValidation.userTokenValidation,
    CableTVController.createCableTV
);

//  Get all cable tv.
cableTVRouter.get(
    "/all_cable_tv",
    TokenValidation.userTokenValidation,
    CableTVController.getCableTVs
);

//  Get single cable tv.
cableTVRouter.get(
    "/single_cable_tv/:code",
    TokenValidation.userTokenValidation,
    CableTVController.getCableTV
);


export default cableTVRouter;