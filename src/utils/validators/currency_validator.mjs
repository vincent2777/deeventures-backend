"use strict";

import Joi from "joi";

const isActive = [0, 1];

/**
 * @class CurrencyValidator
 **/
class CurrencyValidator {

    /**
     * @function createCurrencySchema
     **/
    static createCurrencySchema = Joi.object({
        currency_network_id: Joi.array().items(Joi.number()).required(),
        currency_name: Joi.string().required(),
        currency_price: Joi.number().min(0).required(),
        currency_buy_rate: Joi.number().min(0).required(),
        currency_sell_rate: Joi.number().min(0).required(),
        currency_symbol: Joi.string().required(),
        currency_is_active: Joi.number().valid(...isActive),
        currency_image: Joi.string()
    });

    /**
     * @function updateCurrencySchema
     **/
    static updateCurrencySchema = Joi.object({
        currency_name: Joi.string(),
        currency_price: Joi.number().min(0),
        currency_buy_rate: Joi.number().min(0),
        currency_sell_rate: Joi.number().min(0),
        currency_symbol: Joi.string(),
        currency_is_active: Joi.number(),
        currency_image: Joi.string()
    });
}

export default CurrencyValidator;