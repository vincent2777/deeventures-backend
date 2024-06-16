"use strict";

import Joi from "joi";


/**
 * @class WalletValidator
 **/
class WalletValidator {

    /**
     * @function createWalletSchema
     **/
    static createWalletSchema = Joi.object({
        amount: Joi.number().required(),
        currency_symbol: Joi.string().required(),
        user_id: Joi.string().required(),
    });

    /**
     * @function updateWalletSchema
     **/
    static updateWalletSchema = Joi.object({
        amount: Joi.number(),
        currency_symbol: Joi.string(),
        user_id: Joi.string(),
    });
}

export default WalletValidator;