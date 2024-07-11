"use strict";

import Joi from "joi";

const transactionType = ["Gift Card Sell", "Coin Sell", "Bill Payment", "Wallet Funding", "Fund Withdrawal", "Promo Usage"];

/**
 * @class GiftCardValidator
 **/
class GiftCardValidator {

    /**
     * @function createGiftCardSchema
     **/
    static createGiftCardSchema = Joi.object({
        gcard_name: Joi.string().required(),
        gcard_image: Joi.string().required(),
        is_active: Joi.number().required()
    });

    /**
     * @function updateGiftCardSchema
     **/
    static updateGiftCardSchema = Joi.object({
        gcard_name: Joi.string(),
        gcard_image: Joi.string(),
        is_active: Joi.number()
    });

      /**
     * @function sellGiftCardSchema
     **/
      static sellGiftCardSchema = Joi.object({
        user_id: Joi.number().required(),
        trnx_amount: Joi.number().positive().required(),
        trnx_type: Joi.string().valid(...transactionType).required(),
        trnx_desc: Joi.string().required(),
        trnx_status: Joi.number().required(),
        trnx_rate: Joi.number().positive().required(),
        trnx_address: Joi.string().allow("").optional(),
        rates: Joi.string().allow("").optional(),
        trnx_image: Joi.string().allow("").optional(),
        to_receive: Joi.number().positive().required(),
        currency: Joi.string().required(),
    });

}

export default GiftCardValidator;