"use strict";

import { Router } from "express";

//  Import all the required routes.
import userRouter from "./user_routes.mjs";
import currencyRouter from "./currency_routes.mjs";
import cryptoNetworkRouter from "./cryptoNetwork_routes.mjs";
import transactionRouter from "./transaction_routes.mjs";
import walletRouter from "./wallet_routes.mjs";
import giftCardRouter from "./giftCard_routes.mjs";
import billPaymentRouter from "./billPayment_routes.mjs";
import cableTVRouter from "./cableTV_routes.mjs";
import electricityVRouter from "./electricity_routes.mjs";
import networkRouter from "./network_routes.mjs";
import dataPlanRouter from "./dataPlan_routes.mjs";
import settingRouter from "./setting_routes.mjs";


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