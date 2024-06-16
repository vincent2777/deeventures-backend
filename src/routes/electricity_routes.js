"use strict";

import { Router } from "express";
import CableTVController from "../controllers/cableTV_controller";
import TokenValidation from "../utils/token_validation";
import ElectricController from "../controllers/electricCompany_controller";

//  Set up Express Router.
const electricityVRouter = Router();


//  Create electricity company.
/*electricityVRouter.post(
    "/create_electricity_company",
    TokenValidation.userTokenValidation,
    ElectricController.createElectricCompany
);*/

//  Create meter type.
electricityVRouter.post(
    "/create_meter_type",
    TokenValidation.userTokenValidation,
    ElectricController.createMeterType
);

//  Get all electricity companies.
electricityVRouter.get(
    "/all_electricity_companies",
    TokenValidation.userTokenValidation,
    ElectricController.getElectricCompanies
);

//  Get all cable tv.
electricityVRouter.get(
    "/all_meter_types",
    TokenValidation.userTokenValidation,
    ElectricController.getMeterTypes
);

//  Get single electricity company.
electricityVRouter.get(
    "/single_electricity_company/:code",
    TokenValidation.userTokenValidation,
    ElectricController.getElectricCompany
);

//  Get single electricity company.
electricityVRouter.get(
    "/single_meter_type/:code",
    TokenValidation.userTokenValidation,
    ElectricController.getMeterType
);

export default electricityVRouter;