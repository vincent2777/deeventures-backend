"use strict";

import { Router } from 'express';
import TokenValidation from "../utils/token_validation.mjs";
import BillPaymentController from "../controllers/billPayment_controller.mjs";

//  Set up Express Router.
const billPaymentRouter = Router();


//  Buy Airtime.
billPaymentRouter.post(
    "/buy_airtime",
    TokenValidation.userTokenValidation,
    BillPaymentController.buyAirtime
);


//  Get Data Bundles.
billPaymentRouter.get(
    "/all_data_bundles",
    TokenValidation.userTokenValidation,
    BillPaymentController.getDataBundles
);
//  Buy Data Bundle.
billPaymentRouter.post(
    "/buy_data_bundle",
    TokenValidation.userTokenValidation,
    BillPaymentController.buyDataBundle
);


//  Get Cable TVs.
billPaymentRouter.get(
    "/all_cable_tv",
    TokenValidation.userTokenValidation,
    BillPaymentController.getCableTV
);
//  Buy Cable TV.
billPaymentRouter.post(
    "/buy_cable_tv",
    TokenValidation.userTokenValidation,
    BillPaymentController.buyCableTV
);

//  Get Electric Companies.
billPaymentRouter.get(
    "/all_electric_companies",
    TokenValidation.userTokenValidation,
    BillPaymentController.getElectricCompanies
);
//  Buy Electricity.
billPaymentRouter.post(
    "/buy_electricity",
    TokenValidation.userTokenValidation,
    BillPaymentController.buyElectricity
);

//  Get validate meter number.
billPaymentRouter.get(
    "/validate_meter_no",
    TokenValidation.userTokenValidation,
    BillPaymentController.validateMeterNo
);

export default billPaymentRouter;