"use strict";

import { Router } from "express";
import TokenValidation from "../utils/token_validation";
import DataPlanController from "../controllers/dataPlan_controller";

//  Set up Express Router.
const dataPlanRouter = Router();


//  Create cable tv.
dataPlanRouter.post(
    "/create_data_plan",
    TokenValidation.userTokenValidation,
    DataPlanController.createDataPlan
);

//  Get all cable tv.
dataPlanRouter.get(
    "/all_data_plan",
    TokenValidation.userTokenValidation,
    DataPlanController.getDataPlans
);

//  Get single cable tv.
dataPlanRouter.get(
    "/single_data_plan/:code",
    TokenValidation.userTokenValidation,
    DataPlanController.getDataPlan
);


export default dataPlanRouter;