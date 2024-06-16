"use strict";

import Joi from "joi";

const transactionType = ["Gift Card Sell", "Coin Sell", "Bill Payment", "Wallet Funding", "Fund Withdrawal", "Promo Usage"];


/**
 * @class TransactionValidator
 **/
class TransactionValidator {

    /**
     * @function createTransactionSchema
     **/
    static createTransactionSchema = Joi.object({
        user_id: Joi.number().required(),
        trnx_amount: Joi.number().positive().required(),
        trnx_type: Joi.string().valid(...transactionType).required(),
        trnx_desc: Joi.string().required(),
        trnx_status: Joi.number().required(),
        trnx_rate: Joi.number().positive().required(),
        trnx_address: Joi.string().required(),
        trnx_image: Joi.string().allow("").optional(),
        to_receive: Joi.number().positive().required(),
        currency: Joi.string().required(),
    });


    /**
     * @function updateTransactionSchema
     **/
    static updateTransactionSchema = Joi.object({
        user_id: Joi.number().allow(null).optional(),
        trnx_amount: Joi.number().allow(null).optional(),
        trnx_type: Joi.string().valid(...transactionType),
        trnx_desc: Joi.string().allow(null).optional(),
        trnx_status: Joi.number().allow(null).optional(),
        trnx_rate: Joi.number().positive().allow(null).optional(),
        trnx_address: Joi.string().allow(null).optional(),
        trnx_image: Joi.string().allow(null).optional().allow(null).optional(),
        to_receive: Joi.number().allow(null).optional(),
        currency: Joi.string().allow(null).optional(),
    });
}


export default TransactionValidator;