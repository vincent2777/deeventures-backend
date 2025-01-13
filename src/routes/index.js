"use strict";

import { Router } from "express";

//  Import all the required routes.
import userRouter from "./user_routes.js";
import currencyRouter from "./currency_routes.js";
import cryptoNetworkRouter from "./cryptoNetwork_routes.js";
import transactionRouter from "./transaction_routes.js";
import walletRouter from "./wallet_routes.js";
import giftCardRouter from "./giftCard_routes.js";
import billPaymentRouter from "./billPayment_routes";
import cableTVRouter from "./cableTV_routes";
import electricityVRouter from "./electricity_routes";
import networkRouter from "./network_routes";
import dataPlanRouter from "./dataPlan_routes";
import settingRouter from "./setting_routes";


//  Initialize Express Router.
const router = Router();

router.use("/users", userRouter);
router.use("/currencies", currencyRouter);
router.use("/crypto_networks", cryptoNetworkRouter);
router.use("/transactions", transactionRouter);
router.use("/wallets", walletRouter);
router.use("/gift_cards", giftCardRouter);
router.use("/bills_payment", billPaymentRouter);
router.use("/data_plans", dataPlanRouter);
router.use("/cable_tvs", cableTVRouter);
router.use("/electricity_companies", electricityVRouter);
router.use("/networks", networkRouter);
router.use("/settings", settingRouter);

export default router;