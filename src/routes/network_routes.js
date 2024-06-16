"use strict";

import { Router } from "express";
import NetworkController from "../controllers/network_controller";
import TokenValidation from "../utils/token_validation";

//  Set up Express Router.
const networkRouter = Router();


//  Create cable tv.
networkRouter.post(
    "/create_airtime",
    TokenValidation.userTokenValidation,
    NetworkController.createAirtime
);

//  Get all cable tv.
networkRouter.get(
    "/all_airtime",
    TokenValidation.userTokenValidation,
    NetworkController.getAirTimes
);

//  Get single cable tv.
networkRouter.get(
    "/single_airtime/:code",
    TokenValidation.userTokenValidation,
    NetworkController.getAirTime
);

export default networkRouter;