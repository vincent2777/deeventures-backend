"use strict";

import { Router } from 'express';
import CurrencyController from "../controllers/currency_controller";
import TokenValidation from "../utils/token_validation";

//  Set up Express Router.
const currencyRouter = Router();


//  Create Currency.
currencyRouter.post(
    "/create_currency",
    TokenValidation.userTokenValidation,
    CurrencyController.createCurrency
);

//  Get all Currencies.
currencyRouter.get(
    "/all_currencies",
    TokenValidation.userTokenValidation,
    CurrencyController.getCurrencies
);

//  Get a single Currency.
currencyRouter.get(
    "/single_currency/:id",
    TokenValidation.userTokenValidation,
    CurrencyController.getCurrency
);

//  Update a Currency.
currencyRouter.put(
    "/update_currency/:id",
    TokenValidation.userTokenValidation,
    CurrencyController.updateCurrency
);

//  Delete a Currency.
currencyRouter.delete(
    "/delete_currency/:id",
    TokenValidation.userTokenValidation,
    CurrencyController.deleteCurrency
);

export default currencyRouter;